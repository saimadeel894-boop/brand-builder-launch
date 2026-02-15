import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useInfluencerMarketplace } from "@/hooks/useInfluencerMarketplace";
import { ApplicationStatusBadge } from "@/components/influencer/ApplicationStatusBadge";
import { Loader2, AlertCircle, Inbox, ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type SortField = "targetTitle" | "targetType" | "status" | "createdAt";
type SortDir = "asc" | "desc";

export default function InfluencerApplications() {
  const { applications, loading, error } = useInfluencerMarketplace();
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

  const sorted = useMemo(() => {
    const copy = [...applications];
    copy.sort((a, b) => {
      let aVal: any, bVal: any;
      switch (sortField) {
        case "targetTitle": aVal = a.targetTitle.toLowerCase(); bVal = b.targetTitle.toLowerCase(); break;
        case "targetType": aVal = a.targetType; bVal = b.targetType; break;
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
          <h1 className="text-2xl font-bold text-foreground">My Applications</h1>
          <p className="mt-1 text-muted-foreground">Track the status of your campaign and white-label applications.</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 bg-destructive/10 text-destructive rounded-lg">
            <AlertCircle className="h-5 w-5" /><p className="text-sm">{error}</p>
          </div>
        )}

        {applications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-secondary p-4 mb-4"><Inbox className="h-8 w-8 text-muted-foreground" /></div>
            <h3 className="text-lg font-semibold text-foreground mb-1">No applications yet</h3>
            <p className="text-sm text-muted-foreground max-w-sm">Browse the Marketplace to find campaigns and white-label offers to apply to.</p>
          </div>
        ) : (
          <div className="bg-card rounded-xl border shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <button className="flex items-center hover:text-foreground transition-colors" onClick={() => toggleSort("targetTitle")}>
                        Opportunity <SortIcon field="targetTitle" />
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <button className="flex items-center hover:text-foreground transition-colors" onClick={() => toggleSort("targetType")}>
                        Type <SortIcon field="targetType" />
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {sorted.map((app) => (
                    <tr key={app.id} className="hover:bg-secondary/50">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">{app.targetTitle}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground capitalize">
                        {app.targetType === "whiteLabelOffer" ? "White-Label" : "Campaign"}
                      </td>
                      <td className="px-6 py-4"><ApplicationStatusBadge status={app.status} /></td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{app.createdAt ? app.createdAt.toLocaleDateString() : "-"}</td>
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
