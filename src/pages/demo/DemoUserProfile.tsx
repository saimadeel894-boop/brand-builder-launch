import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Building, Lock, Bell, Mail, Phone, MapPin } from "lucide-react";

export default function DemoUserProfile() {
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Personal Information</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage your personal details and public profile presence.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </div>

        {/* Profile Header */}
        <Card>
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="relative group cursor-pointer">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-pink-400 to-primary ring-4 ring-muted flex items-center justify-center text-primary-foreground text-3xl font-bold">JD</div>
              </div>
              <div className="flex-1 w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <div>
                    <h2 className="text-xl font-bold">Jane Doe</h2>
                    <p className="text-muted-foreground">Brand Manager at <span className="text-primary font-medium">Glow Cosmetics</span></p>
                  </div>
                  <Button variant="link" className="text-primary">View Public Profile</Button>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm font-medium"><span>Profile Completion</span><span className="text-primary">85%</span></div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Info */}
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center gap-3"><User className="h-5 w-5 text-muted-foreground" /><CardTitle>Basic Information</CardTitle></div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2"><Label>First Name</Label><Input defaultValue="Jane" /></div>
              <div className="space-y-2"><Label>Last Name</Label><Input defaultValue="Doe" /></div>
              <div className="space-y-2 md:col-span-2"><Label>Headline / Job Title</Label><Input defaultValue="Brand Manager" /></div>
              <div className="space-y-2 md:col-span-2">
                <Label>Bio</Label>
                <Textarea rows={4} defaultValue="Passionate about creating sustainable beauty products. Leading the brand strategy for Glow Cosmetics with 10+ years of experience in the beauty industry." />
                <p className="text-xs text-muted-foreground text-right">240/500 characters</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-muted-foreground" /><CardTitle>Contact Details</CardTitle></div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2"><Label>Email Address</Label><Input type="email" defaultValue="jane.doe@glowcosmetics.com" /></div>
              <div className="space-y-2"><Label>Phone Number</Label><Input type="tel" defaultValue="+1 (555) 123-4567" /></div>
              <div className="space-y-2 md:col-span-2"><Label>Location</Label><Input defaultValue="New York, USA" /></div>
            </div>
          </CardContent>
        </Card>

        {/* Company */}
        <Card>
          <CardHeader className="border-b flex flex-row items-center justify-between">
            <div className="flex items-center gap-3"><Building className="h-5 w-5 text-muted-foreground" /><CardTitle>Company Profile</CardTitle></div>
            <Button variant="link" className="text-primary">Edit Company Details</Button>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-muted p-3 rounded-lg"><div className="w-8 h-8 rounded bg-gradient-to-br from-pink-400 to-primary" /></div>
                  <div>
                    <h4 className="font-bold">Glow Cosmetics Inc.</h4>
                    <p className="text-sm text-muted-foreground mb-2">Registered ID: GC-2023-8849</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-blue-100 text-blue-800">Manufacturer</Badge>
                      <Badge className="bg-purple-100 text-purple-800">Verified Brand</Badge>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">Glow Cosmetics specializes in organic skincare formulations. We are looking for influencers in the clean beauty space and manufacturers for sustainable packaging.</p>
              </div>
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <h5 className="text-xs font-bold uppercase text-muted-foreground mb-3 tracking-wider">Team Members</h5>
                  <div className="flex -space-x-2 overflow-hidden mb-4">
                    {[1, 2, 3].map((i) => <div key={i} className="h-8 w-8 rounded-full bg-muted-foreground/20 ring-2 ring-background" />)}
                    <div className="h-8 w-8 rounded-full bg-muted ring-2 ring-background flex items-center justify-center text-xs font-medium text-muted-foreground">+2</div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">Manage Team</Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center gap-3"><Bell className="h-5 w-5 text-muted-foreground" /><CardTitle>Notification Preferences</CardTitle></div>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {[
              { title: "Product Updates", desc: "Receive updates when new manufacturers join.", on: true },
              { title: "Collaboration Requests", desc: "Get notified via email when a brand sends a request.", on: true },
              { title: "Marketing Newsletter", desc: "Receive weekly trends and platform news.", on: false },
            ].map((n) => (
              <div key={n.title} className="flex items-center justify-between">
                <div><span className="text-sm font-bold">{n.title}</span><p className="text-sm text-muted-foreground">{n.desc}</p></div>
                <Switch defaultChecked={n.on} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
