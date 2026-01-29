import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useManufacturerProfile } from "@/hooks/useManufacturerProfile";
import { ProfileEditForm } from "@/components/manufacturer/ProfileEditForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building2, 
  MapPin, 
  Globe, 
  Package, 
  Clock, 
  Edit, 
  Loader2,
  CheckCircle
} from "lucide-react";

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
            <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
            <p className="text-muted-foreground">Manage your manufacturer profile</p>
          </div>
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        {/* Profile Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">{profile.companyName}</CardTitle>
                {profile.location && (
                  <p className="text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="h-4 w-4" />
                    {profile.location}
                  </p>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Description */}
            {profile.description && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">About</h3>
                <p className="text-foreground">{profile.description}</p>
              </div>
            )}

            {/* Website */}
            {profile.website && (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {profile.website}
                </a>
              </div>
            )}

            {/* MOQ and Lead Time */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                <Package className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Minimum Order Quantity</p>
                  <p className="font-medium">{profile.moq || "Not specified"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Lead Time</p>
                  <p className="font-medium">{profile.leadTime || "Not specified"}</p>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {profile.categories.length > 0 ? (
                  profile.categories.map((cat) => (
                    <Badge key={cat} variant="secondary">
                      {cat}
                    </Badge>
                  ))
                ) : (
                  <span className="text-muted-foreground">No categories added</span>
                )}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {profile.certifications.length > 0 ? (
                  profile.certifications.map((cert) => (
                    <Badge key={cert} variant="outline" className="gap-1">
                      <CheckCircle className="h-3 w-3" />
                      {cert}
                    </Badge>
                  ))
                ) : (
                  <span className="text-muted-foreground">No certifications added</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
