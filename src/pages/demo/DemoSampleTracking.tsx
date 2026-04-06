import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Filter, Plus } from "lucide-react";

const dispatches = [
  { initials: "SC", name: "Sarah Chen", role: "Lifestyle Lead", sample: "Hydrating Mist v2", batch: "Batch #882-A", status: "Received", next: "Next: Feedback", tracking: "UPS-19283746", trackingDate: "Delivered Oct 24", dots: [true, true, true, false], action: "Request Feedback", actionEnabled: true },
  { initials: "ML", name: "Marcus Low", role: "Skincare Specialist", sample: "Ceramide Whip v1.4", batch: "Batch #901-B", status: "In Transit", next: "ETA: 2 Days", tracking: "FEDEX-88273615", trackingDate: "Departed Memphis", dots: [true, true, false, false], action: "Pending Delivery", actionEnabled: false },
  { initials: "EW", name: "Elena Wagner", role: "Clean Beauty Advocate", sample: "Bakuchiol Serum", batch: "Batch #774-C", status: "Feedback Submitted", next: "Review Complete", tracking: "DHL-99201827", trackingDate: "Delivered Oct 18", dots: [true, true, true, true], action: "View Review", actionEnabled: true, complete: true },
  { initials: "JA", name: "Jordan Avery", role: "Texture Reviewer", sample: "Radiance Primer v2", batch: "Batch #882-A", status: "Formula Prepared", next: "Pending Pickup", tracking: "Generating Label...", trackingDate: "", dots: [true, false, false, false], action: "Manage Lab", actionEnabled: false },
];

const inventory = [
  { name: "Hydrating Mist v2", units: 24, pct: 35, status: "Limited Stock", color: "bg-primary" },
  { name: "Ceramide Whip", units: 142, pct: 85, status: "Healthy Supply", color: "bg-yellow-500" },
  { name: "Bakuchiol Serum", units: 8, pct: 10, status: "Critical: Restock Required", color: "bg-red-400", critical: true },
  { name: "Radiance Primer", units: 60, pct: 55, status: "Stable", color: "bg-primary" },
];

export default function DemoSampleTracking() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Sample Management & Logistics Tracker</h2>
            <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest mt-1">Influencer Seeding & Feedback Pipeline</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline"><Filter className="h-4 w-4 mr-2" />Filter Shipments</Button>
            <Button><Plus className="h-4 w-4 mr-2" />New Dispatch</Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Table */}
          <div className="flex-grow">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Active Sample Dispatches</CardTitle>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Sorted by: Recent</span>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Influencer</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Sample Unit</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Progress</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Tracking</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {dispatches.map((d) => (
                        <tr key={d.name} className="hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xs text-primary">{d.initials}</div>
                              <div><p className="text-sm font-bold">{d.name}</p><p className="text-[10px] text-muted-foreground uppercase">{d.role}</p></div>
                            </div>
                          </td>
                          <td className="px-6 py-5"><p className="text-sm font-bold">{d.sample}</p><p className="text-[10px] text-muted-foreground uppercase">{d.batch}</p></td>
                          <td className="px-6 py-5">
                            <div className="w-48">
                              <div className="flex items-center justify-between mb-2">
                                <span className={`text-[9px] font-bold uppercase ${d.complete ? "text-emerald-500" : "text-primary"}`}>{d.status}</span>
                                <span className="text-[9px] font-bold text-muted-foreground uppercase italic">{d.next}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                {d.dots.map((filled, i) => (
                                  <div key={i} className="flex items-center">
                                    <div className={`h-2 w-2 rounded-full ${filled ? (d.complete ? "bg-emerald-500" : "bg-primary") : "bg-muted"}`} />
                                    {i < d.dots.length - 1 && <div className={`flex-1 h-0.5 w-6 ${filled && d.dots[i + 1] ? (d.complete ? "bg-emerald-500" : "bg-primary") : "bg-muted"}`} />}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <p className={`text-sm font-mono font-medium ${d.trackingDate ? "text-primary underline" : "text-muted-foreground italic"}`}>{d.tracking}</p>
                            {d.trackingDate && <p className="text-[10px] text-muted-foreground uppercase mt-1">{d.trackingDate}</p>}
                          </td>
                          <td className="px-6 py-5 text-right">
                            <Button size="sm" variant={d.actionEnabled ? (d.complete ? "outline" : "default") : "secondary"} disabled={!d.actionEnabled} className="text-[10px] uppercase tracking-widest">
                              {d.action}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm uppercase tracking-widest">Inventory Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {inventory.map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold">{item.name}</span>
                      <span className="text-sm font-bold text-primary">{item.units} Units</span>
                    </div>
                    <Progress value={item.pct} className="h-1.5" />
                    <p className={`text-[9px] uppercase mt-1 tracking-tight ${item.critical ? "text-red-500 font-bold" : "text-muted-foreground"}`}>{item.status}</p>
                  </div>
                ))}
                <Button variant="outline" className="w-full">Generate Batch Report</Button>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Logistics Alert</h4>
                <p className="text-xs text-primary-foreground/70 leading-relaxed">Inclement weather in the NE region may delay shipments by 12-24 hours. Automated notifications sent to 8 influencers.</p>
                <Button variant="link" className="text-primary-foreground mt-4 p-0 text-[10px] font-bold uppercase tracking-widest">View Details</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
