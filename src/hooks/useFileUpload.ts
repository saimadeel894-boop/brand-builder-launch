import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface UploadOptions {
  bucket: "product-images" | "documents";
  folder?: string;
}

export function useFileUpload() {
  const { user } = useAuth();
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
      ? `${user.id}/${folder}/${fileName}`
      : `${user.id}/${fileName}`;

    setUploading(true);
    setProgress(0);

    try {
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      setProgress(100);
      return urlData.publicUrl;
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

  const deleteFile = async (url: string, bucket: string): Promise<boolean> => {
    try {
      // Extract path from URL
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split(`/storage/v1/object/public/${bucket}/`);
      if (pathParts.length < 2) return false;

      const filePath = pathParts[1];

      const { error } = await supabase.storage.from(bucket).remove([filePath]);
      if (error) throw error;

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
