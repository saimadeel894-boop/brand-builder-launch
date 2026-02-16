import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";
import { getCampaignsByBrand, Campaign } from "@/services/firestore/campaigns";
import { getApplicationsForTarget } from "@/services/firestore/applications";
import { BarChart3, Eye, Heart, TrendingUp, Target, DollarSign, Users, ArrowRight, Loader2, Inbox } from "lucide-react";

export default function CampaignTracking() {
  const { user, profile: authProfile } = useFirebaseAuth();
  const [campaigns, setCampaigns] = useState<(Campaign & { applicants: number })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const data = await getCampaignsByBrand(user.uid);
        // Fetch application counts for each campaign
        const enriched = await Promise.all(
          data.map(async (c) => {
            try {
              const apps = await getApplicationsForTarget(c.id);
              return { ...c, applicants: apps.length };
            } catch {
              return { ...c, applicants: 0 };
            }
          })
        );
        // Sort newest first
        enriched.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
        setCampaigns(enriched);
      } catch (e) {
        console.error("Error fetching campaigns:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, [user]);

  const activeCampaigns = campaigns.filter((c) => c.status === "active").length;
  const totalApplicants = campaigns.reduce((sum, c) => sum + c.applicants, 0);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Campaign Success Tracking</h1>
            <p className="text-muted-foreground">Monitor performance across all your campaigns</p>
          </div>
          <Button className="gap-2" asChild>
            <Link to="/brand/campaigns/create">
              <Target className="h-4 w-4" />
              New Campaign
            </Link>
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Campaigns", value: String(campaigns.length), icon: Target },
            { label: "Active Campaigns", value: String(activeCampaigns), icon: Eye },
            { label: "Total Applicants", value: String(totalApplicants), icon: Users },
            { label: "Avg Applicants", value: campaigns.length ? String(Math.round(totalApplicants / campaigns.length)) : "0", icon: TrendingUp },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
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
                <p className="text-sm text-muted-foreground max-w-sm">Create your first campaign to start attracting influencer applications.</p>
                <Button asChild className="mt-4">
                  <Link to="/brand/campaigns/create">Create Campaign</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border bg-secondary/20 hover:bg-secondary/40 transition-colors gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold text-foreground">{campaign.title}</h4>
                        <Badge variant={campaign.status === "active" ? "default" : "secondary"} className="capitalize">
                          {campaign.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{campaign.description}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Category</p>
                        <p className="font-semibold text-foreground">{campaign.category}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Budget</p>
                        <p className="font-semibold text-foreground">{campaign.budget || "—"}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Applicants</p>
                        <p className="font-semibold text-primary">{campaign.applicants}</p>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to="/brand/applications">
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
