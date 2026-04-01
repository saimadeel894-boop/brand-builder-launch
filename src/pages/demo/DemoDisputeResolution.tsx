import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";

export default function DemoDisputeResolution() {
  const cases = [
    { id: "#4029", title: "Delayed Shipment - Organic Serum", parties: "GlowBrand vs. EcoLabs Mfg.", status: "In Review", statusColor: "bg-orange-100 text-orange-800", time: "2h ago", active: true },
    { id: "#3901", title: "Escrow Release - Campaign #22", parties: "Influencer_Jade vs. PureBeauty", status: "Action Required", statusColor: "bg-red-100 text-red-800", time: "1d ago" },
    { id: "#3880", title: "Defective Packaging Batch", parties: "LuxeSkin vs. PackCo Intl.", status: "Resolved", statusColor: "bg-green-100 text-green-800", time: "3d ago" },
  ];

  const steps = [
    { label: "Dispute Filed", done: true },
    { label: "Evidence Review", active: true },
    { label: "Arbitration", pending: true },
    { label: "Resolution", pending: true },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Dispute Resolution Center</h1>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">+ New Dispute</button>
        </div>

        <div className="flex gap-6 min-h-[700px]">
          {/* Case List */}
          <div className="w-96 bg-card border border-border rounded-xl flex flex-col shrink-0">
            <div className="p-4 border-b border-border space-y-3">
              <input className="w-full bg-muted border border-border text-sm rounded-lg pl-4 pr-4 py-2" placeholder="Search disputes..." />
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-muted text-xs font-medium rounded-full">All</button>
                <button className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20">Action Required</button>
                <button className="px-3 py-1.5 bg-muted text-muted-foreground text-xs font-medium rounded-full">Closed</button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {cases.map(c => (
                <div key={c.id} className={`p-4 border-b border-border cursor-pointer hover:bg-accent transition-colors ${c.active ? 'bg-primary/5 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}`}>
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-xs font-semibold ${c.active ? 'text-primary' : 'text-muted-foreground'}`}>CASE {c.id}</span>
                    <span className="text-xs text-muted-foreground">{c.time}</span>
                  </div>
                  <h3 className="text-sm font-bold mb-1">{c.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{c.parties}</p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${c.statusColor}`}>{c.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="flex-1 space-y-6 overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold">Case #4029: Delayed Shipment</h2>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full uppercase tracking-wide">In Review</span>
                </div>
                <p className="text-muted-foreground">Started on Oct 24, 2023 • Escrow ID: <span className="font-mono">#ES-99283</span></p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-1">Total Dispute Value</p>
                <p className="text-2xl font-bold">$15,000.00 <span className="text-sm font-normal text-muted-foreground">USD</span></p>
              </div>
            </div>

            {/* Stepper */}
            <Card className="p-6">
              <div className="relative flex items-center justify-between w-full">
                <div className="absolute left-0 top-4 w-full h-1 bg-muted" />
                <div className="absolute left-0 top-4 w-1/3 h-1 bg-green-500" />
                {steps.map((s, i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      s.done ? 'bg-green-500 text-white' :
                      s.active ? 'bg-primary text-white shadow-lg ring-4 ring-background' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {s.done ? '✓' : s.active ? '👁' : '○'}
                    </div>
                    <span className={`text-xs font-medium ${s.active ? 'font-bold text-primary' : s.pending ? 'text-muted-foreground' : ''}`}>{s.label}</span>
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-8 space-y-6">
                {/* Details */}
                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">ℹ️ Dispute Details</h3>
                  <div className="bg-muted p-4 rounded-lg mb-4">
                    <p className="text-sm leading-relaxed">
                      <span className="font-semibold">Claim by GlowBrand:</span> The manufacturer (EcoLabs) failed to deliver 500 units of organic serum by Oct 20th. This delay caused a missed seasonal launch window. Requesting full refund or expedited shipment with 20% discount penalty.
                    </p>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div className="flex-1">
                      <span className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">Contract Type</span>
                      <span className="font-medium">Manufacturing Agreement (White Label)</span>
                    </div>
                    <div className="flex-1">
                      <span className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">Due Date</span>
                      <span className="font-medium">Oct 20, 2023</span>
                    </div>
                    <div className="flex-1">
                      <span className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">Escrow Status</span>
                      <span className="font-medium text-orange-600">Locked</span>
                    </div>
                  </div>
                </Card>

                {/* Evidence */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">📁 Evidence Vault</h3>
                    <button className="text-sm text-primary font-medium flex items-center gap-1">⬆️ Upload New</button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["Original_Contract.pdf", "Email_Thread_Oct.pdf", "Warehouse_Photo.jpg"].map(f => (
                      <div key={f} className="rounded-lg border border-border bg-muted p-3 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="h-24 bg-card rounded mb-2 flex items-center justify-center text-3xl">📄</div>
                        <p className="text-xs font-medium truncate">{f}</p>
                        <p className="text-[10px] text-muted-foreground">Added by GlowBrand</p>
                      </div>
                    ))}
                    <div className="rounded-lg border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center p-3 text-muted-foreground hover:text-primary hover:border-primary transition-all cursor-pointer">
                      <span className="text-3xl mb-1">☁️</span>
                      <span className="text-xs font-medium">Drop files here</span>
                    </div>
                  </div>
                </Card>

                {/* Settlement */}
                <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200 p-6 flex items-start gap-4">
                  <div className="bg-emerald-100 p-2 rounded-full text-emerald-600 shrink-0">🤝</div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-emerald-900">Settlement Proposed by EcoLabs</h4>
                    <p className="text-sm text-emerald-800 mt-1">"We admit a 1-week delay due to raw material shortages. We propose a 10% discount ($1,500) refund and immediate shipment."</p>
                    <div className="flex gap-3 mt-4">
                      <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Accept Offer</button>
                      <button className="bg-white border border-border px-4 py-2 rounded-lg text-sm font-medium">Decline</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="col-span-12 lg:col-span-4">
                <Card className="flex flex-col h-[500px]">
                  <div className="p-4 border-b border-border">
                    <h3 className="text-sm font-bold flex items-center gap-2">💬 Secure Messages</h3>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold shrink-0">GB</div>
                      <div>
                        <p className="text-xs font-bold">GlowBrand <span className="font-normal text-muted-foreground">10:30 AM</span></p>
                        <div className="bg-card border border-border p-3 rounded-lg rounded-tl-none text-xs mt-1 max-w-[240px]">
                          We have uploaded the initial contract clearly stating the Oct 20th deadline.
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 flex-row-reverse">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xs font-bold shrink-0">🛡</div>
                      <div className="flex flex-col items-end">
                        <p className="text-xs"><span className="font-normal text-muted-foreground">10:45 AM</span> <span className="font-bold text-purple-600">Moderator</span></p>
                        <div className="bg-purple-50 border border-purple-200 p-3 rounded-lg rounded-tr-none text-xs mt-1 max-w-[240px]">
                          Thank you. I've reviewed the documents. EcoLabs, please provide your shipping manifest.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-t border-border">
                    <div className="flex gap-2">
                      <input className="flex-1 bg-muted border border-border rounded-lg px-3 py-2 text-sm" placeholder="Type a message..." />
                      <button className="bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm">Send</button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
