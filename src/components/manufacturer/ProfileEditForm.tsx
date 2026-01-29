import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Plus, Loader2, Save } from "lucide-react";
import { ManufacturerProfileData } from "@/hooks/useManufacturerProfile";

interface ProfileEditFormProps {
  profile: ManufacturerProfileData;
  onSave: (updates: Partial<ManufacturerProfileData>) => Promise<boolean>;
  onCancel: () => void;
}

const CATEGORY_OPTIONS = [
  "Skincare", "Haircare", "Makeup", "Fragrance", "Body Care",
  "Nail Care", "Men's Grooming", "Organic/Natural", "Anti-Aging", "Sun Care"
];

const CERTIFICATION_OPTIONS = [
  "ISO 22716", "GMP", "FDA Registered", "Cruelty-Free", "Vegan",
  "Organic Certified", "ECOCERT", "COSMOS", "Halal", "Dermatologically Tested"
];

export function ProfileEditForm({ profile, onSave, onCancel }: ProfileEditFormProps) {
  const [formData, setFormData] = useState({
    companyName: profile.companyName,
    description: profile.description || "",
    location: profile.location || "",
    website: profile.website || "",
    moq: profile.moq || "",
    leadTime: profile.leadTime || "",
    categories: [...profile.categories],
    certifications: [...profile.certifications],
  });
  const [saving, setSaving] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newCertification, setNewCertification] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const success = await onSave(formData);
    setSaving(false);
    if (success) onCancel();
  };

  const addCategory = (category: string) => {
    if (category && !formData.categories.includes(category)) {
      setFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, category],
      }));
    }
    setNewCategory("");
  };

  const removeCategory = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c !== category),
    }));
  };

  const addCertification = (cert: string) => {
    if (cert && !formData.certifications.includes(cert)) {
      setFormData((prev) => ({
        ...prev,
        certifications: [...prev.certifications, cert],
      }));
    }
    setNewCertification("");
  };

  const removeCertification = (cert: string) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c !== cert),
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, companyName: e.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, location: e.target.value }))
                }
                placeholder="e.g., Los Angeles, CA"
              />
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
              placeholder="Tell brands about your manufacturing capabilities..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, website: e.target.value }))
              }
              placeholder="https://example.com"
            />
          </div>

          {/* MOQ and Lead Time */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="moq">Minimum Order Quantity (MOQ)</Label>
              <Input
                id="moq"
                value={formData.moq}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, moq: e.target.value }))
                }
                placeholder="e.g., 1000 units"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="leadTime">Lead Time</Label>
              <Input
                id="leadTime"
                value={formData.leadTime}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, leadTime: e.target.value }))
                }
                placeholder="e.g., 4-6 weeks"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <Label>Categories</Label>
            <div className="flex flex-wrap gap-2">
              {formData.categories.map((cat) => (
                <Badge key={cat} variant="secondary" className="gap-1 pr-1">
                  {cat}
                  <button
                    type="button"
                    onClick={() => removeCategory(cat)}
                    className="ml-1 rounded-full p-0.5 hover:bg-secondary-foreground/20"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <select
                value={newCategory}
                onChange={(e) => addCategory(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Add a category...</option>
                {CATEGORY_OPTIONS.filter((c) => !formData.categories.includes(c)).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-3">
            <Label>Certifications</Label>
            <div className="flex flex-wrap gap-2">
              {formData.certifications.map((cert) => (
                <Badge key={cert} variant="outline" className="gap-1 pr-1">
                  {cert}
                  <button
                    type="button"
                    onClick={() => removeCertification(cert)}
                    className="ml-1 rounded-full p-0.5 hover:bg-secondary-foreground/20"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <select
                value={newCertification}
                onChange={(e) => addCertification(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Add a certification...</option>
                {CERTIFICATION_OPTIONS.filter((c) => !formData.certifications.includes(c)).map(
                  (cert) => (
                    <option key={cert} value={cert}>
                      {cert}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
