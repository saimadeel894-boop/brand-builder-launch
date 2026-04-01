import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";

export default function DemoChemistLab() {
  const batches = [
    { id: "#GS-9921", name: "Glow Serum v3", collab: "Sarah J.", status: "Stability Stage", statusColor: "bg-primary/10 text-primary", progress: 68 },
    { id: "#LR-4402", name: "Luminous Retinol 1.5%", collab: "Marcus Chen", status: "Action Required", statusColor: "bg-yellow-100 text-yellow-700", progress: 32 },
  ];

  const samples = [
    { id: "#GS-9921", name: "Glow Serum v3", influencer: "Sarah J.", status: "Pending Approval", statusColor: "text-yellow-600", tech: "A. Thorne", time: "2h ago" },
    { id: "#LR-4402", name: "Luminous Retinol", influencer: "Marcus Chen", status: "Sample Sent", statusColor: "text-primary", tech: "J. Kim", time: "5h ago" },
    { id: "#HC-2019", name: "Hydra-Cloud Mist", influencer: "Ariel Beauty", status: "V1 Approved", statusColor: "text-green-600", tech: "A. Thorne", time: "1d ago" },
    { id: "#BM-1182", name: "Barrier Mousse", influencer: "Skincare Pro", status: "Revision Requested", statusColor: "text-muted-foreground", tech: "S. Lopez", time: "2d ago" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Chemist Lab Dashboard</h2>
        </div>

        {/* Batch Queue */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold tracking-tight">Current Batch Queue</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded border border-border bg-card text-xs font-bold text-muted-foreground">Active Only</button>
              <button className="px-3 py-1.5 rounded border border-border bg-card text-xs font-bold text-muted-foreground">Sort by Priority</button>
            </div>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {batches.map(b => (
              <Card key={b.id} className="overflow-hidden flex flex-col md:flex-row h-auto md:h-52">
                <div className="w-full md:w-40 bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center text-4xl shrink-0">🧪</div>
                <CardContent className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Batch ID: {b.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${b.statusColor}`}>{b.status}</span>
                    </div>
                    <h4 className="text-lg font-bold">{b.name}</h4>
                    <p className="text-sm text-muted-foreground mb-4">Collaboration: <span className="font-medium text-foreground">{b.collab}</span></p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-muted-foreground">Workflow Progress</span>
                      <span className="text-primary">{b.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: `${b.progress}%` }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sample Feedback Log */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold tracking-tight">Sample Feedback Log</h3>
            <button className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">Export CSV 📥</button>
          </div>
          <Card className="overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Batch ID</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Product Name</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Influencer</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Feedback Status</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Technician</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Last Sync</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {samples.map(s => (
                  <tr key={s.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
                    <td className="px-6 py-4 text-sm font-bold text-primary">{s.id}</td>
                    <td className="px-6 py-4 text-sm font-semibold">{s.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{s.influencer}</td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-2 font-bold text-[11px] uppercase ${s.statusColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.statusColor.replace('text-', 'bg-')}`} /> {s.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{s.tech}</td>
                    <td className="px-6 py-4 text-xs font-medium text-muted-foreground">{s.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-4 bg-muted/30 border-t border-border flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Showing 4 of 28 active samples</span>
            </div>
          </Card>
        </section>

        {/* Inventory Alerts */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Raw Ingredients Alert</h3>
              <button className="text-xs font-bold text-primary hover:underline">Manage All</button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded bg-muted border-l-4 border-yellow-500">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-card border border-border flex items-center justify-center text-yellow-500">💧</div>
                  <div>
                    <p className="text-sm font-bold">Hyaluronic Acid (Low MW)</p>
                    <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-tight">Current Stock: 1.2kg | Threshold: 2.0kg</p>
                  </div>
                </div>
                <button className="px-3 py-1.5 rounded bg-yellow-100 text-yellow-700 text-xs font-bold">Reorder</button>
              </div>
              <div className="flex items-center justify-between p-3 rounded bg-muted border-l-4 border-green-500">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-card border border-border flex items-center justify-center text-green-500">💊</div>
                  <div>
                    <p className="text-sm font-bold">Niacinamide USP</p>
                    <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-tight">Current Stock: 15.0kg | Optimal</p>
                  </div>
                </div>
                <span className="text-green-500">✅</span>
              </div>
            </div>
          </Card>
          <Card className="bg-primary p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-primary-foreground text-lg font-bold leading-tight mb-2">Stability Chamber<br />Status</h3>
              <p className="text-primary-foreground/70 text-sm">Zone B currently at 40°C / 75% RH</p>
            </div>
            <div className="relative z-10 mt-8">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-primary-foreground tracking-tighter">14</span>
                <span className="text-primary-foreground/60 text-xs font-bold uppercase">Samples Live</span>
              </div>
              <button className="w-full mt-4 bg-white/20 hover:bg-white/30 text-primary-foreground text-xs font-bold py-2 rounded border border-white/30">View Live Feed</button>
            </div>
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
}
