import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Wallet, Clock, FileText, ChevronLeft, ChevronRight, Plus, Landmark, Download, Filter,
} from "lucide-react";

const transactions = [
  { date: "Oct 24, 2024", name: "Elena Valerius", initials: "EV", project: "Glow Serum", amount: "$12,500.00", status: "Paid" },
  { date: "Nov 02, 2024", name: "Marcus Chen", initials: "MC", project: "Hydra Mist", amount: "$8,200.00", status: "Processing" },
  { date: "Nov 15, 2024", name: "Sasha Rose", initials: "SR", project: "Velvet Lip", amount: "$5,400.00", status: "Scheduled" },
  { date: "Nov 18, 2024", name: "Amara Lee", initials: "AL", project: "Radiance Oil", amount: "$15,000.00", status: "Scheduled" },
  { date: "Oct 12, 2024", name: "Julian Vane", initials: "JV", project: "Glow Serum", amount: "$4,500.00", status: "Paid" },
];

const statusColor: Record<string, string> = {
  Paid: "bg-green-50 text-green-700 border-green-200",
  Processing: "bg-blue-50 text-blue-700 border-blue-200",
  Scheduled: "bg-amber-50 text-amber-700 border-amber-200",
};

const scheduleEvents = [
  { label: "Payout: Amara Lee", detail: "Today, 2:00 PM • $15,000.00", active: true },
  { label: "Bulk Invoice Review", detail: "Nov 20, 10:00 AM • 12 Items", active: false },
];

export default function InvoicingPayments() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Invoicing & Payments</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage payouts, track transaction history, and review tax compliance.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-primary/10"><Wallet className="h-5 w-5 text-primary" /></div>
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 text-xs">+12% vs last month</Badge>
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Total Payouts</p>
              <p className="text-2xl font-bold mt-1">$142,500.00</p>
              <p className="text-xs text-muted-foreground mt-2">Aggregated for FY 2024</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-amber-100"><Clock className="h-5 w-5 text-amber-600" /></div>
                <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 text-xs">4 pending approval</Badge>
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Pending Invoices</p>
              <p className="text-2xl font-bold mt-1">$18,240.50</p>
              <p className="text-xs text-muted-foreground mt-2">Awaiting brand verification</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-secondary"><FileText className="h-5 w-5 text-foreground" /></div>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Compliant</span>
                </div>
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Tax Documents Status</p>
              <p className="text-2xl font-bold mt-1">98% Verified</p>
              <p className="text-xs text-muted-foreground mt-2">2 influencers requiring W-9 updates</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Transaction History Table */}
          <Card className="lg:col-span-8">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-sm font-bold uppercase tracking-widest">Transaction History</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-xs gap-1"><Download className="h-3 w-3" /> Export CSV</Button>
                <Button variant="outline" size="sm" className="text-xs gap-1"><Filter className="h-3 w-3" /> Filter</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs uppercase tracking-wider">Payment Date</TableHead>
                    <TableHead className="text-xs uppercase tracking-wider">Influencer</TableHead>
                    <TableHead className="text-xs uppercase tracking-wider">Project</TableHead>
                    <TableHead className="text-xs uppercase tracking-wider">Amount</TableHead>
                    <TableHead className="text-xs uppercase tracking-wider">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((t, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-sm font-medium">{t.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">{t.initials}</div>
                          <span className="text-sm font-semibold">{t.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{t.project}</TableCell>
                      <TableCell className="text-sm font-bold">{t.amount}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-xs font-semibold uppercase ${statusColor[t.status]}`}>{t.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="px-6 py-4 border-t flex items-center justify-between">
                <p className="text-xs text-muted-foreground uppercase font-semibold tracking-widest">Showing 5 of 24 transactions</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
                  <Button variant="outline" size="icon" className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Actions */}
            <Card className="bg-foreground text-background">
              <CardContent className="p-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="ghost" className="w-full justify-between text-background hover:bg-background/10 border border-background/10 p-4 h-auto">
                    <div className="flex items-center gap-3">
                      <Plus className="h-5 w-5 text-primary" />
                      <span className="text-sm font-bold">Generate New Invoice</span>
                    </div>
                  </Button>
                  <Button variant="ghost" className="w-full justify-between text-background hover:bg-background/10 border border-background/10 p-4 h-auto">
                    <div className="flex items-center gap-3">
                      <Landmark className="h-5 w-5 text-primary" />
                      <span className="text-sm font-bold">Link Bank Account</span>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Payment Schedule */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Payment Schedule</h3>
                  <span className="text-xs font-bold text-primary">NOV 2024</span>
                </div>
                <div className="space-y-4 pt-4 border-t">
                  {scheduleEvents.map((evt, i) => (
                    <div key={i} className={`flex items-start gap-3 ${!evt.active ? "opacity-60" : ""}`}>
                      <div className={`h-2 w-2 mt-1.5 rounded-full ${evt.active ? "bg-primary" : "bg-muted-foreground/30"}`} />
                      <div>
                        <p className="text-xs font-bold">{evt.label}</p>
                        <p className="text-xs text-muted-foreground">{evt.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
