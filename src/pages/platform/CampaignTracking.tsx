import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";
import { getCampaignsByBrand, Campaign } from "@/services/firestore/campaigns";
import { getApplicationsForTarget, Application } from "@/services/firestore/applications";
import {
  Target, Eye, Users, TrendingUp, CheckCircle, XCircle, Clock,
  ArrowRight, Loader2, Inbox, Plus, BarChart3, Percent, CalendarDays,
  ArrowUp, ArrowDown, ArrowUpDown,
} from "lucide-react";

interface CampaignWithMetrics extends Campaign {
  applicants: number;
  accepted: number;
  rejected: number;
  pending: number;
  conversionRate: number;
  daysActive: number;
}

type SortField = "title" | "status" | "applicants" | "conversionRate" | "createdAt";
type SortDir = "asc" | "desc";

export default function CampaignTracking() {
  const { user } = useFirebaseAuth();
  const [campaigns, setCampaigns] = useState<CampaignWithMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("asc"); }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="h-3 w-3 ml-1 opacity-40" />;
    return sortDir === "asc" ? <ArrowUp className="h-3 w-3 ml-1" /> : <ArrowDown className="h-3 w-3 ml-1" />;
  };

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const data = await getCampaignsByBrand(user.uid);
        const enriched: CampaignWithMetrics[] = await Promise.all(
          data.map(async (c) => {
            let apps: Application[] = [];
            try { apps = await getApplicationsForTarget(c.id); } catch {}
            const accepted = apps.filter((a) => a.status === "accepted").length;
            const rejected = apps.filter((a) => a.status === "rejected").length;
            const pending = apps.filter((a) => a.status === "pending").length;
            const conversionRate = apps.length > 0 ? Math.round((accepted / apps.length) * 100) : 0;
            const daysActive = c.createdAt ? Math.max(1, Math.ceil((Date.now() - c.createdAt.getTime()) / (1000 * 60 * 60 * 24))) : 0;
            return { ...c, applicants: apps.length, accepted, rejected, pending, conversionRate, daysActive };
          })
        );
        setCampaigns(enriched);
      } catch (e) {
        console.error("Error fetching campaigns:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, [user]);

  const totalApplicants = campaigns.reduce((s, c) => s + c.applicants, 0);
  const totalAccepted = campaigns.reduce((s, c) => s + c.accepted, 0);
  const totalRejected = campaigns.reduce((s, c) => s + c.rejected, 0);
  const totalPending = campaigns.reduce((s, c) => s + c.pending, 0);
  const activeCampaigns = campaigns.filter((c) => c.status === "active").length;
  const overallConversion = totalApplicants > 0 ? Math.round((totalAccepted / totalApplicants) * 100) : 0;

  const sorted = useMemo(() => {
    const copy = [...campaigns];
    copy.sort((a, b) => {
      let aVal: any, bVal: any;
      switch (sortField) {
        case "title": aVal = a.title.toLowerCase(); bVal = b.title.toLowerCase(); break;
        case "status": aVal = a.status; bVal = b.status; break;
        case "applicants": aVal = a.applicants; bVal = b.applicants; break;
        case "conversionRate": aVal = a.conversionRate; bVal = b.conversionRate; break;
        case "createdAt": aVal = a.createdAt?.getTime() || 0; bVal = b.createdAt?.getTime() || 0; break;
      }
      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  }, [campaigns, sortField, sortDir]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Campaign Success Tracking</h1>
            <p className="text-muted-foreground">Full performance analytics across all your campaigns</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/campaign-manager"><BarChart3 className="h-4 w-4 mr-2" />Campaign Manager</Link>
            </Button>
            <Button asChild>
              <Link to="/brand/campaigns/create"><Plus className="h-4 w-4 mr-2" />New Campaign</Link>
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {[
            { label: "Total Campaigns", value: campaigns.length, icon: Target, color: "text-primary" },
            { label: "Active", value: activeCampaigns, icon: Eye, color: "text-success" },
            { label: "Total Applicants", value: totalApplicants, icon: Users, color: "text-primary" },
            { label: "Accepted", value: totalAccepted, icon: CheckCircle, color: "text-success" },
            { label: "Rejected", value: totalRejected, icon: XCircle, color: "text-destructive" },
            { label: "Conversion Rate", value: `${overallConversion}%`, icon: Percent, color: "text-primary" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="pt-6 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="text-xl font-bold text-foreground">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Status Breakdown */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Pending Applications</span>
                <Badge variant="secondary">{totalPending}</Badge>
              </div>
              <Progress value={totalApplicants > 0 ? (totalPending / totalApplicants) * 100 : 0} className="h-2" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Acceptance Rate</span>
                <Badge className="bg-success/10 text-success border-success/20">{overallConversion}%</Badge>
              </div>
              <Progress value={overallConversion} className="h-2" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Avg Applicants / Campaign</span>
                <Badge variant="secondary">{campaigns.length ? Math.round(totalApplicants / campaigns.length) : 0}</Badge>
              </div>
              <Progress value={Math.min(100, campaigns.length ? (totalApplicants / campaigns.length) * 10 : 0)} className="h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Campaign Detail Table */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
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
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      {([
                        { field: "title" as SortField, label: "Campaign" },
                        { field: "status" as SortField, label: "Status" },
                        { field: "applicants" as SortField, label: "Applicants" },
                      ]).map(({ field, label }) => (
                        <th key={field} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          <button className="flex items-center hover:text-foreground transition-colors" onClick={() => toggleSort(field)}>
                            {label} <SortIcon field={field} />
                          </button>
                        </th>
                      ))}
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Accepted</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Rejected</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Pending</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        <button className="flex items-center hover:text-foreground transition-colors" onClick={() => toggleSort("conversionRate")}>
                          Conv. Rate <SortIcon field="conversionRate" />
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Days Active</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Budget</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {sorted.map((c) => (
                      <tr key={c.id} className="hover:bg-secondary/50">
                        <td className="px-4 py-4">
                          <div>
                            <p className="font-medium text-foreground text-sm">{c.title}</p>
                            <p className="text-xs text-muted-foreground">{c.category}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <Badge variant={c.status === "active" ? "default" : "secondary"} className="capitalize">{c.status}</Badge>
                        </td>
                        <td className="px-4 py-4 text-sm font-semibold text-foreground">{c.applicants}</td>
                        <td className="px-4 py-4">
                          <span className="text-sm font-semibold text-success">{c.accepted}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm font-semibold text-destructive">{c.rejected}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm font-semibold text-warning">{c.pending}</span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <Progress value={c.conversionRate} className="h-1.5 w-16" />
                            <span className="text-sm font-medium text-foreground">{c.conversionRate}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">{c.daysActive}d</td>
                        <td className="px-4 py-4 text-sm text-foreground">{c.budget || "—"}</td>
                        <td className="px-4 py-4">
                          <Button variant="ghost" size="sm" asChild>
                            <Link to="/brand/applications"><ArrowRight className="h-4 w-4" /></Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
