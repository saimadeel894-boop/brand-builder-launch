import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  FileText, Download, Share2, Pen, MessageSquare, Plus, FolderOpen, Handshake, Archive,
} from "lucide-react";

const parties = [
  { name: "Jane Doe (You)", role: "Brand Rep", status: "Signed", statusColor: "text-green-600 bg-green-50" },
  { name: "Sarah Jenkins", role: "Influencer", status: "Pending", statusColor: "text-yellow-600 bg-yellow-50" },
  { name: "Robert Chen", role: "Manufacturer", status: "Signed", statusColor: "text-green-600 bg-green-50" },
];

const activity = [
  { user: "Jane Doe", action: "Updated compensation terms", time: "2 hours ago" },
  { user: "Robert Chen", action: "Signed the agreement", time: "5 hours ago" },
  { user: "System", action: "Contract moved to Negotiation phase", time: "1 day ago" },
  { user: "Sarah Jenkins", action: "Requested changes to Section 3", time: "2 days ago" },
];

const workspace = [
  { label: "Drafts", icon: FolderOpen, count: 4, active: false },
  { label: "In Negotiation", icon: Handshake, count: 2, active: true },
  { label: "Pending Signature", icon: Pen, count: 1, active: false },
  { label: "Archived", icon: Archive, count: null, active: false },
];

export default function ContractGeneration() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl md:text-2xl font-bold">Influencer Marketing Agreement - Summer Campaign</h1>
              <Badge variant="outline" className="text-primary border-primary/20 bg-primary/10 text-xs">v3.2 Draft</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Reference ID: #CTR-2024-892 • Last auto-saved at 14:30</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" /> Export PDF</Button>
            <Button variant="outline" size="sm" className="gap-2"><Share2 className="h-4 w-4" /> Share</Button>
          </div>
        </div>

        {/* Progress Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center text-xs font-medium text-muted-foreground mb-2">
              <span>Drafting</span><span>Review</span><span className="text-primary font-bold">Negotiation</span><span>Pending Signature</span><span>Signed</span>
            </div>
            <Progress value={55} className="h-2" />
          </CardContent>
        </Card>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Workspace Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            <Button className="w-full gap-2"><Plus className="h-4 w-4" /> New Contract</Button>
            <Card>
              <CardContent className="p-3">
                <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">My Workspace</p>
                <div className="space-y-1">
                  {workspace.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${item.active ? "bg-primary/10 text-primary" : "hover:bg-secondary"}`}>
                        <Icon className="h-5 w-5" />
                        <span className="text-sm font-medium flex-1">{item.label}</span>
                        {item.count && (
                          <Badge variant={item.active ? "default" : "secondary"} className="text-xs">{item.count}</Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="border-t my-3" />
                <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Templates</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-secondary">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Influencer Agreement</span>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-secondary">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Supply Contract</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Document Preview */}
          <Card className="lg:col-span-5">
            <CardContent className="p-8 bg-secondary/30 min-h-[600px]">
              <div className="bg-background shadow-sm rounded p-8 md:p-12 space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="h-10 w-10 bg-foreground text-background flex items-center justify-center font-bold text-lg rounded">BC</div>
                  <div className="text-right text-xs text-muted-foreground font-mono">DOC-REF: 8829-XJ<br />PAGE 1 OF 4</div>
                </div>
                <h2 className="text-2xl font-bold text-center uppercase tracking-wide">Influencer Marketing Agreement</h2>
                <p className="text-center text-muted-foreground italic text-sm">This Agreement is made on this 24th day of October, 2023</p>
                <div className="bg-primary/5 p-4 rounded border-l-4 border-primary/40 space-y-2">
                  <p className="font-bold text-sm text-primary uppercase tracking-wider">1. Parties Involved</p>
                  <p className="text-sm"><strong>BETWEEN:</strong> <span className="bg-yellow-100 px-1 rounded">Glow Cosmetics Ltd.</span></p>
                  <p className="text-sm"><strong>AND:</strong> <span className="bg-yellow-100 px-1 rounded">Sarah Jenkins</span></p>
                  <p className="text-sm"><strong>AND:</strong> <span className="bg-yellow-100 px-1 rounded">Pure Labs Manufacturing</span></p>
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-sm uppercase tracking-wider">2. Scope of Services</p>
                  <ul className="list-disc pl-6 text-sm space-y-1 text-muted-foreground">
                    <li>Three (3) Instagram Reels</li>
                    <li>One (1) Dedicated YouTube video</li>
                    <li>Five (5) Instagram Stories</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-sm uppercase tracking-wider">3. Compensation</p>
                  <p className="text-sm">Total fee: <span className="line-through text-red-500">$45,000 USD</span> <span className="text-green-700 font-semibold bg-green-100 px-1 rounded">$50,000 USD</span></p>
                </div>
                <div className="grid grid-cols-2 gap-8 mt-8 pt-6 border-t">
                  <div>
                    <p className="text-xs uppercase text-muted-foreground mb-6">Signed on behalf of Brand</p>
                    <div className="h-10 border-b italic text-muted-foreground/50 text-lg">Pending...</div>
                    <p className="text-sm font-bold mt-2">Glow Cosmetics Ltd.</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-muted-foreground mb-6">Signed by Influencer</p>
                    <div className="h-10 border-b" />
                    <p className="text-sm font-bold mt-2">Sarah Jenkins</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Panel */}
          <div className="lg:col-span-4 space-y-6">
            <Card>
              <CardContent className="p-6 space-y-3">
                <h3 className="text-sm font-semibold mb-2">Actions</h3>
                <Button className="w-full gap-2"><Pen className="h-4 w-4" /> Sign Contract</Button>
                <Button variant="outline" className="w-full gap-2"><MessageSquare className="h-4 w-4" /> Request Changes</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold">Parties Involved</CardTitle>
                  <Button variant="link" size="sm" className="text-xs text-primary p-0 h-auto">Manage</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {parties.map((p, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-sm font-bold">{p.name.charAt(0)}</div>
                      <div>
                        <p className="text-sm font-medium">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.role}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={`text-xs ${p.statusColor}`}>{p.status}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-sm font-semibold">Activity Log</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {activity.map((a, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-2 w-2 mt-2 rounded-full bg-primary/40 shrink-0" />
                    <div>
                      <p className="text-sm"><span className="font-medium">{a.user}</span> {a.action}</p>
                      <p className="text-xs text-muted-foreground">{a.time}</p>
                    </div>
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
