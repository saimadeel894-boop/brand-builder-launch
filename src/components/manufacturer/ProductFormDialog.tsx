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
import { Loader2 } from "lucide-react";
import { Product, CreateProductData } from "@/hooks/useProducts";
import { useFileUpload } from "@/hooks/useFileUpload";
import { FileUpload } from "@/components/ui/file-upload";
import {
  MoqInput,
  LeadTimeInput,
  PriceInput,
  LeadTimeUnit,
  Currency,
} from "@/components/ui/unit-input";

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

  const [formData, setFormData] = useState({
    name: product?.name || "",
    category: product?.category || "",
    description: product?.description || "",
    moq: product?.moq ?? undefined,
    moqUnit: product?.moqUnit || "units",
    leadTime: product?.leadTime ?? undefined,
    leadTimeUnit: (product?.leadTimeUnit || "weeks") as LeadTimeUnit,
    price: product?.price ?? undefined,
    currency: (product?.currency || "USD") as Currency,
    images: product?.images || [],
    documents: product?.documents || [],
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const productData: CreateProductData | Partial<Product> = {
      name: formData.name,
      category: formData.category,
      description: formData.description || undefined,
      moq: formData.moq,
      moqUnit: formData.moqUnit,
      leadTime: formData.leadTime,
      leadTimeUnit: formData.leadTimeUnit,
      price: formData.price,
      currency: formData.currency,
      images: formData.images,
      documents: formData.documents,
      ...(isEditing ? {} : { manufacturerId }),
    };

    const result = await onSubmit(productData);
    setSaving(false);

    if (result) {
      onOpenChange(false);
      // Reset form
      setFormData({
        name: "",
        category: "",
        description: "",
        moq: undefined,
        moqUnit: "units",
        leadTime: undefined,
        leadTimeUnit: "weeks",
        price: undefined,
        currency: "USD",
        images: [],
        documents: [],
      });
    }
  };

  const handleImageUpload = async (file: File): Promise<string | null> => {
    // Keep paths flat (product-images/{uid}/{file}) to be compatible with common Storage rules
    return upload(file, { bucket: "product-images" });
  };

  const handleDocumentUpload = async (file: File): Promise<string | null> => {
    // Keep paths flat (documents/{uid}/{file}) to be compatible with common Storage rules
    return upload(file, { bucket: "documents" });
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

          {/* MOQ, Lead Time, Price with structured inputs */}
          <div className="grid gap-4 sm:grid-cols-3">
            <MoqInput
              value={formData.moq}
              onChange={(value) => setFormData((prev) => ({ ...prev, moq: value }))}
            />
            <LeadTimeInput
              value={formData.leadTime}
              unit={formData.leadTimeUnit}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, leadTime: value }))}
              onUnitChange={(unit) => setFormData((prev) => ({ ...prev, leadTimeUnit: unit }))}
            />
            <PriceInput
              value={formData.price}
              currency={formData.currency}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, price: value }))}
              onCurrencyChange={(currency) => setFormData((prev) => ({ ...prev, currency }))}
            />
          </div>

          {/* Images */}
          <FileUpload
            label="Product Images"
            accept="image/*"
            multiple
            maxSizeMB={5}
            type="image"
            files={formData.images}
            onUpload={handleImageUpload}
            onRemove={removeImage}
            uploading={uploading}
          />

          {/* Documents */}
          <FileUpload
            label="Documents (PDFs, Certifications)"
            accept=".pdf,.doc,.docx"
            multiple
            maxSizeMB={10}
            type="document"
            files={formData.documents}
            onUpload={handleDocumentUpload}
            onRemove={removeDocument}
            uploading={uploading}
          />

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
