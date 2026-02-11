import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart3, Eye, Heart, Share2, TrendingUp, Target, DollarSign, Users, ArrowRight } from "lucide-react";

const campaigns = [
  { name: "Summer Glow Collection", status: "Active", progress: 72, impressions: "2.4M", engagement: "4.8%", roi: "340%", influencers: 8 },
  { name: "Clean Beauty Launch", status: "Active", progress: 45, impressions: "1.1M", engagement: "5.2%", roi: "210%", influencers: 5 },
  { name: "Holiday Gift Sets", status: "Planning", progress: 15, impressions: "-", engagement: "-", roi: "-", influencers: 12 },
  { name: "Anti-Aging Serum Push", status: "Completed", progress: 100, impressions: "4.7M", engagement: "6.1%", roi: "520%", influencers: 15 },
];

export default function CampaignTracking() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Campaign Success Tracking</h1>
            <p className="text-muted-foreground">Monitor performance across all active campaigns</p>
          </div>
          <Button className="gap-2">
            <Target className="h-4 w-4" />
            New Campaign
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Impressions", value: "8.2M", icon: Eye, change: "+12%" },
            { label: "Avg Engagement", value: "5.4%", icon: Heart, change: "+0.8%" },
            { label: "Campaign ROI", value: "356%", icon: DollarSign, change: "+24%" },
            { label: "Active Influencers", value: "28", icon: Users, change: "+3" },
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
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-manufacturer" />
                    <span className="text-xs text-manufacturer font-medium">{stat.change}</span>
                    <span className="text-xs text-muted-foreground">vs last month</span>
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
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.name} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border bg-secondary/20 hover:bg-secondary/40 transition-colors gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold text-foreground">{campaign.name}</h4>
                      <Badge variant={campaign.status === "Active" ? "default" : campaign.status === "Completed" ? "secondary" : "outline"}>
                        {campaign.status}
                      </Badge>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <Progress value={campaign.progress} className="flex-1 max-w-[200px]" />
                        <span className="text-xs text-muted-foreground">{campaign.progress}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Impressions</p>
                      <p className="font-semibold text-foreground">{campaign.impressions}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Engagement</p>
                      <p className="font-semibold text-foreground">{campaign.engagement}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">ROI</p>
                      <p className="font-semibold text-manufacturer">{campaign.roi}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Influencers</p>
                      <p className="font-semibold text-foreground">{campaign.influencers}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 rounded-lg bg-secondary/30 flex items-center justify-center border border-dashed border-border">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-muted-foreground/30 mx-auto" />
                <p className="mt-2 text-sm text-muted-foreground">Interactive performance charts</p>
                <p className="text-xs text-muted-foreground">Coming in next update</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
