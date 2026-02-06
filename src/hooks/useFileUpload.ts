import { useState } from "react";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";
import { useToast } from "@/hooks/use-toast";

interface UploadOptions {
  bucket: "product-images" | "documents" | "rfq-attachments";
  folder?: string;
}

const MAX_FILE_SIZE_MB = 10;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ALLOWED_DOCUMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export function useFileUpload() {
  const { user } = useFirebaseAuth();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const validateFile = (file: File, bucket: string): string | null => {
    // Check file size
    const maxBytes = MAX_FILE_SIZE_MB * 1024 * 1024;
    if (file.size > maxBytes) {
      return `File size must be less than ${MAX_FILE_SIZE_MB}MB`;
    }

    // Check file type based on bucket
    if (bucket === "product-images") {
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        return "Only JPEG, PNG, WebP, and GIF images are allowed";
      }
    } else if (bucket === "documents") {
      if (!ALLOWED_DOCUMENT_TYPES.includes(file.type)) {
        return "Only PDF and Word documents are allowed";
      }
    }

    return null;
  };

  const upload = async (
    file: File,
    options: UploadOptions
  ): Promise<string | null> => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to upload files",
        variant: "destructive",
      });
      return null;
    }

    const { bucket, folder } = options;

    // Validate file
    const validationError = validateFile(file, bucket);
    if (validationError) {
      toast({
        title: "Invalid File",
        description: validationError,
        variant: "destructive",
      });
      return null;
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = folder
      ? `${bucket}/${user.uid}/${folder}/${fileName}`
      : `${bucket}/${user.uid}/${fileName}`;

    setUploading(true);
    setProgress(0);

    try {
      const storageRef = ref(storage, filePath);
      
      // Set metadata for better file handling
      const metadata = {
        contentType: file.type,
        customMetadata: {
          originalName: file.name,
          uploadedBy: user.uid,
        },
      };
      
      await uploadBytes(storageRef, file, metadata);
      const downloadUrl = await getDownloadURL(storageRef);

      setProgress(100);
      toast({
        title: "Upload Complete",
        description: `${file.name} uploaded successfully`,
      });
      return downloadUrl;
    } catch (error: any) {
      console.error("Upload error:", error);
      
      let errorMessage = "Failed to upload file";
      if (error.code === "storage/unauthorized") {
        errorMessage = "You don't have permission to upload files";
      } else if (error.code === "storage/canceled") {
        errorMessage = "Upload was cancelled";
      } else if (error.code === "storage/unknown") {
        errorMessage = "An unknown error occurred. Please check your Firebase Storage rules.";
      }
      
      toast({
        title: "Upload Failed",
        description: errorMessage,
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const uploadMultiple = async (
    files: File[],
    options: UploadOptions
  ): Promise<string[]> => {
    const urls: string[] = [];

    for (const file of files) {
      const url = await upload(file, options);
      if (url) urls.push(url);
    }

    return urls;
  };

  const deleteFile = async (url: string): Promise<boolean> => {
    try {
      const storageRef = ref(storage, url);
      await deleteObject(storageRef);
      toast({
        title: "Success",
        description: "File deleted successfully",
      });
      return true;
    } catch (error: any) {
      console.error("Delete error:", error);
      toast({
        title: "Delete Failed",
        description: error.message || "Failed to delete file",
        variant: "destructive",
      });
      return false;
    }
  };

  return { upload, uploadMultiple, deleteFile, uploading, progress };
}
