import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Download, Shield } from "lucide-react";

const checklist = [
  { title: "Formula v2.4 (Approved)", desc: "Dermatologically tested. 0.5% pearl concentrate stabilized." },
  { title: "Sustainable Packaging", desc: "Recycled glass bottle with gold foil embossing confirmed." },
  { title: "Regulatory Compliance", desc: "EU/FDA labels approved. Ingredient list verified." },
  { title: "Marketing Assets", desc: "Campaign video and 45 high-res lifestyle shots ready for sync." },
];

export default function DemoFinalApproval() {
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <Badge className="mb-4 bg-yellow-100 text-yellow-700 border-yellow-200">
            <Shield className="h-3 w-3 mr-1" /> Ready for Market
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Final Approval: Glow Serum x Elena V.</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
            This document serves as the final authorization for the manufacturing and commercial release. Please review all specifications before signing.
          </p>
        </div>

        {/* Product + Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <Card className="h-full flex items-center justify-center p-12 bg-gradient-to-tr from-muted/50 to-transparent">
              <div className="text-center">
                <span className="text-8xl">🧴</span>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-6">Project Code</p>
                <p className="text-xs font-medium">GS-EV-2024-FINAL</p>
              </div>
            </Card>
          </div>
          <div className="lg:col-span-5">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">Final Specs Checklist</h3>
                <div className="space-y-6">
                  {checklist.map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-8">
                  <Download className="h-4 w-4 mr-2" /> Download Tech Dossier
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Forecast */}
        <Card className="bg-foreground text-background">
          <CardContent className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-md">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-500 mb-2">Performance Forecast</h3>
              <p className="text-2xl font-bold">Estimated Year 1 Revenue: $2.4M - $3.1M</p>
              <p className="text-sm text-muted-foreground mt-2">Based on 94% positive sentiment across Elena's preview audience (850k+ reach).</p>
            </div>
            <div className="flex gap-12">
              <div><p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Pre-Orders</p><p className="text-3xl font-bold">12.5k</p><p className="text-[10px] text-green-400 font-bold mt-1">+18% vs Target</p></div>
              <div><p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Sentiment</p><p className="text-3xl font-bold">94%</p><p className="text-[10px] text-yellow-500 font-bold mt-1">High Intent</p></div>
            </div>
          </CardContent>
        </Card>

        {/* Signatures */}
        <Card className="border-yellow-200 shadow-xl">
          <CardContent className="p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-12">
              {[
                { role: "Authorization: Brand Director", name: "Sarah Jenkins", title: "Head of Product Development" },
                { role: "Authorization: Creative Lead (Influencer)", name: "Elena Valerius", title: "Lead Creative Collaborator" },
              ].map((s) => (
                <div key={s.role} className="flex flex-col">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-12">{s.role}</p>
                  <div className="border-b pb-4 flex items-end justify-between">
                    <span className="text-sm text-muted-foreground italic">Signature required</span>
                    <Button variant="link" className="text-[10px] font-bold uppercase tracking-widest text-primary p-0">Click to sign</Button>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted" />
                    <div><p className="text-xs font-bold">{s.name}</p><p className="text-[10px] text-muted-foreground">{s.title}</p></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-white px-12 rounded-full shadow-lg text-xs font-bold uppercase tracking-[0.2em]">
                Sign and Authorize Launch
              </Button>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Digital signature is legally binding under the commercial collaboration agreement.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
