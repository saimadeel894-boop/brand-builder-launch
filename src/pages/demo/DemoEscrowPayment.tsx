import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";

export default function DemoEscrowPayment() {
  const steps = [
    { label: "Deposit", done: true },
    { label: "Lab Samples", active: true },
    { label: "Formulation", pending: true },
    { label: "Production", pending: true },
    { label: "Delivery", pending: true },
  ];

  const milestones = [
    { title: "Milestone 1: Initial Deposit", desc: "Project Kickoff & Raw Material Sourcing", amount: "$2,500.00", status: "released", date: "Paid on Oct 12" },
    { title: "Milestone 2: Lab Sample Approval", desc: "Manufacturer has marked this milestone as complete. Please verify the receipt of lab samples and approve quality to release funds.", amount: "$5,000.00", status: "active", date: "Due: Nov 15, 2023" },
    { title: "Milestone 3: Bulk Production", desc: "Manufacturing of 5,000 units", amount: "$5,000.00", status: "pending", date: "Est. Dec 01" },
    { title: "Milestone 4: Final Delivery", desc: "Shipping and final acceptance", amount: "$2,500.00", status: "pending", date: "Est. Dec 15" },
  ];

  const transactions = [
    { desc: "Funds Deposited to Escrow", date: "Oct 01, 2023 • 09:30 AM", txId: "#ESC-992-883", amount: "+$15,000" },
    { desc: "Milestone 1 Released", date: "Oct 12, 2023 • 02:15 PM", txId: "#REL-441-209", amount: "-$2,500" },
    { desc: "Platform Fee Deducted", date: "Oct 12, 2023 • 02:15 PM", txId: "#FEE-003-112", amount: "-$62.50" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight mb-2">Escrow Management</h1>
            <div className="flex items-center gap-3 text-muted-foreground text-sm">
              <span>🏭 Manufacturer: <span className="text-foreground font-medium">PureLabs Mfg.</span></span>
              <span>•</span>
              <span>📄 Contract #4829</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium hover:bg-accent">⚖️ Dispute Center</button>
            <button className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium hover:bg-accent">📥 Download Invoice</button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="relative overflow-hidden group">
            <div className="absolute right-0 top-0 h-full w-1 bg-muted group-hover:bg-primary transition-colors" />
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-muted-foreground font-medium text-sm">Total Contract Value</p>
                <span className="p-2 bg-muted rounded-lg">💳</span>
              </div>
              <p className="text-3xl font-bold tracking-tight">$15,000.00</p>
              <p className="text-xs text-muted-foreground mt-1">Fixed Price Contract</p>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-primary/30 relative overflow-hidden">
            <div className="absolute right-0 top-0 h-full w-1 bg-primary" />
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <p className="text-primary font-medium text-sm">Locked in Escrow</p>
                  <span className="text-primary">🔒</span>
                </div>
                <span className="p-2 bg-white/50 rounded-lg text-primary">🛡️</span>
              </div>
              <p className="text-3xl font-bold tracking-tight">$5,000.00</p>
              <p className="text-xs text-primary/80 mt-1">Pending Release: Phase 2</p>
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden group">
            <div className="absolute right-0 top-0 h-full w-1 bg-green-500" />
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-muted-foreground font-medium text-sm">Released Funds</p>
                <span className="p-2 bg-green-50 rounded-lg text-green-600">✅</span>
              </div>
              <p className="text-3xl font-bold tracking-tight">$2,500.00</p>
              <p className="text-xs text-muted-foreground mt-1">Deposit Paid</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Progress & Milestones */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Stepper */}
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-6">Development Progress</h3>
              <div className="relative">
                <div className="absolute top-4 left-0 w-full h-1 bg-muted rounded-full" />
                <div className="absolute top-4 left-0 w-[45%] h-1 bg-primary rounded-full transition-all" />
                <div className="relative flex justify-between w-full">
                  {steps.map((s, i) => (
                    <div key={i} className={`flex flex-col items-center gap-2 ${s.pending ? 'opacity-50' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ring-4 ring-background ${
                        s.done ? 'bg-primary text-primary-foreground' :
                        s.active ? 'bg-background border-2 border-primary text-primary shadow-lg shadow-primary/20' :
                        'bg-muted border-2 border-muted-foreground/30 text-muted-foreground'
                      }`}>
                        {s.done ? '✓' : s.active ? '⟳' : '○'}
                      </div>
                      <span className={`text-xs font-medium ${s.active ? 'font-bold text-primary' : ''}`}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Milestones */}
            <div className="space-y-4">
              {milestones.map((m, i) => (
                <Card key={i} className={`overflow-hidden ${
                  m.status === 'active' ? 'border-2 border-primary shadow-lg shadow-primary/5 ring-4 ring-primary/5' :
                  m.status === 'pending' ? 'opacity-60 hover:opacity-100 transition-all' : ''
                }`}>
                  {m.status === 'active' && (
                    <div className="bg-primary/5 p-4 border-b border-primary/20 flex items-center justify-between">
                      <span className="text-primary font-bold flex items-center gap-2">🔴 CURRENT PHASE</span>
                      <span className="bg-card text-sm font-bold px-2 py-1 rounded border border-border">{m.date}</span>
                    </div>
                  )}
                  <CardContent className={m.status === 'active' ? 'p-6' : 'p-4'}>
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        m.status === 'released' ? 'bg-green-100 text-green-600' :
                        m.status === 'active' ? 'bg-primary text-primary-foreground shadow-md' :
                        'bg-muted text-muted-foreground border border-border'
                      }`}>
                        {m.status === 'released' ? '✓' : m.status === 'active' ? '🔬' : '🔒'}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h4 className={`font-bold ${m.status === 'active' ? 'text-lg' : ''}`}>{m.title}</h4>
                          {m.status === 'released' && <span className="text-sm font-medium text-green-600">Funds Released 🔓</span>}
                          {m.status === 'pending' && <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Upcoming</span>}
                        </div>
                        <p className="text-sm text-muted-foreground">{m.desc}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{m.amount}</p>
                        {m.status !== 'active' && <p className="text-xs text-muted-foreground">{m.date}</p>}
                      </div>
                    </div>
                    {m.status === 'active' && (
                      <div className="mt-6 bg-muted rounded-lg p-5 border border-border">
                        <label className="flex items-start gap-3 cursor-pointer mb-4">
                          <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary" />
                          <div className="text-sm">
                            <span className="font-bold block">I confirm receipt and quality approval</span>
                            I have received the lab samples (Batch #B-902) and they meet the requirements specified in the contract.
                          </div>
                        </label>
                        <div className="flex gap-3">
                          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-lg font-bold shadow-md flex items-center gap-2">
                            💳 Approve & Release Funds
                          </button>
                          <button className="bg-card border border-border px-4 py-2.5 rounded-lg font-medium flex items-center gap-2 hover:bg-accent">
                            ⚠️ Report Issue
                          </button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right: Ledger */}
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <div className="p-4 border-b border-border flex justify-between items-center">
                <h3 className="font-bold">Transaction History</h3>
                <button className="text-primary text-sm font-medium hover:underline">View All</button>
              </div>
              <div className="divide-y divide-border">
                {transactions.map((tx, i) => (
                  <div key={i} className="p-4 flex items-start gap-3">
                    <div className="mt-1 w-2 h-2 rounded-full bg-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{tx.desc}</p>
                      <p className="text-xs text-muted-foreground">{tx.date}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">TxID: {tx.txId}</p>
                    </div>
                    <span className="text-sm font-bold">{tx.amount}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-4">Contract Documents</h3>
              <div className="space-y-3">
                {["Manufacturing_Agreement.pdf", "Lab_Samples_Report.pdf", "Payment_Schedule.xlsx"].map(doc => (
                  <div key={doc} className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-accent cursor-pointer transition-colors">
                    <span className="text-red-500">📄</span>
                    <span className="text-sm font-medium flex-1">{doc}</span>
                    <span className="text-muted-foreground text-xs">↓</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
