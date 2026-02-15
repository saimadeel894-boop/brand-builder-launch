import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";
import { getCampaignsByBrand } from "@/services/firestore/campaigns";
import { getApplicationsForTarget } from "@/services/firestore/applications";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { ApplicationStatusBadge } from "@/components/influencer/ApplicationStatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Inbox, CheckCircle, XCircle } from "lucide-react";

interface AppWithCampaign {
  id: string;
  influencerId: string;
  targetTitle: string;
  status: string;
  message?: string;
  createdAt?: Date;
}

export default function BrandApplications() {
  const { user } = useFirebaseAuth();
  const { toast } = useToast();
  const [applications, setApplications] = useState<AppWithCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const campaigns = await getCampaignsByBrand(user.uid);
      const allApps: AppWithCampaign[] = [];
      for (const campaign of campaigns) {
        const apps = await getApplicationsForTarget(campaign.id);
        allApps.push(...apps.map((a) => ({
          id: a.id,
          influencerId: a.influencerId,
          targetTitle: a.targetTitle,
          status: a.status,
          message: a.message,
          createdAt: a.createdAt,
        })));
      }
      allApps.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
      setApplications(allApps);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [user]);

  const updateStatus = async (appId: string, status: "accepted" | "rejected") => {
    setUpdatingId(appId);
    try {
      await updateDoc(doc(db, "applications", appId), { status, updatedAt: serverTimestamp() });
      toast({ title: `Application ${status}` });
      fetchData();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return <DashboardLayout><div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div></DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Campaign Applications</h1>
          <p className="text-muted-foreground">Review and manage influencer applications to your campaigns.</p>
        </div>

        {applications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-secondary p-4 mb-4"><Inbox className="h-8 w-8 text-muted-foreground" /></div>
            <h3 className="text-lg font-semibold text-foreground mb-1">No applications yet</h3>
            <p className="text-sm text-muted-foreground">Create a campaign to start receiving influencer applications.</p>
          </div>
        ) : (
          <div className="bg-card rounded-xl border shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Campaign</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Influencer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Message</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-secondary/50">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">{app.targetTitle}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{app.influencerId.slice(0, 8)}...</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground max-w-[200px] truncate">{app.message || "—"}</td>
                      <td className="px-6 py-4"><ApplicationStatusBadge status={app.status} /></td>
                      <td className="px-6 py-4">
                        {app.status === "pending" ? (
                          <div className="flex gap-2">
                            <Button size="sm" variant="default" disabled={updatingId === app.id} onClick={() => updateStatus(app.id, "accepted")}>
                              {updatingId === app.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <CheckCircle className="h-3 w-3 mr-1" />}Accept
                            </Button>
                            <Button size="sm" variant="outline" disabled={updatingId === app.id} onClick={() => updateStatus(app.id, "rejected")}>
                              <XCircle className="h-3 w-3 mr-1" />Reject
                            </Button>
                          </div>
                        ) : (
                          <Badge variant="outline" className="capitalize">{app.status}</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
