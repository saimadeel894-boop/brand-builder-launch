import { useState } from "react";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";
import { useToast } from "@/hooks/use-toast";

interface UploadOptions {
  bucket: "product-images" | "documents";
  folder?: string;
}

export function useFileUpload() {
  const { user } = useFirebaseAuth();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

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
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = folder
      ? `${bucket}/${user.uid}/${folder}/${fileName}`
      : `${bucket}/${user.uid}/${fileName}`;

    setUploading(true);
    setProgress(0);

    try {
      const storageRef = ref(storage, filePath);
      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);

      setProgress(100);
      return downloadUrl;
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload file",
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
      return true;
    } catch (error: any) {
      console.error("Delete error:", error);
      toast({
        title: "Delete failed",
        description: error.message || "Failed to delete file",
        variant: "destructive",
      });
      return false;
    }
  };

  return { upload, uploadMultiple, deleteFile, uploading, progress };
}
