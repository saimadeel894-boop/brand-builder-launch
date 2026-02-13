import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Search, Plus, Paperclip, Upload, Handshake, FileText, Eye, Gavel, Flag, CheckCircle, Send,
} from "lucide-react";

const cases = [
  { id: "#4029", title: "Delayed Shipment - Organic Serum", parties: "GlowBrand vs. EcoLabs Mfg.", status: "In Review", statusColor: "bg-orange-100 text-orange-800", time: "2h ago", active: true, attachments: 3 },
  { id: "#3901", title: "Escrow Release - Campaign #22", parties: "Influencer_Jade vs. PureBeauty", status: "Action Required", statusColor: "bg-red-100 text-red-800", time: "1d ago", active: false },
  { id: "#3880", title: "Defective Packaging Batch", parties: "LuxeSkin vs. PackCo Intl.", status: "Resolved", statusColor: "bg-green-100 text-green-800", time: "3d ago", active: false },
];

const progressSteps = [
  { label: "Dispute Filed", icon: CheckCircle, done: true },
  { label: "Evidence Review", icon: Eye, active: true },
  { label: "Arbitration", icon: Gavel, pending: true },
  { label: "Resolution", icon: Flag, pending: true },
];

const messages = [
  { sender: "GB", name: "GlowBrand", text: "We have attached the shipping logs confirming the delay. The agreed date was clearly Oct 20th.", time: "10:45 AM", align: "left" },
  { sender: "EL", name: "EcoLabs", text: "We acknowledge the delay. Raw material shortage from our supplier caused a 1-week setback. We're willing to offer a 10% discount.", time: "11:02 AM", align: "right" },
];

export default function DisputeResolution() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold">Dispute Resolution Center</h1>
          <Button className="gap-2"><Plus className="h-4 w-4" /> New Dispute</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Case List */}
          <div className="lg:col-span-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input className="pl-10" placeholder="Search disputes..." />
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="cursor-pointer">All</Badge>
              <Badge className="cursor-pointer bg-primary/10 text-primary border border-primary/20">Action Required</Badge>
              <Badge variant="secondary" className="cursor-pointer">Closed</Badge>
            </div>
            <div className="space-y-0 border rounded-lg overflow-hidden">
              {cases.map((c, i) => (
                <div key={i} className={`p-4 border-b last:border-b-0 cursor-pointer transition-colors ${c.active ? "bg-primary/5 border-l-4 border-l-primary" : "border-l-4 border-l-transparent hover:bg-secondary/50"}`}>
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-xs font-semibold ${c.active ? "text-primary" : "text-muted-foreground"}`}>CASE {c.id}</span>
                    <span className="text-xs text-muted-foreground">{c.time}</span>
                  </div>
                  <h3 className="text-sm font-bold mb-1">{c.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2 truncate">{c.parties}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`text-xs ${c.statusColor}`}>{c.status}</Badge>
                    {c.attachments && <span className="text-xs text-muted-foreground flex items-center gap-1"><Paperclip className="h-3 w-3" /> {c.attachments}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-8 space-y-6">
            {/* Case Header */}
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-bold">Case #4029: Delayed Shipment</h2>
                  <Badge className="bg-orange-100 text-orange-700 text-xs">In Review</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Started on Oct 24, 2023 • Escrow ID: <span className="font-mono">#ES-99283</span></p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-1">Total Dispute Value</p>
                <p className="text-2xl font-bold">$15,000.00 <span className="text-sm font-normal text-muted-foreground">USD</span></p>
              </div>
            </div>

            {/* Progress */}
            <Card>
              <CardContent className="p-6">
                <div className="relative flex items-center justify-between w-full">
                  <div className="absolute top-4 left-0 w-full h-1 bg-secondary rounded-full z-0" />
                  <div className="absolute top-4 left-0 w-1/3 h-1 bg-green-500 rounded-full z-0" />
                  {progressSteps.map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ring-4 ring-background ${
                          step.done ? "bg-green-500 text-white" :
                          step.active ? "bg-primary text-primary-foreground shadow-lg" :
                          "bg-secondary text-muted-foreground"
                        }`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className={`text-xs font-medium ${step.active ? "text-primary font-bold" : step.done ? "" : "text-muted-foreground"}`}>{step.label}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Details + Evidence */}
              <div className="lg:col-span-8 space-y-4">
                <Card>
                  <CardHeader><CardTitle className="text-lg font-bold flex items-center gap-2"><FileText className="h-5 w-5 text-muted-foreground" /> Dispute Details</CardTitle></CardHeader>
                  <CardContent>
                    <div className="bg-secondary/50 p-4 rounded-lg mb-4">
                      <p className="text-sm leading-relaxed"><span className="font-semibold">Claim by GlowBrand:</span> The manufacturer (EcoLabs) failed to deliver the 500 units of organic serum by the agreed date of Oct 20th. This delay has caused us to miss our seasonal launch window. We are requesting a full refund or an expedited shipment with a 20% discount penalty.</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">Contract Type</span>
                        <span className="font-medium">Manufacturing Agreement</span>
                      </div>
                      <div>
                        <span className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">Due Date</span>
                        <span className="font-medium">Oct 20, 2023</span>
                      </div>
                      <div>
                        <span className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">Escrow Status</span>
                        <span className="font-medium text-orange-600">Locked</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-bold flex items-center gap-2"><FileText className="h-5 w-5 text-muted-foreground" /> Evidence Vault</CardTitle>
                      <Button variant="link" size="sm" className="text-primary gap-1"><Upload className="h-4 w-4" /> Upload New</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {["Original_Contract.pdf", "Email_Thread_Oct.pdf", "Warehouse_Photo.jpg"].map((name, i) => (
                        <div key={i} className="rounded-lg border bg-secondary/30 p-3 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="h-20 bg-background rounded mb-2 flex items-center justify-center"><FileText className="h-8 w-8 text-muted-foreground/50" /></div>
                          <p className="text-xs font-medium truncate">{name}</p>
                          <p className="text-[10px] text-muted-foreground">Added by party</p>
                        </div>
                      ))}
                      <div className="rounded-lg border-2 border-dashed flex flex-col items-center justify-center p-3 text-muted-foreground hover:text-primary hover:border-primary transition-all cursor-pointer">
                        <Upload className="h-6 w-6 mb-1" />
                        <span className="text-xs font-medium">Drop files here</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Settlement */}
                <Card className="border-green-200 bg-green-50/50">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="bg-green-100 p-2 rounded-full text-green-600 shrink-0"><Handshake className="h-5 w-5" /></div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-green-900">Settlement Proposed by EcoLabs</h4>
                      <p className="text-sm text-green-800 mt-1">"We admit a 1-week delay due to raw material shortages. We propose a 10% discount ($1,500) refund and immediate shipment."</p>
                      <div className="flex gap-3 mt-4">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">Accept Offer</Button>
                        <Button variant="outline" size="sm">Decline</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right: Messages */}
              <div className="lg:col-span-4">
                <Card className="flex flex-col h-[500px]">
                  <CardHeader className="pb-3 border-b">
                    <CardTitle className="text-sm font-bold">Secure Messages</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary/20">
                    <div className="flex justify-center">
                      <Badge variant="secondary" className="text-[10px]">Today</Badge>
                    </div>
                    {messages.map((m, i) => (
                      <div key={i} className={`flex gap-3 ${m.align === "right" ? "flex-row-reverse" : ""}`}>
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">{m.sender}</div>
                        <div className={`max-w-[80%] rounded-lg p-3 ${m.align === "right" ? "bg-primary text-primary-foreground" : "bg-background border"}`}>
                          <p className="text-xs font-bold mb-1">{m.name}</p>
                          <p className="text-xs">{m.text}</p>
                          <p className={`text-[10px] mt-1 ${m.align === "right" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{m.time}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <div className="p-3 border-t flex gap-2">
                    <Textarea placeholder="Type a message..." className="min-h-[40px] h-10 resize-none text-xs" />
                    <Button size="icon" className="shrink-0"><Send className="h-4 w-4" /></Button>
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
