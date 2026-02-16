import { useState, useEffect, useMemo } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";
import { getCampaignsByBrand } from "@/services/firestore/campaigns";
import { getApplicationsForTarget } from "@/services/firestore/applications";
import { doc, updateDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { ApplicationStatusBadge } from "@/components/influencer/ApplicationStatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Inbox, CheckCircle, XCircle, ArrowUp, ArrowDown, ArrowUpDown, Eye } from "lucide-react";

interface AppWithDetails {
  id: string;
  influencerId: string;
  influencerName: string;
  targetTitle: string;
  status: string;
  message?: string;
  createdAt?: Date;
}

type SortField = "targetTitle" | "influencerName" | "status" | "createdAt";
type SortDir = "asc" | "desc";

export default function BrandApplications() {
  const { user } = useFirebaseAuth();
  const { toast } = useToast();
  const [applications, setApplications] = useState<AppWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<AppWithDetails | null>(null);
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="h-3 w-3 ml-1 opacity-40" />;
    return sortDir === "asc" ? <ArrowUp className="h-3 w-3 ml-1" /> : <ArrowDown className="h-3 w-3 ml-1" />;
  };

  const fetchInfluencerName = async (influencerId: string): Promise<string> => {
    try {
      // Try influencerProfiles first
      const profileSnap = await getDoc(doc(db, "influencerProfiles", influencerId));
      if (profileSnap.exists()) {
        const data = profileSnap.data();
        if (data.firstName && data.lastName) return `${data.firstName} ${data.lastName}`;
        if (data.name) return data.name;
      }
      // Fallback to users collection
      const userSnap = await getDoc(doc(db, "users", influencerId));
      if (userSnap.exists()) {
        const data = userSnap.data();
        if (data.firstName && data.lastName) return `${data.firstName} ${data.lastName}`;
        if (data.email) return data.email.split("@")[0];
      }
      return "Unknown Influencer";
    } catch {
      return "Unknown Influencer";
    }
  };

  const fetchData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const campaigns = await getCampaignsByBrand(user.uid);
      const allApps: AppWithDetails[] = [];
      for (const campaign of campaigns) {
        const apps = await getApplicationsForTarget(campaign.id);
        for (const a of apps) {
          const influencerName = await fetchInfluencerName(a.influencerId);
          allApps.push({
            id: a.id,
            influencerId: a.influencerId,
            influencerName,
            targetTitle: a.targetTitle,
            status: a.status,
            message: a.message,
            createdAt: a.createdAt,
          });
        }
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

  const sorted = useMemo(() => {
    const copy = [...applications];
    copy.sort((a, b) => {
      let aVal: any, bVal: any;
      switch (sortField) {
        case "targetTitle": aVal = a.targetTitle.toLowerCase(); bVal = b.targetTitle.toLowerCase(); break;
        case "influencerName": aVal = a.influencerName.toLowerCase(); bVal = b.influencerName.toLowerCase(); break;
        case "status": aVal = a.status; bVal = b.status; break;
        case "createdAt": aVal = a.createdAt?.getTime() || 0; bVal = b.createdAt?.getTime() || 0; break;
      }
      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  }, [applications, sortField, sortDir]);

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
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <button className="flex items-center hover:text-foreground transition-colors" onClick={() => toggleSort("targetTitle")}>
                        Campaign <SortIcon field="targetTitle" />
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <button className="flex items-center hover:text-foreground transition-colors" onClick={() => toggleSort("influencerName")}>
                        Influencer <SortIcon field="influencerName" />
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <button className="flex items-center hover:text-foreground transition-colors" onClick={() => toggleSort("status")}>
                        Status <SortIcon field="status" />
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <button className="flex items-center hover:text-foreground transition-colors" onClick={() => toggleSort("createdAt")}>
                        Applied <SortIcon field="createdAt" />
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {sorted.map((app) => (
                    <tr key={app.id} className="hover:bg-secondary/50 cursor-pointer" onClick={() => setSelectedApp(app)}>
                      <td className="px-6 py-4 text-sm font-medium text-foreground">{app.targetTitle}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{app.influencerName}</td>
                      <td className="px-6 py-4"><ApplicationStatusBadge status={app.status} /></td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{app.createdAt ? app.createdAt.toLocaleDateString() : "—"}</td>
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" onClick={() => setSelectedApp(app)}>
                            <Eye className="h-3 w-3 mr-1" />View
                          </Button>
                          {app.status === "pending" && (
                            <>
                              <Button size="sm" variant="default" disabled={updatingId === app.id} onClick={() => updateStatus(app.id, "accepted")}>
                                {updatingId === app.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <CheckCircle className="h-3 w-3 mr-1" />}Accept
                              </Button>
                              <Button size="sm" variant="outline" disabled={updatingId === app.id} onClick={() => updateStatus(app.id, "rejected")}>
                                <XCircle className="h-3 w-3 mr-1" />Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Application Detail Dialog */}
      <Dialog open={!!selectedApp} onOpenChange={(open) => !open && setSelectedApp(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>
          {selectedApp && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Campaign</p>
                  <p className="font-medium text-foreground">{selectedApp.targetTitle}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Influencer</p>
                  <p className="font-medium text-foreground">{selectedApp.influencerName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <ApplicationStatusBadge status={selectedApp.status} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Submitted</p>
                  <p className="font-medium text-foreground">{selectedApp.createdAt ? selectedApp.createdAt.toLocaleDateString() : "—"}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Application Message</p>
                <p className="mt-1 text-foreground bg-secondary/50 rounded-lg p-3 text-sm">
                  {selectedApp.message || "No message provided."}
                </p>
              </div>
              {selectedApp.status === "pending" && (
                <div className="flex gap-2 pt-2 border-t">
                  <Button className="flex-1" disabled={updatingId === selectedApp.id} onClick={() => { updateStatus(selectedApp.id, "accepted"); setSelectedApp(null); }}>
                    <CheckCircle className="h-4 w-4 mr-2" />Accept
                  </Button>
                  <Button variant="outline" className="flex-1" disabled={updatingId === selectedApp.id} onClick={() => { updateStatus(selectedApp.id, "rejected"); setSelectedApp(null); }}>
                    <XCircle className="h-4 w-4 mr-2" />Reject
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
