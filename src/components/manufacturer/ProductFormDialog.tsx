import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Upload, X, Image, FileText } from "lucide-react";
import { Product, CreateProductData } from "@/hooks/useProducts";
import { useFileUpload } from "@/hooks/useFileUpload";

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  manufacturerId: string;
  product?: Product;
  onSubmit: (data: CreateProductData | Partial<Product>) => Promise<boolean | Product | null>;
}

const CATEGORY_OPTIONS = [
  "Skincare", "Haircare", "Makeup", "Fragrance", "Body Care",
  "Nail Care", "Men's Grooming", "Organic/Natural", "Anti-Aging", "Sun Care"
];

export function ProductFormDialog({
  open,
  onOpenChange,
  manufacturerId,
  product,
  onSubmit,
}: ProductFormDialogProps) {
  const isEditing = !!product;
  const { upload, uploading } = useFileUpload();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: product?.name || "",
    category: product?.category || "",
    description: product?.description || "",
    moq: product?.moq || "",
    lead_time: product?.lead_time || "",
    price_range: product?.price_range || "",
    images: product?.images || [],
    documents: product?.documents || [],
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const data = isEditing
      ? formData
      : { ...formData, manufacturer_id: manufacturerId };

    const result = await onSubmit(data);
    setSaving(false);

    if (result) {
      onOpenChange(false);
      // Reset form
      setFormData({
        name: "",
        category: "",
        description: "",
        moq: "",
        lead_time: "",
        price_range: "",
        images: [],
        documents: [],
      });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      const url = await upload(file, { bucket: "product-images", folder: "products" });
      if (url) {
        setFormData((prev) => ({ ...prev, images: [...prev.images, url] }));
      }
    }
  };

  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    for (const file of Array.from(files)) {
      const url = await upload(file, { bucket: "documents", folder: "products" });
      if (url) {
        setFormData((prev) => ({ ...prev, documents: [...prev.documents, url] }));
      }
    }
  };

  const removeImage = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((i) => i !== url),
    }));
  };

  const removeDocument = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.filter((d) => d !== url),
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Product" : "Add New Product"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                required
              >
                <option value="">Select category...</option>
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Describe your product..."
              rows={3}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="moq">MOQ</Label>
              <Input
                id="moq"
                value={formData.moq}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, moq: e.target.value }))
                }
                placeholder="e.g., 500 units"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lead_time">Lead Time</Label>
              <Input
                id="lead_time"
                value={formData.lead_time}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, lead_time: e.target.value }))
                }
                placeholder="e.g., 4-6 weeks"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price_range">Price Range</Label>
              <Input
                id="price_range"
                value={formData.price_range}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, price_range: e.target.value }))
                }
                placeholder="e.g., $5-10/unit"
              />
            </div>
          </div>

          {/* Images */}
          <div className="space-y-3">
            <Label>Product Images</Label>
            <div className="flex flex-wrap gap-3">
              {formData.images.map((url) => (
                <div key={url} className="relative group">
                  <img
                    src={url}
                    alt="Product"
                    className="h-20 w-20 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(url)}
                    className="absolute -top-2 -right-2 h-5 w-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                disabled={uploading}
                className="h-20 w-20 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-1 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                {uploading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Image className="h-5 w-5" />
                    <span className="text-xs">Add</span>
                  </>
                )}
              </button>
            </div>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Documents */}
          <div className="space-y-3">
            <Label>Documents (PDFs, Certifications)</Label>
            <div className="space-y-2">
              {formData.documents.map((url) => {
                const fileName = url.split("/").pop() || "Document";
                return (
                  <div
                    key={url}
                    className="flex items-center gap-3 p-3 bg-secondary rounded-lg group"
                  >
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span className="flex-1 text-sm truncate">{fileName}</span>
                    <button
                      type="button"
                      onClick={() => removeDocument(url)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => documentInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Upload className="mr-2 h-4 w-4" />
              )}
              Upload Document
            </Button>
            <input
              ref={documentInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              multiple
              onChange={handleDocumentUpload}
              className="hidden"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={saving || uploading}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? "Updating..." : "Creating..."}
                </>
              ) : isEditing ? (
                "Update Product"
              ) : (
                "Create Product"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
