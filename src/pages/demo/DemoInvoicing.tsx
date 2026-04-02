import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";

export default function DemoInvoicing() {
  const transactions = [
    { date: "Oct 24, 2024", name: "Elena Valerius", project: "Glow Serum", amount: "$12,500.00", status: "Paid" },
    { date: "Nov 02, 2024", name: "Marcus Chen", project: "Hydra Mist", amount: "$8,200.00", status: "Processing" },
    { date: "Nov 15, 2024", name: "Sasha Rose", project: "Velvet Lip", amount: "$5,400.00", status: "Scheduled" },
    { date: "Nov 18, 2024", name: "Amara Lee", project: "Radiance Oil", amount: "$15,000.00", status: "Scheduled" },
    { date: "Oct 12, 2024", name: "Julian Vane", project: "Glow Serum", amount: "$4,500.00", status: "Paid" },
  ];

  const statusColor: Record<string, string> = {
    Paid: "bg-emerald-50 text-emerald-700",
    Processing: "bg-blue-50 text-blue-700",
    Scheduled: "bg-amber-50 text-amber-700",
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold">Invoicing & Payments</h2>
          <p className="text-muted-foreground text-sm mt-1">Manage payouts, track transaction history, and review tax compliance.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card><CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl bg-primary/10 p-2 rounded-lg">💰</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+12% vs last month</span>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Total Payouts</p>
            <p className="text-2xl font-bold mt-1">$142,500.00</p>
            <p className="text-[10px] text-muted-foreground mt-2 italic">Aggregated for FY 2024</p>
          </CardContent></Card>
          <Card><CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl bg-amber-500/10 p-2 rounded-lg">⏳</span>
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">4 pending approval</span>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Pending Invoices</p>
            <p className="text-2xl font-bold mt-1">$18,240.50</p>
            <p className="text-[10px] text-muted-foreground mt-2 italic">Awaiting brand verification</p>
          </CardContent></Card>
          <Card><CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl bg-muted p-2 rounded-lg">📄</span>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Compliant</span>
              </div>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Tax Documents Status</p>
            <p className="text-2xl font-bold mt-1">98% Verified</p>
            <p className="text-[10px] text-muted-foreground mt-2 italic">2 influencers requiring W-9 updates</p>
          </CardContent></Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Transaction Table */}
          <div className="lg:col-span-8">
            <Card className="overflow-hidden">
              <div className="px-8 py-6 border-b flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-widest">Transaction History</h3>
                <div className="flex gap-2">
                  <button className="text-xs font-bold text-muted-foreground px-3 py-1.5 border rounded-lg">Export CSV</button>
                  <button className="text-xs font-bold text-muted-foreground px-3 py-1.5 border rounded-lg">🔍 Filter</button>
                </div>
              </div>
              <table className="w-full text-left">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Payment Date</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Influencer</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Project</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Amount</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {transactions.map((t, i) => (
                    <tr key={i} className="hover:bg-muted/50 transition-colors">
                      <td className="px-8 py-4 text-xs font-medium">{t.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">{t.name.split(" ").map(n => n[0]).join("")}</div>
                          <span className="text-xs font-bold">{t.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-muted-foreground">{t.project}</td>
                      <td className="px-6 py-4 text-xs font-bold">{t.amount}</td>
                      <td className="px-6 py-4"><span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${statusColor[t.status]}`}>{t.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-8 py-4 border-t flex items-center justify-between">
                <p className="text-[10px] text-muted-foreground uppercase font-bold">Showing 5 of 24 transactions</p>
                <div className="flex gap-2">
                  <button className="p-1 rounded border">‹</button>
                  <button className="p-1 rounded border">›</button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <Card className="bg-foreground text-background">
              <CardContent className="p-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-6">Quick Actions</h3>
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-4 rounded-xl bg-background/5 border border-background/10 hover:bg-background/10">
                    <span className="text-sm font-bold">➕ Generate New Invoice</span><span className="opacity-50">→</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-4 rounded-xl bg-background/5 border border-background/10 hover:bg-background/10">
                    <span className="text-sm font-bold">🏦 Link Bank Account</span><span className="opacity-50">→</span>
                  </button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Payment Schedule</h3>
                  <span className="text-[10px] font-bold text-primary">NOV 2024</span>
                </div>
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-1.5 bg-amber-500 rounded-full" />
                    <div>
                      <p className="text-xs font-bold">Payout: Amara Lee</p>
                      <p className="text-[10px] text-muted-foreground">Today, 2:00 PM • $15,000.00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 opacity-60">
                    <div className="w-2 h-2 mt-1.5 bg-muted-foreground rounded-full" />
                    <div>
                      <p className="text-xs font-bold">Bulk Invoice Review</p>
                      <p className="text-[10px] text-muted-foreground">Nov 20, 10:00 AM • 12 Items</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
