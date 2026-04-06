import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Heart, CheckCircle } from "lucide-react";

const influencers = [
  { name: "Elena Glass", location: "Los Angeles, CA", niche: "SKINCARE", score: 94, successRate: "88%", audience: "1.2M+", tags: ["ANTI-AGING", "CLEAN BEAUTY", "MINIMALIST"] },
  { name: "Jordan Rivers", location: "London, UK", niche: "GLAM MAKEUP", score: 82, successRate: "74%", audience: "850K", tags: ["AVANT-GARDE", "TUTORIALS", "LUXURY BRANDS"] },
  { name: "Mila Kunis", location: "Paris, FR", niche: "HAIR SPECIALIST", score: 78, successRate: "92%", audience: "420K", tags: ["ORGANIC CARE", "ECO-FRIENDLY", "SCALP HEALTH"] },
];

const channels = ["TikTok", "Instagram", "YouTube"];
const niches = ["Skincare", "Makeup", "Hair", "Fragrance"];

export default function DemoInfluencerDiscovery() {
  return (
    <DashboardLayout>
      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <div className="hidden lg:flex flex-col w-72 shrink-0 space-y-6">
          <div>
            <h1 className="text-lg font-bold">Filters</h1>
            <p className="text-muted-foreground text-sm mt-1">Refine your creator search</p>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">Social Channels</label>
            <div className="flex gap-2 flex-wrap">
              {channels.map((c, i) => (
                <Badge key={c} variant={i === 0 ? "default" : "secondary"} className="cursor-pointer">{c}</Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">Performance Index</label>
            <div className="h-1 bg-muted rounded-full relative"><div className="absolute left-[40%] right-0 h-full bg-primary rounded-full" /></div>
            <p className="text-xs font-bold text-primary mt-2">40 - 100</p>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">Niche Specialty</label>
            <div className="flex flex-wrap gap-2">
              {niches.map((n, i) => (
                <Badge key={n} variant={i === 0 ? "default" : "secondary"} className="cursor-pointer">{n}</Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">Audience Location</label>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">North America</span>
            </div>
          </div>

          <Button className="w-full">Apply 24 Filters</Button>
          <Button variant="ghost" className="w-full text-xs uppercase">Reset Filters</Button>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="text-sm font-bold text-yellow-600 uppercase tracking-[0.2em] mb-1">Recommended for you</p>
              <h2 className="text-3xl font-extrabold tracking-tight">Top Beauty Creators</h2>
            </div>
            <Button variant="outline">Sort by: Relevance</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {influencers.map((inf) => (
              <Card key={inf.name} className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-muted">
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-xs font-bold tracking-tight">{inf.niche}</span>
                  </div>
                  <div className="absolute top-4 right-4 h-10 w-10 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Heart className="h-5 w-5" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{inf.name}</h3>
                      <div className="flex items-center gap-1 text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3" />
                        <span className="text-xs font-medium">{inf.location}</span>
                      </div>
                    </div>
                    <div className="relative h-14 w-14">
                      <svg className="h-14 w-14"><circle className="text-muted stroke-current" cx="28" cy="28" fill="transparent" r="24" strokeWidth="4" /><circle className="text-primary stroke-current" cx="28" cy="28" fill="transparent" r="24" strokeLinecap="round" strokeWidth="4" style={{ strokeDasharray: 150.8, strokeDashoffset: 150.8 - (150.8 * inf.score) / 100, transform: "rotate(-90deg)", transformOrigin: "50% 50%" }} /></svg>
                      <div className="absolute inset-0 flex items-center justify-center"><span className="text-xs font-extrabold">{inf.score}</span></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y">
                    <div><p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Success Rate</p><p className="text-lg font-bold">{inf.successRate}</p></div>
                    <div><p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Audience</p><p className="text-lg font-bold">{inf.audience}</p></div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {inf.tags.map((t) => <Badge key={t} variant="outline" className="text-[10px] font-bold">{t}</Badge>)}
                  </div>
                  <Button variant="outline" className="w-full hover:bg-primary hover:text-primary-foreground transition-all">View Full Profile</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
