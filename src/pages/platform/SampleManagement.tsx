import { DashboardLayout } from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Package,
  Filter,
  Plus,
  AlertTriangle,
} from "lucide-react";

const dispatches = [
  {
    influencer: "Sarah Chen",
    initials: "SC",
    role: "Lifestyle Lead",
    sample: "Hydrating Mist v2",
    batch: "Batch #882-A",
    status: "Received",
    next: "Next: Feedback",
    tracking: "UPS-19283746",
    trackingMeta: "Delivered Oct 24",
    progress: 3,
    action: "Request Feedback",
    actionEnabled: true,
  },
  {
    influencer: "Marcus Low",
    initials: "ML",
    role: "Skincare Specialist",
    sample: "Ceramide Whip v1.4",
    batch: "Batch #901-B",
    status: "In Transit",
    next: "ETA: 2 Days",
    tracking: "FEDEX-88273615",
    trackingMeta: "Departed Memphis",
    progress: 2,
    action: "Pending Delivery",
    actionEnabled: false,
  },
  {
    influencer: "Elena Wagner",
    initials: "EW",
    role: "Clean Beauty Advocate",
    sample: "Bakuchiol Serum",
    batch: "Batch #774-C",
    status: "Feedback Submitted",
    next: "Review Complete",
    tracking: "DHL-99201827",
    trackingMeta: "Delivered Oct 18",
    progress: 4,
    action: "View Review",
    actionEnabled: true,
    complete: true,
  },
  {
    influencer: "Jordan Avery",
    initials: "JA",
    role: "Texture Reviewer",
    sample: "Radiance Primer v2",
    batch: "Batch #882-A",
    status: "Formula Prepared",
    next: "Pending Pickup",
    tracking: "Generating Label...",
    trackingMeta: "",
    progress: 1,
    action: "Manage Lab",
    actionEnabled: false,
  },
];

const inventory = [
  { name: "Hydrating Mist v2", units: 24, percent: 35, status: "Limited Stock", color: "bg-primary" },
  { name: "Ceramide Whip", units: 142, percent: 85, status: "Healthy Supply", color: "bg-yellow-500" },
  { name: "Bakuchiol Serum", units: 8, percent: 10, status: "Critical: Restock Required", color: "bg-red-400", critical: true },
  { name: "Radiance Primer", units: 60, percent: 55, status: "Stable", color: "bg-primary" },
];

function ProgressDots({ filled, total = 4 }: { filled: number; total?: number }) {
  return (
    <div className="flex items-center w-48">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center flex-1">
          <div className={`w-2 h-2 rounded-full ${i < filled ? (filled === total ? "bg-green-500" : "bg-primary") : "bg-secondary"}`} />
          {i < total - 1 && (
            <div className={`flex-1 h-0.5 ${i < filled - 1 ? (filled === total ? "bg-green-500" : "bg-primary") : "bg-secondary"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function SampleManagement() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Sample Management & Logistics Tracker</h2>
            <p className="text-muted-foreground text-sm uppercase tracking-widest">
              Influencer Seeding & Feedback Pipeline
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" /> Filter Shipments</Button>
            <Button className="gap-2"><Plus className="h-4 w-4" /> New Dispatch</Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Table */}
          <div className="flex-grow">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between border-b">
                <CardTitle>Active Sample Dispatches</CardTitle>
                <span className="text-xs text-muted-foreground uppercase tracking-widest">Sorted by: Recent</span>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-secondary/50">
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Influencer</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Sample Unit</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Progress Tracker</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Tracking</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {dispatches.map((d) => (
                        <tr key={d.influencer} className="hover:bg-secondary/30 transition-colors">
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center font-bold text-xs text-primary">{d.initials}</div>
                              <div>
                                <p className="text-sm font-bold">{d.influencer}</p>
                                <p className="text-[10px] text-muted-foreground uppercase">{d.role}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <p className="text-sm font-bold">{d.sample}</p>
                            <p className="text-[10px] text-muted-foreground uppercase">{d.batch}</p>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center justify-between mb-2">
                              <span className={`text-[9px] font-bold uppercase ${d.complete ? "text-green-600" : "text-primary"}`}>{d.status}</span>
                              <span className="text-[9px] font-bold text-muted-foreground uppercase italic">{d.next}</span>
                            </div>
                            <ProgressDots filled={d.progress} />
                          </td>
                          <td className="px-6 py-5">
                            <p className={`text-sm font-mono ${d.progress > 1 ? "text-primary font-medium underline underline-offset-4" : "text-muted-foreground italic"}`}>
                              {d.tracking}
                            </p>
                            {d.trackingMeta && <p className="text-[10px] text-muted-foreground uppercase mt-1">{d.trackingMeta}</p>}
                          </td>
                          <td className="px-6 py-5 text-right">
                            <Button
                              size="sm"
                              variant={d.complete ? "outline" : d.actionEnabled ? "default" : "secondary"}
                              disabled={!d.actionEnabled}
                              className="text-xs uppercase tracking-widest"
                            >
                              {d.action}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 bg-secondary/30 border-t text-center">
                  <Button variant="link" className="text-xs uppercase tracking-widest">Load More Shipments</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm uppercase tracking-widest">Inventory Overview</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="space-y-6">
                {inventory.map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold">{item.name}</span>
                      <span className="text-sm font-bold text-primary">{item.units} Units</span>
                    </div>
                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percent}%` }} />
                    </div>
                    <p className={`text-[9px] uppercase mt-1 tracking-tight ${item.critical ? "text-red-500 font-bold" : "text-muted-foreground"}`}>
                      Status: {item.status}
                    </p>
                  </div>
                ))}
                <Button variant="secondary" className="w-full text-xs uppercase tracking-widest">Generate Batch Report</Button>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Logistics Alert</h4>
                <p className="text-xs text-primary-foreground/70 leading-relaxed">
                  Inclement weather in the NE region may delay shipments by 12-24 hours. Automated notifications sent to 8 influencers.
                </p>
                <Button variant="link" className="mt-4 text-[10px] font-bold uppercase tracking-widest text-primary-foreground p-0 h-auto">
                  View Details
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
