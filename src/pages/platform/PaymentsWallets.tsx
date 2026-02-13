import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { TrendingUp, Clock, CreditCard, MoreVertical, CalendarDays } from "lucide-react";

const transactions = [
  { date: "Oct 24, 2023", desc: "Batch #402 Production", entity: "LuxeLabs Mfg.", initial: "L", color: "bg-indigo-100 text-indigo-600", status: "Paid", statusColor: "bg-green-50 text-green-700", amount: "-$4,500.00", amountColor: "" },
  { date: "Oct 22, 2023", desc: "Consultation Fee", entity: "Ashley Rose (Influencer)", initial: "A", color: "bg-pink-100 text-pink-600", status: "Pending", statusColor: "bg-yellow-50 text-yellow-800", amount: "-$250.00", amountColor: "" },
  { date: "Oct 20, 2023", desc: "Royalty Payout Q3", entity: "Global Beauty Co.", initial: "G", color: "bg-blue-100 text-blue-600", status: "Received", statusColor: "bg-green-50 text-green-700", amount: "+$12,000.00", amountColor: "text-green-600 font-bold" },
  { date: "Oct 18, 2023", desc: "Material Supply #B09", entity: "Organic Base Ltd.", initial: "O", color: "bg-orange-100 text-orange-600", status: "Failed", statusColor: "bg-red-50 text-red-700", amount: "-$890.00", amountColor: "" },
  { date: "Oct 15, 2023", desc: "Platform Subscription", entity: "BeautyChain", initial: "B", color: "bg-primary/20 text-primary", status: "Paid", statusColor: "bg-green-50 text-green-700", amount: "-$99.00", amountColor: "" },
];

const gateways = [
  { name: "Stripe", initial: "S", bg: "bg-[#635BFF]", connected: true, detail: "acct_...45x" },
  { name: "PayPal", initial: "P", bg: "bg-[#003087]", connected: false, detail: "Connect your PayPal Business account to accept global payments securely." },
];

export default function PaymentsWallets() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Payments & Wallets</h1>
            <p className="mt-1 text-sm text-muted-foreground">Manage your payment gateways, view balance, and track transaction history.</p>
          </div>
          <Button className="gap-2"><CreditCard className="h-4 w-4" /> Initiate Payment</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="md:col-span-2">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Wallet Balance</p>
                  <h3 className="mt-2 text-3xl font-bold tracking-tight">$12,450.00</h3>
                </div>
                <div className="p-2 bg-green-50 rounded-lg"><TrendingUp className="h-5 w-5 text-green-600" /></div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">+5.2%</Badge>
                <span className="text-xs text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Payouts</p>
                  <h3 className="mt-2 text-3xl font-bold tracking-tight">$1,200.00</h3>
                </div>
                <div className="p-2 bg-amber-50 rounded-lg"><Clock className="h-5 w-5 text-amber-600" /></div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">3 transactions pending</p>
            </CardContent>
          </Card>
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-6 relative overflow-hidden">
              <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-primary-foreground/10 blur-2xl" />
              <div className="relative z-10">
                <p className="text-sm font-medium text-primary-foreground/80">Next Scheduled Payout</p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight">Nov 01, 2023</h3>
                <div className="mt-4">
                  <Button variant="secondary" size="sm" className="text-xs bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-0">
                    <CalendarDays className="h-3 w-3 mr-1" /> View Schedule
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gateways + Transactions */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-1 space-y-4">
            <h3 className="text-lg font-bold">Linked Gateways</h3>
            {gateways.map((gw, i) => (
              <Card key={i} className={!gw.connected ? "opacity-80 hover:opacity-100 transition-opacity" : ""}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-lg ${gw.bg} flex items-center justify-center text-white font-bold text-lg`}>{gw.initial}</div>
                      <div>
                        <h4 className="font-bold">{gw.name}</h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className={`h-1.5 w-1.5 rounded-full ${gw.connected ? "bg-green-500" : "bg-muted-foreground/40"}`} />
                          <span className={`text-xs font-medium ${gw.connected ? "text-green-600" : "text-muted-foreground"}`}>{gw.connected ? "Connected" : "Not Connected"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {gw.connected ? (
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Account ID</span>
                        <span className="font-mono">{gw.detail}</span>
                      </div>
                      <Button variant="outline" className="w-full text-sm">Manage Settings</Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-xs text-muted-foreground leading-relaxed">{gw.detail}</p>
                      <Button className="w-full text-sm">Connect Account</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-bold">Transaction History</CardTitle>
              <div className="flex gap-1 rounded-lg bg-secondary p-1">
                <Button variant="secondary" size="sm" className="text-xs bg-background shadow-sm">All</Button>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">Incoming</Button>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">Outgoing</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs uppercase tracking-wider">Date</TableHead>
                    <TableHead className="text-xs uppercase tracking-wider">Description</TableHead>
                    <TableHead className="text-xs uppercase tracking-wider">Entity</TableHead>
                    <TableHead className="text-xs uppercase tracking-wider">Status</TableHead>
                    <TableHead className="text-xs uppercase tracking-wider text-right">Amount</TableHead>
                    <TableHead className="text-xs uppercase tracking-wider text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((t, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{t.date}</TableCell>
                      <TableCell className="text-sm font-medium">{t.desc}</TableCell>
                      <TableCell className="text-sm">
                        <div className="flex items-center gap-2">
                          <div className={`h-6 w-6 rounded-full ${t.color} flex items-center justify-center text-xs font-bold`}>{t.initial}</div>
                          {t.entity}
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline" className={`text-xs font-medium ${t.statusColor}`}>{t.status}</Badge></TableCell>
                      <TableCell className={`text-sm font-mono text-right font-medium ${t.amountColor}`}>{t.amount}</TableCell>
                      <TableCell className="text-right"><Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
