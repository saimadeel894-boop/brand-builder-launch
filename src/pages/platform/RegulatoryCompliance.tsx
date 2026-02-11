import { DashboardLayout } from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  AlertTriangle,
  Clock,
  Shield,
  FileText,
  Download,
  ExternalLink,
  FlaskConical,
  Tag,
  Microscope,
} from "lucide-react";

const complianceChecklist = [
  {
    category: "Ingredient Safety & Toxicology",
    icon: FlaskConical,
    status: "passed",
    statusLabel: "100% Passed",
    items: [
      {
        name: "INCI Nomenclature Validation",
        description: "Verified against latest EU & FDA nomenclature",
        status: "passed",
        meta: "Modified: 2 days ago",
        action: "View Log",
      },
      {
        name: "CIR Toxicological Assessment",
        description: "Summary of Cosmetic Ingredient Review findings",
        status: "passed",
        meta: "Verified by AI",
        action: "Lab Report",
      },
    ],
  },
  {
    category: "Labeling & Claims Requirements",
    icon: Tag,
    status: "warning",
    statusLabel: "Action Required",
    items: [
      {
        name: "Net Quantity Statement (EU)",
        description: "FontSize requirement not met for 50ml packaging",
        status: "warning",
        meta: "High Priority",
        action: "Fix Specs",
      },
      {
        name: "Hypoallergenic Claim Substantiation",
        description: "Clinical data uploaded and verified",
        status: "passed",
        meta: "Valid until 2026",
        action: "View Data",
      },
    ],
  },
  {
    category: "Analytical & Microbiological Testing",
    icon: Microscope,
    status: "pending",
    statusLabel: "Pending Samples",
    items: [
      {
        name: "Heavy Metal Screening (Pb, As, Hg, Cd)",
        description: "Sample #HM-204 in queue at Intertek Lab",
        status: "pending",
        meta: "ETA: Oct 24",
        action: "Track Sample",
      },
      {
        name: "Microbial Limits (USP 61/62)",
        description: "Zero growth detected after 14-day incubation",
        status: "passed",
        meta: "Passed: 1 week ago",
        action: "Download CoA",
      },
    ],
  },
];

const markets = [
  { name: "North America", status: "Approved", progress: 100, color: "bg-green-500" },
  { name: "EU Region", status: "Review", progress: 75, color: "bg-yellow-500" },
  { name: "ASEAN", status: "Restricted", progress: 33, color: "bg-red-500" },
];

const standards = [
  { name: "FDA (USA)", color: "bg-green-500" },
  { name: "EC 1223/2009 (EU)", color: "bg-yellow-500" },
  { name: "ASEAN Cosmetic", color: "bg-red-500" },
];

function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case "passed":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    case "pending":
      return <Clock className="h-5 w-5 text-muted-foreground" />;
    default:
      return null;
  }
}

export default function RegulatoryCompliance() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Hero Banner */}
        <div className="bg-primary text-primary-foreground rounded-xl p-6 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                Glow Serum v3
                <span className="text-sm font-normal bg-primary-foreground/10 px-2 py-0.5 rounded border border-primary-foreground/20">
                  SKU: GS-V3-2024
                </span>
              </h2>
              <p className="text-primary-foreground/70 text-sm mt-1">
                Lead Influencer: Sarah J. | Formula Stage: Stability V2
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-primary-foreground/60 mb-1 tracking-widest">
                  Global Readiness
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-bold">75%</span>
                  <div className="text-left">
                    <p className="text-xs font-bold text-green-300">Compliant</p>
                    <p className="text-[10px] text-primary-foreground/50">3 Missing Docs</p>
                  </div>
                </div>
              </div>
              <Button variant="secondary" className="font-bold shadow-xl">
                Request Final Review
              </Button>
            </div>
          </div>
          <Shield className="absolute right-4 bottom-0 h-40 w-40 text-primary-foreground/5" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Compliance Checklist</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Status of required technical documentation and testing
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Filter By Market</Button>
                <Button size="sm">Upload New Document</Button>
              </div>
            </div>

            {complianceChecklist.map((section) => {
              const Icon = section.icon;
              return (
                <Card key={section.category}>
                  <CardHeader className="bg-secondary/50 border-b flex flex-row items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-primary" />
                      <CardTitle className="text-base">{section.category}</CardTitle>
                    </div>
                    <Badge
                      variant={
                        section.status === "passed" ? "default" :
                        section.status === "warning" ? "destructive" : "secondary"
                      }
                      className={
                        section.status === "passed" ? "bg-green-100 text-green-700 border-green-200" :
                        section.status === "warning" ? "bg-yellow-100 text-yellow-700 border-yellow-200" :
                        "bg-muted text-muted-foreground"
                      }
                    >
                      {section.statusLabel}
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-0 divide-y">
                    {section.items.map((item) => (
                      <div key={item.name} className="px-6 py-4 flex items-center justify-between hover:bg-secondary/30 transition-colors">
                        <div className="flex items-center gap-4">
                          <StatusIcon status={item.status} />
                          <div>
                            <p className="text-sm font-semibold">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <span className={`text-xs font-medium ${item.status === "warning" ? "font-bold text-yellow-600" : "text-muted-foreground italic"}`}>
                            {item.meta}
                          </span>
                          <Button variant="link" size="sm" className="text-xs gap-1">
                            {item.action} <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Global Standards</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {standards.map((s) => (
                  <div key={s.name} className="flex items-center justify-between text-sm">
                    <span>{s.name}</span>
                    <span className={`w-2 h-2 rounded-full ${s.color}`} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Market Approval Map</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {markets.map((m) => (
                  <div key={m.name}>
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span>{m.name}</span>
                      <span className={m.color === "bg-green-500" ? "text-green-600" : m.color === "bg-yellow-500" ? "text-yellow-600" : "text-red-600"}>
                        {m.status}
                      </span>
                    </div>
                    <div className="h-1 bg-secondary rounded-full">
                      <div className={`h-full ${m.color} rounded-full`} style={{ width: `${m.progress}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Button variant="outline" className="w-full gap-2">
              <Download className="h-4 w-4" />
              Export Dossier
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
