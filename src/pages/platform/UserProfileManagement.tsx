import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Bell,
  Lock,
  Users,
  Edit,
} from "lucide-react";

export default function UserProfileManagement() {
  const { profile } = useFirebaseAuth();
  const [notifications, setNotifications] = useState({
    productUpdates: true,
    collaborationRequests: true,
    newsletter: false,
  });

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Personal Information</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage your personal details and public profile presence.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </div>

        {/* Profile Header Card */}
        <Card>
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="relative group cursor-pointer">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/10 ring-4 ring-secondary flex items-center justify-center">
                  <User className="h-12 w-12 text-primary" />
                </div>
                <div className="absolute inset-0 bg-foreground/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Edit className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>
              <div className="flex-1 w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <div>
                    <h2 className="text-xl font-bold">{profile?.email?.split("@")[0] || "User"}</h2>
                    <p className="text-muted-foreground">
                      {profile?.role ? `${profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}` : "User"} at{" "}
                      <span className="text-primary font-medium">BeautyChain</span>
                    </p>
                  </div>
                  <Button variant="link" className="text-sm">View Public Profile</Button>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Profile Completion</span>
                    <span className="text-primary">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Info */}
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Basic Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input defaultValue="Jane" />
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input defaultValue="Doe" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Headline / Job Title</Label>
                <Input defaultValue="Brand Manager" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Bio</Label>
                <Textarea
                  rows={4}
                  defaultValue="Passionate about creating sustainable beauty products. Leading the brand strategy with 10+ years of experience in the beauty industry."
                />
                <p className="text-xs text-muted-foreground text-right">240/500 characters</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Details */}
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Contact Details</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-10" type="email" defaultValue={profile?.email || "jane@example.com"} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-10" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-10" defaultValue="New York, USA" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Profile */}
        <Card>
          <CardHeader className="border-b flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Company Profile</CardTitle>
            </div>
            <Button variant="link" size="sm">Edit Company Details</Button>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-secondary p-3 rounded-lg">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-pink-400 to-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">Glow Cosmetics Inc.</h4>
                    <p className="text-sm text-muted-foreground mb-2">Registered ID: GC-2023-8849</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">Manufacturer</Badge>
                      <Badge className="bg-purple-100 text-purple-800 border-purple-200">Verified Brand</Badge>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Glow Cosmetics specializes in organic skincare formulations. We are looking for influencers in the clean beauty space and manufacturers for sustainable packaging.
                </p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4 border">
                <h5 className="text-xs font-bold uppercase text-muted-foreground mb-3 tracking-wider">Team Members</h5>
                <div className="flex -space-x-2 overflow-hidden mb-4">
                  {["JD", "SK", "MR"].map((initials) => (
                    <div key={initials} className="h-8 w-8 rounded-full bg-primary/10 ring-2 ring-card flex items-center justify-center text-xs font-medium text-primary">
                      {initials}
                    </div>
                  ))}
                  <div className="h-8 w-8 rounded-full bg-secondary ring-2 ring-card flex items-center justify-center text-xs text-muted-foreground">+2</div>
                </div>
                <Button variant="outline" size="sm" className="w-full">Manage Team</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Notification Preferences</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-bold">Product Updates</span>
                <p className="text-sm text-muted-foreground">Receive updates when new manufacturers join.</p>
              </div>
              <Switch checked={notifications.productUpdates} onCheckedChange={(v) => setNotifications(p => ({ ...p, productUpdates: v }))} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-bold">Collaboration Requests</span>
                <p className="text-sm text-muted-foreground">Get notified via email when a brand sends a request.</p>
              </div>
              <Switch checked={notifications.collaborationRequests} onCheckedChange={(v) => setNotifications(p => ({ ...p, collaborationRequests: v }))} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-bold">Marketing Newsletter</span>
                <p className="text-sm text-muted-foreground">Receive weekly trends and platform news.</p>
              </div>
              <Switch checked={notifications.newsletter} onCheckedChange={(v) => setNotifications(p => ({ ...p, newsletter: v }))} />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
