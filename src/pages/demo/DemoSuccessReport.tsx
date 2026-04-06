import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Plus, Zap, TrendingUp, Eye, Star, MessageCircle } from "lucide-react";

const reviews = [
  { name: "Sarah J.", role: "Verified Buyer", text: "\"The texture of the Glow Serum is unlike anything I've tried. Elena really knew what we needed! ✨\"", stars: 5 },
  { name: "Alex M.", role: "Makeup Artist", text: "\"Professional grade results. I'm using this on all my clients now. Please restock soon!\"" },
];

export default function DemoSuccessReport() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-foreground text-background p-8 md:p-12">
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/20 border border-yellow-500/30">
                <Star className="h-3 w-3 text-yellow-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-500">Campaign Milestone Reached</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">Glow Serum <br /><span className="text-yellow-500">x Elena V.</span></h2>
              <p className="text-lg text-muted-foreground italic max-w-md">"A paradigm shift in skincare. This collaboration redefined industry benchmarks."</p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <div className="h-10 w-10 rounded-full bg-muted border-2 border-foreground" />
                  <div className="h-10 w-10 rounded-full bg-primary border-2 border-foreground flex items-center justify-center text-xs font-bold text-primary-foreground">BC</div>
                </div>
                <div className="text-sm">
                  <p className="font-bold">Elena Valerius & BeautyCollab</p>
                  <p className="text-muted-foreground text-xs">Launched Oct 15, 2024</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="h-64 w-64 rounded-3xl bg-muted/20 border border-muted/30 flex items-center justify-center">
                  <span className="text-6xl">🧴</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-background text-foreground p-4 rounded-xl shadow-xl">
                  <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Status</p>
                  <p className="text-lg font-bold flex items-center gap-2">SOLD OUT <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" /></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Victory Snapshot */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-6">Victory Snapshot</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Zap, label: "Time to Sold Out", value: "4 Hours", color: "text-pink-600 bg-pink-50" },
              { icon: TrendingUp, label: "Global TikTok Beauty", value: "#5 Trending", color: "text-primary bg-primary/10" },
              { icon: Eye, label: "Unique Site Visits", value: "1.5M", color: "text-yellow-600 bg-yellow-50", badge: "+400% vs Target" },
            ].map((s) => (
              <Card key={s.label} className="hover:border-yellow-500 transition-colors">
                <CardContent className="p-8">
                  <s.icon className={`h-10 w-10 p-2 rounded-2xl mb-6 ${s.color}`} />
                  <p className="text-3xl font-bold mb-2">{s.value}</p>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{s.label}</p>
                  {s.badge && (
                    <span className="mt-4 inline-block text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{s.badge}</span>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Revenue + Community */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <h3 className="text-2xl font-bold mb-4">Community Love</h3>
            <p className="text-sm text-muted-foreground mb-6">Real-time sentiment from social platforms</p>
            <div className="space-y-4">
              {reviews.map((r, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-8 w-8 rounded-full bg-muted" />
                      <div>
                        <p className="text-xs font-bold">{r.name}</p>
                        <p className="text-[10px] text-muted-foreground">{r.role}</p>
                      </div>
                    </div>
                    <p className="text-sm italic">{r.text}</p>
                    {r.stars && (
                      <div className="mt-4 flex text-yellow-500">
                        {Array(r.stars).fill(0).map((_, j) => <Star key={j} className="h-3 w-3 fill-current" />)}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              <Card className="bg-pink-50 border-pink-200">
                <CardContent className="p-6">
                  <p className="text-sm italic text-pink-700 font-medium">"Finally a collaboration that feels authentic. The packaging is premium and the formula is science-backed."</p>
                  <p className="text-[10px] text-pink-500 mt-3 font-bold">GLOSS MAGAZINE REVIEW</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <Card className="bg-gradient-to-br from-foreground to-primary text-background">
              <CardContent className="p-8">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-500/80 mb-6">Total Revenue Generated</h3>
                <p className="text-5xl font-bold mb-8">$2,842,500</p>
                <div className="h-32 flex items-end gap-2 mb-6">
                  {[20, 35, 30, 55, 80, 100, 60].map((h, i) => (
                    <div key={i} className={`flex-1 rounded-t-lg ${i === 5 ? 'bg-yellow-500' : 'bg-background/20'}`} style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className="flex justify-between items-center py-4 border-t border-background/10">
                  <div className="text-center"><p className="text-[10px] uppercase font-bold text-muted-foreground">Units Sold</p><p className="text-lg font-bold">45,000</p></div>
                  <div className="text-center"><p className="text-[10px] uppercase font-bold text-muted-foreground">Avg Order Value</p><p className="text-lg font-bold">$63.16</p></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">Investment Returns</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-green-50 rounded-xl flex items-center justify-center"><TrendingUp className="h-5 w-5 text-green-600" /></div>
                      <div><p className="text-sm font-bold">Influencer ROAS</p><p className="text-xs text-muted-foreground">Return on Ad Spend</p></div>
                    </div>
                    <p className="text-xl font-bold">12.4x</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center"><MessageCircle className="h-5 w-5 text-blue-600" /></div>
                      <div><p className="text-sm font-bold">Customer Acquisition</p><p className="text-xs text-muted-foreground">New to Brand Rate</p></div>
                    </div>
                    <p className="text-xl font-bold">68%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-muted rounded-xl">
          <div className="flex items-center gap-4">
            <span className="h-3 w-3 bg-yellow-500 rounded-full animate-pulse" />
            <p className="text-sm font-bold italic">Campaign finalized and audited. Ready for archival.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline"><Download className="h-4 w-4 mr-2" />Download Full Report</Button>
            <Button><Plus className="h-4 w-4 mr-2" />Start New Collaboration</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
