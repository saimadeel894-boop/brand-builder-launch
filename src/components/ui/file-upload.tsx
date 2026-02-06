import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Upload, 
  X, 
  FileText, 
  Image as ImageIcon, 
  Loader2, 
  AlertCircle, 
  CheckCircle 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  label?: string;
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
  files: string[];
  onUpload: (file: File) => Promise<string | null>;
  onRemove: (url: string) => void;
  uploading?: boolean;
  type?: "image" | "document";
  className?: string;
}

const FILE_TYPE_LABELS: Record<string, string> = {
  "application/pdf": "PDF",
  "application/msword": "DOC",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "DOCX",
  "image/jpeg": "JPEG",
  "image/png": "PNG",
  "image/webp": "WEBP",
};

interface UploadState {
  fileName: string;
  status: "uploading" | "success" | "error";
  error?: string;
}

export function FileUpload({
  label,
  accept = "*",
  multiple = false,
  maxSizeMB = 10,
  files,
  onUpload,
  onRemove,
  uploading = false,
  type = "document",
  className,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadStates, setUploadStates] = useState<UploadState[]>([]);

  const validateFile = (file: File): string | null => {
    // Check file size
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      return `File size must be less than ${maxSizeMB}MB`;
    }

    // Check file type based on accept
    if (accept !== "*") {
      const acceptedTypes = accept.split(",").map((t) => t.trim().toLowerCase());
      const fileType = file.type.toLowerCase();
      const fileExt = `.${file.name.split(".").pop()?.toLowerCase()}`;

      const isValidType = acceptedTypes.some((accepted) => {
        if (accepted.startsWith(".")) {
          return fileExt === accepted;
        }
        if (accepted.endsWith("/*")) {
          return fileType.startsWith(accepted.replace("/*", "/"));
        }
        return fileType === accepted;
      });

      if (!isValidType) {
        return `Invalid file type. Accepted: ${accept}`;
      }
    }

    return null;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles?.length) return;

    for (const file of Array.from(selectedFiles)) {
      const error = validateFile(file);
      
      if (error) {
        setUploadStates((prev) => [
          ...prev,
          { fileName: file.name, status: "error", error },
        ]);
        setTimeout(() => {
          setUploadStates((prev) => prev.filter((s) => s.fileName !== file.name));
        }, 5000);
        continue;
      }

      // Start upload
      setUploadStates((prev) => [
        ...prev,
        { fileName: file.name, status: "uploading" },
      ]);

      const url = await onUpload(file);

      if (url) {
        setUploadStates((prev) =>
          prev.map((s) =>
            s.fileName === file.name ? { ...s, status: "success" } : s
          )
        );
        setTimeout(() => {
          setUploadStates((prev) => prev.filter((s) => s.fileName !== file.name));
        }, 2000);
      } else {
        setUploadStates((prev) =>
          prev.map((s) =>
            s.fileName === file.name
              ? { ...s, status: "error", error: "Upload failed" }
              : s
          )
        );
        setTimeout(() => {
          setUploadStates((prev) => prev.filter((s) => s.fileName !== file.name));
        }, 5000);
      }
    }

    // Reset input
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const getFileName = (url: string) => {
    const parts = url.split("/");
    const fileName = parts[parts.length - 1];
    // Remove UUID prefix if present
    const uuidPattern = /^[a-f0-9-]{36}\./i;
    return fileName.replace(uuidPattern, "").split("?")[0] || "Document";
  };

  return (
    <div className={cn("space-y-3", className)}>
      {label && <Label>{label}</Label>}

      {/* Upload states feedback */}
      {uploadStates.length > 0 && (
        <div className="space-y-2">
          {uploadStates.map((state) => (
            <div
              key={state.fileName}
              className={cn(
                "flex items-center gap-2 p-2 rounded-lg text-sm",
                state.status === "uploading" && "bg-blue-50 text-blue-700",
                state.status === "success" && "bg-green-50 text-green-700",
                state.status === "error" && "bg-destructive/10 text-destructive"
              )}
            >
              {state.status === "uploading" && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              {state.status === "success" && <CheckCircle className="h-4 w-4" />}
              {state.status === "error" && <AlertCircle className="h-4 w-4" />}
              <span className="flex-1 truncate">{state.fileName}</span>
              {state.error && (
                <span className="text-xs">{state.error}</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* File list */}
      {type === "image" ? (
        <div className="flex flex-wrap gap-3">
          {files.map((url) => (
            <div key={url} className="relative group">
              <img
                src={url}
                alt="Uploaded"
                className="h-20 w-20 object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={() => onRemove(url)}
                className="absolute -top-2 -right-2 h-5 w-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="h-20 w-20 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-1 text-muted-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <ImageIcon className="h-5 w-5" />
                <span className="text-xs">Add</span>
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {files.map((url) => (
            <div
              key={url}
              className="flex items-center gap-3 p-3 bg-secondary rounded-lg group"
            >
              <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <span className="flex-1 text-sm truncate">{getFileName(url)}</span>
              <button
                type="button"
                onClick={() => onRemove(url)}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-2 h-4 w-4" />
            )}
            Upload Document
          </Button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
      />

      <p className="text-xs text-muted-foreground">
        Max file size: {maxSizeMB}MB
        {accept !== "*" && ` • Accepted: ${accept}`}
      </p>
    </div>
  );
}
