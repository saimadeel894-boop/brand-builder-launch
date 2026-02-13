import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DollarSign, Lock, CheckCircle, Download, Gavel, Factory, FileText, AlertTriangle,
} from "lucide-react";

const milestones = [
  { title: "Milestone 1: Initial Deposit", desc: "Project Kickoff & Raw Material Sourcing", amount: "$2,500.00", dateLabel: "Paid on Oct 12", status: "released" },
  { title: "Milestone 2: Lab Sample Approval", desc: "Verify receipt and approve quality to release funds.", amount: "$5,000.00", dateLabel: "Due: Nov 15, 2023", status: "active" },
  { title: "Milestone 3: Bulk Production", desc: "Manufacturing of 5,000 units", amount: "$5,000.00", dateLabel: "Est. Dec 01", status: "pending" },
  { title: "Milestone 4: Final Delivery", desc: "Shipping and final acceptance", amount: "$2,500.00", dateLabel: "Est. Dec 15", status: "pending" },
];

const ledger = [
  { label: "Deposit Paid", date: "Oct 12", amount: "-$2,500.00", type: "debit" },
  { label: "Escrow Locked (M2)", date: "Oct 25", amount: "-$5,000.00", type: "debit" },
  { label: "Platform Fee", date: "Oct 25", amount: "-$150.00", type: "fee" },
];

const steps = ["Deposit", "Lab Samples", "Formulation", "Production", "Delivery"];

export default function EscrowPayment() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Escrow Management</h1>
            <div className="flex items-center gap-3 text-muted-foreground mt-1">
              <div className="flex items-center gap-2 text-sm">
                <Factory className="h-4 w-4" />
                <span>Manufacturer: <span className="text-foreground font-medium">PureLabs Mfg.</span></span>
              </div>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4" />
                <span>Contract #4829</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2"><Gavel className="h-4 w-4" /> Dispute Center</Button>
            <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Download Invoice</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-muted-foreground">Total Contract Value</p>
                <div className="p-2 bg-secondary rounded-lg"><DollarSign className="h-5 w-5 text-muted-foreground" /></div>
              </div>
              <p className="text-3xl font-bold tracking-tight">$15,000.00</p>
              <p className="text-xs text-muted-foreground mt-1">Fixed Price Contract</p>
            </CardContent>
          </Card>
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-primary">Locked in Escrow</p>
                  <Lock className="h-4 w-4 text-primary" />
                </div>
                <div className="p-2 bg-background/50 rounded-lg"><Lock className="h-5 w-5 text-primary" /></div>
              </div>
              <p className="text-3xl font-bold tracking-tight">$5,000.00</p>
              <p className="text-xs text-primary/80 mt-1">Pending Release: Phase 2</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-muted-foreground">Released Funds</p>
                <div className="p-2 bg-green-50 rounded-lg"><CheckCircle className="h-5 w-5 text-green-600" /></div>
              </div>
              <p className="text-3xl font-bold tracking-tight">$2,500.00</p>
              <p className="text-xs text-muted-foreground mt-1">Deposit Paid</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Stepper */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-6">Development Progress</h3>
            <div className="relative flex items-center justify-between w-full">
              <div className="absolute top-4 left-0 w-full h-1 bg-secondary rounded-full z-0" />
              <div className="absolute top-4 left-0 w-[45%] h-1 bg-primary rounded-full z-0" />
              {steps.map((step, i) => (
                <div key={i} className={`relative z-10 flex flex-col items-center gap-2 ${i > 1 ? "opacity-50" : ""}`}>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-background ${
                    i === 0 ? "bg-primary text-primary-foreground" :
                    i === 1 ? "bg-background border-2 border-primary text-primary shadow-lg" :
                    "bg-secondary text-muted-foreground border-2 border-muted"
                  }`}>
                    {i === 0 ? "✓" : i + 1}
                  </div>
                  <span className={`text-xs font-medium ${i === 1 ? "text-primary font-bold" : ""}`}>{step}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Milestones + Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {milestones.map((m, i) => (
              <Card key={i} className={`${m.status === "active" ? "border-2 border-primary shadow-lg ring-4 ring-primary/5" : ""} ${m.status === "pending" ? "opacity-60 hover:opacity-100 transition-all" : ""}`}>
                {m.status === "active" && (
                  <div className="bg-primary/5 px-4 py-2 border-b border-primary/20 flex items-center justify-between">
                    <span className="text-xs font-bold text-primary uppercase tracking-wide">● Current Phase</span>
                    <Badge variant="outline" className="text-xs">{m.dateLabel}</Badge>
                  </div>
                )}
                <CardContent className={`p-4 ${m.status === "active" ? "p-6" : ""}`}>
                  <div className="flex items-center gap-4">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      m.status === "released" ? "bg-green-100 text-green-600" :
                      m.status === "active" ? "bg-primary text-primary-foreground shadow-md" :
                      "bg-secondary text-muted-foreground"
                    }`}>
                      {m.status === "released" ? <CheckCircle className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold">{m.title}</h4>
                        {m.status !== "active" && <span className="text-xs text-muted-foreground">{m.dateLabel}</span>}
                      </div>
                      <p className="text-sm text-muted-foreground">{m.desc}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{m.amount}</p>
                    </div>
                  </div>
                  {m.status === "active" && (
                    <div className="bg-secondary/50 rounded-lg p-5 border mt-4">
                      <label className="flex items-start gap-3 cursor-pointer mb-4">
                        <Checkbox className="mt-1" />
                        <div className="text-sm">
                          <span className="font-bold block">I confirm receipt and quality approval</span>
                          <span className="text-muted-foreground">I have received the lab samples and they meet the contract requirements. I authorize the release of funds.</span>
                        </div>
                      </label>
                      <div className="flex gap-3">
                        <Button className="gap-2"><DollarSign className="h-4 w-4" /> Approve & Release Funds</Button>
                        <Button variant="outline" className="gap-2"><AlertTriangle className="h-4 w-4" /> Report Issue</Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Ledger */}
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-sm font-bold uppercase tracking-widest">Transaction Ledger</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {ledger.map((l, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="text-sm font-medium">{l.label}</p>
                      <p className="text-xs text-muted-foreground">{l.date}</p>
                    </div>
                    <p className={`text-sm font-mono font-medium ${l.type === "fee" ? "text-muted-foreground" : ""}`}>{l.amount}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-sm font-bold uppercase tracking-widest">Documents</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {["Original Contract.pdf", "Lab Certificate.pdf", "Insurance Doc.pdf"].map((doc, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-secondary/50 transition-colors cursor-pointer">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium flex-1">{doc}</span>
                    <Download className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
