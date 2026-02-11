import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import {
  Users, Edit, Save, X, Loader2, Instagram, Youtube, Heart,
  Eye, BarChart3, Star, FileText, Image, Globe, Briefcase
} from "lucide-react";

interface InfluencerProfileData {
  name: string;
  firstName?: string;
  lastName?: string;
  primaryPlatform: string;
  bio?: string;
  niche?: string;
  audienceSize?: string;
  engagementRate?: string;
  audienceDemographics?: string;
  pastCollaborations?: string[];
  portfolioLinks?: string[];
  website?: string;
  location?: string;
  platforms?: { name: string; followers: string; engagement: string }[];
}

export default function InfluencerProfile() {
  const { user } = useFirebaseAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<InfluencerProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<InfluencerProfileData | null>(null);

  useEffect(() => {
    const fetch = async () => {
      if (!user) return;
      try {
        const snap = await getDoc(doc(db, "influencerProfiles", user.uid));
        if (snap.exists()) {
          const d = snap.data() as InfluencerProfileData;
          setProfile(d);
          setFormData(d);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [user]);

  const handleSave = async () => {
    if (!user || !formData) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, "influencerProfiles", user.uid), { ...formData, updatedAt: serverTimestamp() });
      setProfile(formData);
      setEditing(false);
      toast({ title: "Profile updated successfully" });
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <DashboardLayout><div className="flex items-center justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div></DashboardLayout>;

  if (!profile || !formData) return <DashboardLayout><div className="text-center py-12"><p className="text-muted-foreground">Profile not found</p></div></DashboardLayout>;

  if (editing) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Edit Profile</h1>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => { setFormData(profile); setEditing(false); }}><X className="h-4 w-4 mr-2" />Cancel</Button>
              <Button onClick={handleSave} disabled={saving}>{saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}Save</Button>
            </div>
          </div>
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><Label>Display Name</Label><Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></div>
                <div className="space-y-2"><Label>Primary Platform</Label><Input value={formData.primaryPlatform} onChange={(e) => setFormData({ ...formData, primaryPlatform: e.target.value })} /></div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><Label>Niche / Category</Label><Input value={formData.niche || ""} onChange={(e) => setFormData({ ...formData, niche: e.target.value })} placeholder="e.g., Skincare, Clean Beauty" /></div>
                <div className="space-y-2"><Label>Location</Label><Input value={formData.location || ""} onChange={(e) => setFormData({ ...formData, location: e.target.value })} /></div>
              </div>
              <div className="space-y-2"><Label>Bio</Label><Textarea value={formData.bio || ""} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} placeholder="Tell brands about yourself..." rows={4} /></div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><Label>Audience Size</Label><Input value={formData.audienceSize || ""} onChange={(e) => setFormData({ ...formData, audienceSize: e.target.value })} placeholder="e.g., 150K" /></div>
                <div className="space-y-2"><Label>Engagement Rate</Label><Input value={formData.engagementRate || ""} onChange={(e) => setFormData({ ...formData, engagementRate: e.target.value })} placeholder="e.g., 4.5%" /></div>
              </div>
              <div className="space-y-2"><Label>Audience Demographics</Label><Input value={formData.audienceDemographics || ""} onChange={(e) => setFormData({ ...formData, audienceDemographics: e.target.value })} placeholder="e.g., Women 18-34, 70% US-based" /></div>
              <div className="space-y-2"><Label>Website</Label><Input value={formData.website || ""} onChange={(e) => setFormData({ ...formData, website: e.target.value })} placeholder="https://" /></div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Influencer Profile</h1>
            <p className="text-muted-foreground">Manage your creator profile</p>
          </div>
          <Button onClick={() => setEditing(true)}><Edit className="h-4 w-4 mr-2" />Edit Profile</Button>
        </div>

        {/* Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-full bg-influencer/10 flex items-center justify-center">
                <Users className="h-8 w-8 text-influencer" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground">{profile.name}</h2>
                <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
                  <Badge className="bg-influencer/10 text-influencer border-influencer/20">{profile.primaryPlatform}</Badge>
                  {profile.niche && <Badge variant="secondary">{profile.niche}</Badge>}
                  {profile.location && <span className="flex items-center gap-1"><Globe className="h-3 w-3" />{profile.location}</span>}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bio */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Briefcase className="h-5 w-5 text-influencer" />Bio</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{profile.bio || "No bio added yet. Click Edit to add your bio."}</p>
          </CardContent>
        </Card>

        {/* Metrics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><Eye className="h-4 w-4" />Audience Size</div>
              <p className="mt-1 text-2xl font-bold text-foreground">{profile.audienceSize || "—"}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><Heart className="h-4 w-4" />Engagement Rate</div>
              <p className="mt-1 text-2xl font-bold text-foreground">{profile.engagementRate || "—"}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><Users className="h-4 w-4" />Demographics</div>
              <p className="mt-1 text-sm font-medium text-foreground">{profile.audienceDemographics || "—"}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><Star className="h-4 w-4" />Past Collaborations</div>
              <p className="mt-1 text-2xl font-bold text-foreground">{profile.pastCollaborations?.length || 0}</p>
            </CardContent>
          </Card>
        </div>

        {/* Media Kit & Portfolio */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><FileText className="h-4 w-4 text-influencer" />Media Kit</CardTitle></CardHeader>
            <CardContent>
              <div className="h-32 rounded-lg bg-secondary/50 flex items-center justify-center border border-dashed border-border">
                <div className="text-center">
                  <FileText className="h-8 w-8 text-muted-foreground/30 mx-auto" />
                  <p className="text-xs text-muted-foreground mt-1">Upload your media kit</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Image className="h-4 w-4 text-influencer" />Portfolio Gallery</CardTitle></CardHeader>
            <CardContent>
              <div className="h-32 rounded-lg bg-secondary/50 flex items-center justify-center border border-dashed border-border">
                <div className="text-center">
                  <Image className="h-8 w-8 text-muted-foreground/30 mx-auto" />
                  <p className="text-xs text-muted-foreground mt-1">Add portfolio images</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
