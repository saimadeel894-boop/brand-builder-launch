import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Package, Clock, DollarSign, MessageSquare, TrendingUp, MoreVertical, UserPlus, Plus } from "lucide-react";

const projects = [
  { name: "Summer Glow Kit", sku: "SGK-2023-01", partner: "PureLabs Mfg", status: "In Production", statusColor: "bg-blue-100 text-blue-700", progress: 65, progressColor: "bg-primary" },
  { name: "Matte Lipstick Line", sku: "MLL-2023-04", partner: "Bella Shade", status: "Sampling", statusColor: "bg-amber-100 text-amber-700", progress: 20, progressColor: "bg-amber-500" },
  { name: "Organic Serum Base", sku: "OSB-2023-09", partner: "GreenChem Inc", status: "Shipping", statusColor: "bg-emerald-100 text-emerald-700", progress: 95, progressColor: "bg-emerald-500" },
];

const activities = [
  { text: "PureLabs Mfg viewed your proposal for Summer Glow Kit.", time: "2 hours ago", color: "bg-primary" },
  { text: "New contract generated for Bella Shade collaboration.", time: "Yesterday, 4:30 PM", color: "bg-blue-500", action: "Review Contract" },
  { text: "Shipment #SHP-9921 has arrived at warehouse.", time: "Yesterday, 10:00 AM", color: "bg-emerald-500" },
  { text: "System maintenance scheduled for Oct 24th.", time: "Oct 20, 2023", color: "bg-gray-400" },
];

const connections = [
  { name: "EcoPack Solutions", type: "MFG", desc: "Specializing in biodegradable packaging for luxury cosmetics." },
  { name: "Jessica Vibe", type: "INF", desc: "Skincare enthusiast with 500k+ followers seeking brand collabs." },
];

export default function DemoPlatformDashboard() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        {/* Hero */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
              Welcome back, <span className="text-primary">Glow Cosmetics</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mt-2">
              Here is your supply chain overview. You have <span className="font-bold text-foreground">3 pending contracts</span> requiring attention.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline"><UserPlus className="h-4 w-4 mr-2" />Find Partners</Button>
            <Button><Plus className="h-4 w-4 mr-2" />Create New RFQ</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Active Projects", value: "12", change: "+20%", icon: Package, iconColor: "text-primary bg-primary/10" },
            { label: "Pending RFQs", value: "5", sub: "2 expiring soon", icon: Clock, iconColor: "text-orange-500 bg-orange-50" },
            { label: "Total Spend", value: "$45k", change: "+12%", icon: DollarSign, iconColor: "text-blue-500 bg-blue-50" },
            { label: "New Messages", value: "8", sub: "From 3 partners", icon: MessageSquare, iconColor: "text-purple-500 bg-purple-50" },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <stat.icon className={`h-5 w-5 p-1 rounded-md ${stat.iconColor}`} />
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <p className="text-3xl font-bold">{stat.value}</p>
                  {stat.change && (
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center">
                      <TrendingUp className="h-3 w-3 mr-0.5" />{stat.change}
                    </span>
                  )}
                </div>
                {stat.sub && <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Active Projects Table */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Active Projects</CardTitle>
                <Button variant="link" className="text-primary">View All</Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                      <tr>
                        <th className="px-6 py-4 font-semibold">Project Name</th>
                        <th className="px-6 py-4 font-semibold">Partner</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                        <th className="px-6 py-4 font-semibold">Timeline</th>
                        <th className="px-6 py-4 font-semibold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {projects.map((p) => (
                        <tr key={p.sku} className="hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-4 font-medium">
                            {p.name}
                            <div className="text-xs text-muted-foreground font-normal">SKU: {p.sku}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-muted" />
                              <span className="font-medium">{p.partner}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant="secondary" className={p.statusColor}>{p.status}</Badge>
                          </td>
                          <td className="px-6 py-4">
                            <div className="w-24">
                              <div className="flex justify-between text-xs mb-1"><span>{p.progress}%</span></div>
                              <Progress value={p.progress} className="h-1.5" />
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Connections */}
            <div>
              <h3 className="text-lg font-bold mb-4">Recommended Connections</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {connections.map((c) => (
                  <Card key={c.name} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-muted shrink-0" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-bold text-sm">{c.name}</h4>
                          <Badge variant="outline" className="text-[10px]">{c.type}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{c.desc}</p>
                        <Button variant="link" className="p-0 h-auto mt-2 text-xs text-primary">Connect +</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <Card className="h-fit">
            <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
            <CardContent>
              <div className="relative pl-2 border-l border-border space-y-8">
                {activities.map((a, i) => (
                  <div key={i} className="relative pl-6">
                    <div className={`absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full ${a.color} ring-2 ring-background`} />
                    <p className="text-sm">{a.text}</p>
                    <span className="text-xs text-muted-foreground">{a.time}</span>
                    {a.action && (
                      <Button variant="secondary" size="sm" className="mt-1 text-xs h-6">{a.action}</Button>
                    )}
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-6 text-muted-foreground">View Full History</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
