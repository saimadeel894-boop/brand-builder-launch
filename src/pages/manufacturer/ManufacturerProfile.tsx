import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useManufacturerProfile } from "@/hooks/useManufacturerProfile";
import { ProfileEditForm } from "@/components/manufacturer/ProfileEditForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building2, MapPin, Globe, Package, Clock, Edit, Loader2,
  CheckCircle, DollarSign, User, Beaker, Layers, Image, FileText,
  Factory, Shield, Truck
} from "lucide-react";
import { formatMoq, formatLeadTime, formatPrice } from "@/components/ui/unit-input";

export default function ManufacturerProfile() {
  const { profile, loading, updateProfile } = useManufacturerProfile();
  const [isEditing, setIsEditing] = useState(false);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Profile not found</p>
        </div>
      </DashboardLayout>
    );
  }

  if (isEditing) {
    return (
      <DashboardLayout>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Edit Profile</h1>
          <p className="text-muted-foreground">Update your manufacturer profile information</p>
        </div>
        <ProfileEditForm
          profile={profile}
          onSave={updateProfile}
          onCancel={() => setIsEditing(false)}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Manufacturer Profile</h1>
            <p className="text-muted-foreground">Your public manufacturer profile</p>
          </div>
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        {/* Profile Header Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-xl bg-manufacturer/10 flex items-center justify-center">
                <Building2 className="h-8 w-8 text-manufacturer" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground">{profile.companyName}</h2>
                <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
                  {(profile.firstName || profile.lastName) && (
                    <span className="flex items-center gap-1"><User className="h-3 w-3" />{[profile.firstName, profile.lastName].filter(Boolean).join(" ")}</span>
                  )}
                  {profile.location && (
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{profile.location}</span>
                  )}
                </div>
                {profile.website && (
                  <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1 mt-1">
                    <Globe className="h-3 w-3" />{profile.website}
                  </a>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Factory className="h-5 w-5 text-manufacturer" />
              Company Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{profile.description || "No company overview added yet. Click Edit to add details about your manufacturing capabilities."}</p>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><Package className="h-4 w-4" />MOQ</div>
              <p className="mt-1 text-xl font-bold text-foreground">
                {profile.moq != null ? formatMoq(profile.moq) : "Not specified"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="h-4 w-4" />Lead Time</div>
              <p className="mt-1 text-xl font-bold text-foreground">
                {profile.leadTime != null && profile.leadTimeUnit ? formatLeadTime(profile.leadTime, profile.leadTimeUnit) : "Not specified"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><DollarSign className="h-4 w-4" />Starting Price</div>
              <p className="mt-1 text-xl font-bold text-foreground">
                {profile.price != null && profile.currency ? formatPrice(profile.price, profile.currency) : "Not specified"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><Truck className="h-4 w-4" />Production Capacity</div>
              <p className="mt-1 text-xl font-bold text-foreground">Available</p>
            </CardContent>
          </Card>
        </div>

        {/* Categories, Certifications, Capabilities */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Layers className="h-4 w-4 text-manufacturer" />Product Categories</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.categories.length > 0 ? profile.categories.map((cat) => (
                  <Badge key={cat} variant="secondary">{cat}</Badge>
                )) : <span className="text-sm text-muted-foreground">No categories added</span>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Shield className="h-4 w-4 text-manufacturer" />Certifications</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.certifications.length > 0 ? profile.certifications.map((cert) => (
                  <Badge key={cert} variant="outline" className="gap-1 border-manufacturer/20 text-manufacturer">
                    <CheckCircle className="h-3 w-3" />{cert}
                  </Badge>
                )) : <span className="text-sm text-muted-foreground">No certifications added</span>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Beaker className="h-4 w-4 text-manufacturer" />R&D Capabilities</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-secondary/30 rounded">
                  <span className="text-sm">Custom Formulation</span>
                  <Badge variant="secondary" className="text-xs">Available</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-secondary/30 rounded">
                  <span className="text-sm">White-Label</span>
                  <Badge variant="secondary" className="text-xs">Available</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-secondary/30 rounded">
                  <span className="text-sm">Sample Production</span>
                  <Badge variant="secondary" className="text-xs">Available</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents & Media */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><FileText className="h-4 w-4 text-manufacturer" />Documents</CardTitle></CardHeader>
            <CardContent>
              <div className="h-32 rounded-lg bg-secondary/50 flex items-center justify-center border border-dashed border-border">
                <div className="text-center">
                  <FileText className="h-8 w-8 text-muted-foreground/30 mx-auto" />
                  <p className="text-xs text-muted-foreground mt-1">Upload company documents</p>
                  <p className="text-xs text-muted-foreground">Brochures, certifications, capability sheets</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Image className="h-4 w-4 text-manufacturer" />Media Gallery</CardTitle></CardHeader>
            <CardContent>
              <div className="h-32 rounded-lg bg-secondary/50 flex items-center justify-center border border-dashed border-border">
                <div className="text-center">
                  <Image className="h-8 w-8 text-muted-foreground/30 mx-auto" />
                  <p className="text-xs text-muted-foreground mt-1">Add facility & product photos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
