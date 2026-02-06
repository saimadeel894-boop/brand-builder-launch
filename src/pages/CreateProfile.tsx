import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, X } from "lucide-react";
import {
  createManufacturerProfile,
  createBrandProfile,
  createInfluencerProfile,
} from "@/services/firestore/profiles";
import { z } from "zod";

// Validation schemas
const manufacturerSchema = z.object({
  firstName: z.string().trim().max(50).optional(),
  lastName: z.string().trim().max(50).optional(),
  companyName: z.string().trim().min(2, "Company name must be at least 2 characters").max(100),
  categories: z.array(z.string()).min(1, "Please add at least one category"),
  certifications: z.array(z.string()),
});

const brandSchema = z.object({
  firstName: z.string().trim().max(50).optional(),
  lastName: z.string().trim().max(50).optional(),
  brandName: z.string().trim().min(2, "Brand name must be at least 2 characters").max(100),
  industry: z.string().trim().min(2, "Industry must be at least 2 characters").max(100),
});

const influencerSchema = z.object({
  firstName: z.string().trim().max(50).optional(),
  lastName: z.string().trim().max(50).optional(),
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  primaryPlatform: z.string().trim().min(2, "Platform must be at least 2 characters").max(100),
});

export default function CreateProfile() {
  const { profile, user, setProfileCompleted } = useFirebaseAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Common fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Manufacturer fields
  const [companyName, setCompanyName] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [certifications, setCertifications] = useState<string[]>([]);
  const [certificationInput, setCertificationInput] = useState("");

  // Brand fields
  const [brandName, setBrandName] = useState("");
  const [industry, setIndustry] = useState("");

  // Influencer fields
  const [name, setName] = useState("");
  const [primaryPlatform, setPrimaryPlatform] = useState("");

  const handleAddTag = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    inputSetter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const trimmed = value.trim();
    if (trimmed) {
      setter((prev) => [...prev, trimmed]);
      inputSetter("");
    }
  };

  const handleRemoveTag = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile?.role) return;

    setLoading(true);

    try {
      // Validate and insert based on role
      if (profile.role === "manufacturer") {
        const result = manufacturerSchema.safeParse({ firstName, lastName, companyName, categories, certifications });
        if (!result.success) {
          toast({
            title: "Validation Error",
            description: result.error.errors[0].message,
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        const { error } = await createManufacturerProfile(user.uid, {
          companyName,
          firstName: firstName || undefined,
          lastName: lastName || undefined,
          categories,
          certifications,
        });

        if (error) throw error;
      } else if (profile.role === "brand") {
        const result = brandSchema.safeParse({ firstName, lastName, brandName, industry });
        if (!result.success) {
          toast({
            title: "Validation Error",
            description: result.error.errors[0].message,
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        const { error } = await createBrandProfile(user.uid, {
          brandName,
          firstName: firstName || undefined,
          lastName: lastName || undefined,
          industry,
        });

        if (error) throw error;
      } else if (profile.role === "influencer") {
        const result = influencerSchema.safeParse({ firstName, lastName, name, primaryPlatform });
        if (!result.success) {
          toast({
            title: "Validation Error",
            description: result.error.errors[0].message,
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        const { error } = await createInfluencerProfile(user.uid, {
          name,
          firstName: firstName || undefined,
          lastName: lastName || undefined,
          primaryPlatform,
        });

        if (error) throw error;
      }

      // Mark profile as complete
      const { error: updateError } = await setProfileCompleted();
      if (updateError) throw updateError;

      toast({
        title: "Profile created!",
        description: "Welcome to BeautyChain",
      });

      navigate("/dashboard");
    } catch (error: any) {
      console.error("Profile creation error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderNameFields = () => (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Your first name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Your last name"
        />
      </div>
    </div>
  );

  const renderForm = () => {
    if (profile?.role === "manufacturer") {
      return (
        <>
          {renderNameFields()}

          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name *</Label>
            <Input
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Your company name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="categories">Categories *</Label>
            <div className="flex gap-2">
              <Input
                id="categories"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                placeholder="e.g., Skincare, Cosmetics"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag(categoryInput, setCategories, setCategoryInput);
                  }
                }}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => handleAddTag(categoryInput, setCategories, setCategoryInput)}
              >
                Add
              </Button>
            </div>
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {categories.map((cat, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                  >
                    {cat}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(index, setCategories)}
                      className="hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="certifications">Certifications (optional)</Label>
            <div className="flex gap-2">
              <Input
                id="certifications"
                value={certificationInput}
                onChange={(e) => setCertificationInput(e.target.value)}
                placeholder="e.g., ISO 9001, Organic"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag(certificationInput, setCertifications, setCertificationInput);
                  }
                }}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => handleAddTag(certificationInput, setCertifications, setCertificationInput)}
              >
                Add
              </Button>
            </div>
            {certifications.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {certifications.map((cert, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-600"
                  >
                    {cert}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(index, setCertifications)}
                      className="hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </>
      );
    }

    if (profile?.role === "brand") {
      return (
        <>
          {renderNameFields()}

          <div className="space-y-2">
            <Label htmlFor="brandName">Brand Name *</Label>
            <Input
              id="brandName"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Your brand name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Industry *</Label>
            <Input
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g., Skincare, Haircare, Cosmetics"
              required
            />
          </div>
        </>
      );
    }

    if (profile?.role === "influencer") {
      return (
        <>
          {renderNameFields()}

          <div className="space-y-2">
            <Label htmlFor="name">Display Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name or handle"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="primaryPlatform">Primary Platform *</Label>
            <Input
              id="primaryPlatform"
              value={primaryPlatform}
              onChange={(e) => setPrimaryPlatform(e.target.value)}
              placeholder="e.g., Instagram, TikTok, YouTube"
              required
            />
          </div>
        </>
      );
    }

    return null;
  };

  const getRoleTitle = () => {
    switch (profile?.role) {
      case "manufacturer":
        return "Manufacturer";
      case "brand":
        return "Brand";
      case "influencer":
        return "Influencer";
      default:
        return "";
    }
  };

  return (
    <OnboardingLayout
      currentStep={2}
      totalSteps={3}
      title={`Complete your ${getRoleTitle()} profile`}
      subtitle="Tell us more about yourself"
    >
      <form onSubmit={handleSubmit} className="form-section space-y-6">
        {renderForm()}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating profile...
            </>
          ) : (
            "Complete Setup"
          )}
        </Button>
      </form>
    </OnboardingLayout>
  );
}
