import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, Clock, Download, ExternalLink, Shield } from "lucide-react";

const sections = [
  {
    title: "Ingredient Safety & Toxicology",
    icon: "🔬",
    status: "100% Passed",
    statusColor: "bg-green-100 text-green-700",
    items: [
      { title: "INCI Nomenclature Validation", desc: "Verified against latest EU & FDA nomenclature", status: "pass", meta: "Modified: 2 days ago", action: "View Log" },
      { title: "CIR Toxicological Assessment", desc: "Summary of Cosmetic Ingredient Review findings", status: "pass", meta: "Verified by AI", action: "Lab Report" },
    ],
  },
  {
    title: "Labeling & Claims Requirements",
    icon: "🏷️",
    status: "Action Required",
    statusColor: "bg-yellow-100 text-yellow-700",
    items: [
      { title: "Net Quantity Statement (EU)", desc: "FontSize requirement not met for 50ml packaging", status: "warning", meta: "High Priority", action: "Fix Specs" },
      { title: "Hypoallergenic Claim Substantiation", desc: "Clinical data uploaded and verified", status: "pass", meta: "Valid until 2026", action: "View Data" },
    ],
  },
  {
    title: "Analytical & Microbiological Testing",
    icon: "🧬",
    status: "Pending Samples",
    statusColor: "bg-gray-100 text-gray-700",
    items: [
      { title: "Heavy Metal Screening (Pb, As, Hg, Cd)", desc: "Sample #HM-204 in queue at Intertek Lab", status: "pending", meta: "ETA: Oct 24", action: "Track Sample" },
      { title: "Microbial Limits (USP 61/62)", desc: "Zero growth detected after 14-day incubation", status: "pass", meta: "Passed: 1 week ago", action: "Download CoA" },
    ],
  },
];

const markets = [
  { name: "North America", status: "Approved", color: "bg-green-500", pct: 100 },
  { name: "EU Region", status: "Review", color: "bg-yellow-500", pct: 75 },
  { name: "ASEAN", status: "Restricted", color: "bg-red-500", pct: 33 },
];

const StatusIcon = ({ status }: { status: string }) => {
  if (status === "pass") return <CheckCircle className="h-5 w-5 text-green-500" />;
  if (status === "warning") return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
  return <Clock className="h-5 w-5 text-muted-foreground" />;
};

export default function DemoComplianceTracker() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Banner */}
        <Card className="bg-primary text-primary-foreground overflow-hidden">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                Glow Serum v3
                <Badge variant="outline" className="text-primary-foreground border-primary-foreground/20 bg-primary-foreground/10 text-sm">SKU: GS-V3-2024</Badge>
              </h2>
              <p className="text-primary-foreground/70 text-sm mt-1">Lead Influencer: Sarah J. | Formula Stage: Stability V2</p>
            </div>
            <div className="text-right flex items-center gap-8">
              <div>
                <p className="text-[10px] uppercase font-bold text-primary-foreground/60 mb-1 tracking-widest">Global Readiness</p>
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-bold">75%</span>
                  <div><p className="text-xs font-bold text-green-300">Compliant</p><p className="text-[10px] text-primary-foreground/50">3 Missing Docs</p></div>
                </div>
              </div>
              <Button variant="secondary">Request Final Review</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Checklist */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Compliance Checklist</h3>
                <p className="text-sm text-muted-foreground mt-1">Status of required technical documentation and testing</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Filter By Market</Button>
                <Button size="sm">Upload New Document</Button>
              </div>
            </div>

            {sections.map((section) => (
              <Card key={section.title}>
                <div className="px-6 py-4 bg-muted/50 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{section.icon}</span>
                    <h4 className="font-bold text-primary">{section.title}</h4>
                  </div>
                  <Badge className={section.statusColor}>{section.status}</Badge>
                </div>
                <div className="divide-y">
                  {section.items.map((item) => (
                    <div key={item.title} className="px-6 py-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <StatusIcon status={item.status} />
                        <div>
                          <p className="text-sm font-semibold">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-xs font-medium text-muted-foreground italic">{item.meta}</span>
                        <Button variant="link" size="sm" className="text-xs">{item.action} <ExternalLink className="h-3 w-3 ml-1" /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-sm">Market Approval Map</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {markets.map((m) => (
                  <div key={m.name}>
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span>{m.name}</span>
                      <span className={m.color === "bg-green-500" ? "text-green-600" : m.color === "bg-yellow-500" ? "text-yellow-600" : "text-red-600"}>{m.status}</span>
                    </div>
                    <Progress value={m.pct} className="h-1" />
                  </div>
                ))}
              </CardContent>
            </Card>
            <Button variant="outline" className="w-full"><Download className="h-4 w-4 mr-2" />Export Dossier</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
