import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";
import { getCampaignsByBrand, Campaign } from "@/services/firestore/campaigns";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import {
  Plus, Loader2, Inbox, Settings2, Eye, EyeOff, ArrowRight, Target,
  BarChart3, Pencil,
} from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";

export default function CampaignManager() {
  const { user } = useFirebaseAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchCampaigns = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getCampaignsByBrand(user.uid);
      data.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
      setCampaigns(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCampaigns(); }, [user]);

  const toggleStatus = async (campaign: Campaign) => {
    setUpdatingId(campaign.id);
    const newStatus = campaign.status === "active" ? "closed" : "active";
    try {
      await updateDoc(doc(db, "campaigns", campaign.id), { status: newStatus, updatedAt: serverTimestamp() });
      toast({ title: `Campaign ${newStatus === "active" ? "activated" : "closed"}` });
      fetchCampaigns();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setUpdatingId(null);
    }
  };

  const activeCampaigns = campaigns.filter((c) => c.status === "active").length;
  const closedCampaigns = campaigns.filter((c) => c.status === "closed").length;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Campaign Manager</h1>
            <p className="text-muted-foreground">Create, manage, and control your campaign lifecycle</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/campaign-tracking"><BarChart3 className="h-4 w-4 mr-2" />View Analytics</Link>
            </Button>
            <Button asChild>
              <Link to="/brand/campaigns/create"><Plus className="h-4 w-4 mr-2" />New Campaign</Link>
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Campaigns</p>
                  <p className="text-2xl font-bold text-foreground">{campaigns.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <Eye className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold text-foreground">{activeCampaigns}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                  <EyeOff className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Closed</p>
                  <p className="text-2xl font-bold text-foreground">{closedCampaigns}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Campaign List */}
        <Card>
          <CardHeader>
            <CardTitle>All Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : campaigns.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-secondary p-4 mb-4">
                  <Inbox className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">No campaigns yet</h3>
                <p className="text-sm text-muted-foreground">Create your first campaign to get started.</p>
                <Button asChild className="mt-4">
                  <Link to="/brand/campaigns/create">Create Campaign</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border bg-secondary/20 hover:bg-secondary/40 transition-colors gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold text-foreground">{campaign.title}</h4>
                        <Badge variant={campaign.status === "active" ? "default" : "secondary"} className="capitalize">{campaign.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{campaign.description}</p>
                      <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Category: {campaign.category}</span>
                        {campaign.budget && <span>Budget: {campaign.budget}</span>}
                        {campaign.deadline && <span>Deadline: {campaign.deadline}</span>}
                        {campaign.createdAt && <span>Created: {campaign.createdAt.toLocaleDateString()}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" onClick={() => setSelectedCampaign(campaign)}>
                        <Settings2 className="h-4 w-4 mr-1" />Details
                      </Button>
                      <Button
                        size="sm"
                        variant={campaign.status === "active" ? "outline" : "default"}
                        disabled={updatingId === campaign.id}
                        onClick={() => toggleStatus(campaign)}
                      >
                        {updatingId === campaign.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : campaign.status === "active" ? (
                          <><EyeOff className="h-4 w-4 mr-1" />Close</>
                        ) : (
                          <><Eye className="h-4 w-4 mr-1" />Activate</>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Campaign Detail Dialog */}
      <Dialog open={!!selectedCampaign} onOpenChange={(open) => !open && setSelectedCampaign(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Campaign Details</DialogTitle>
          </DialogHeader>
          {selectedCampaign && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Title</p>
                  <p className="font-medium text-foreground">{selectedCampaign.title}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant={selectedCampaign.status === "active" ? "default" : "secondary"} className="capitalize">{selectedCampaign.status}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium text-foreground">{selectedCampaign.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Budget</p>
                  <p className="font-medium text-foreground">{selectedCampaign.budget || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Deadline</p>
                  <p className="font-medium text-foreground">{selectedCampaign.deadline || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="font-medium text-foreground">{selectedCampaign.createdAt?.toLocaleDateString() || "—"}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="mt-1 text-foreground bg-secondary/50 rounded-lg p-3 text-sm">{selectedCampaign.description}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Requirements</p>
                <p className="mt-1 text-foreground bg-secondary/50 rounded-lg p-3 text-sm">{selectedCampaign.requirements || "—"}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
