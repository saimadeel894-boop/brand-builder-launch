import { DashboardLayout } from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Heart,
  MapPin,
  CheckCircle,
  Star,
  Search,
  SlidersHorizontal,
  RefreshCw,
} from "lucide-react";

const influencers = [
  {
    name: "Elena Glass",
    location: "Los Angeles, CA",
    niche: "SKINCARE",
    score: 94,
    successRate: "88%",
    audience: "1.2M+",
    tags: ["ANTI-AGING", "CLEAN BEAUTY", "MINIMALIST"],
    verified: true,
  },
  {
    name: "Jordan Rivers",
    location: "London, UK",
    niche: "GLAM MAKEUP",
    score: 82,
    successRate: "74%",
    audience: "850K",
    tags: ["AVANT-GARDE", "TUTORIALS", "LUXURY BRANDS"],
    verified: true,
  },
  {
    name: "Mila Kunis",
    location: "Paris, FR",
    niche: "HAIR SPECIALIST",
    score: 78,
    successRate: "92%",
    audience: "420K",
    tags: ["ORGANIC CARE", "ECO-FRIENDLY", "SCALP HEALTH"],
    verified: false,
  },
  {
    name: "Aisha Patel",
    location: "Mumbai, IN",
    niche: "SKINCARE",
    score: 91,
    successRate: "85%",
    audience: "2.1M+",
    tags: ["AYURVEDIC", "NATURAL", "LUXURY"],
    verified: true,
  },
  {
    name: "Liam Chen",
    location: "Singapore",
    niche: "MEN'S GROOMING",
    score: 76,
    successRate: "79%",
    audience: "340K",
    tags: ["GROOMING", "LIFESTYLE", "MINIMALIST"],
    verified: false,
  },
  {
    name: "Sofia Martínez",
    location: "Barcelona, ES",
    niche: "FRAGRANCE",
    score: 88,
    successRate: "90%",
    audience: "680K",
    tags: ["NICHE SCENTS", "EDITORIAL", "LUXURY"],
    verified: true,
  },
];

const channels = ["TikTok", "Instagram", "YouTube"];
const niches = ["Skincare", "Makeup", "Hair", "Fragrance"];

function PerformanceRing({ score }: { score: number }) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circumference * score) / 100;

  return (
    <div className="relative w-14 h-14">
      <svg className="w-14 h-14" viewBox="0 0 56 56">
        <circle className="text-secondary stroke-current" cx="28" cy="28" r={radius} fill="transparent" strokeWidth="4" />
        <circle
          className="text-primary stroke-current"
          cx="28" cy="28" r={radius} fill="transparent" strokeWidth="4"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-extrabold">{score}</span>
      </div>
    </div>
  );
}

export default function InfluencerDiscovery() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-sm font-bold text-yellow-600 uppercase tracking-[0.2em] mb-1">Recommended for you</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Top Beauty Creators</h2>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2"><SlidersHorizontal className="h-4 w-4" /> Sort by: Relevance</Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-72 shrink-0 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Filters</CardTitle>
                <p className="text-sm text-muted-foreground">Refine your creator search</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-3">Social Channels</label>
                  <div className="flex gap-2 flex-wrap">
                    {channels.map((ch, i) => (
                      <Button key={ch} size="sm" variant={i === 0 ? "default" : "secondary"}>{ch}</Button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Performance Index</label>
                    <span className="text-xs font-bold text-primary">40 - 100</span>
                  </div>
                  <div className="relative w-full h-1 bg-secondary rounded-full mt-2">
                    <div className="absolute left-[40%] right-0 h-full bg-primary rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Success Rate (%)</label>
                    <span className="text-xs font-bold text-primary">60% +</span>
                  </div>
                  <div className="relative w-full h-1 bg-secondary rounded-full mt-2">
                    <div className="absolute left-[60%] right-0 h-full bg-primary rounded-full" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-3">Niche Specialty</label>
                  <div className="flex flex-wrap gap-2">
                    {niches.map((n, i) => (
                      <Badge key={n} variant={i === 0 ? "default" : "secondary"} className={i === 0 ? "bg-pink-100 text-pink-800 border-pink-200" : ""}>
                        {n}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full">Apply 24 Filters</Button>
                <Button variant="ghost" className="w-full text-xs uppercase tracking-wide">Reset Filters</Button>
              </CardContent>
            </Card>
          </div>

          {/* Creator Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {influencers.map((inf) => (
                <Card key={inf.name} className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
                        {inf.name.split(" ").map(n => n[0]).join("")}
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
                      {inf.verified ? <CheckCircle className="h-4 w-4 text-primary" /> : <Star className="h-4 w-4 text-primary" />}
                      <span className="text-xs font-bold tracking-tight">{inf.niche}</span>
                    </div>
                    <button className="absolute top-4 right-4 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold">{inf.name}</h3>
                        <div className="flex items-center gap-1 text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3" />
                          <span className="text-xs">{inf.location}</span>
                        </div>
                      </div>
                      <PerformanceRing score={inf.score} />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-y">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Success Rate</p>
                        <p className="text-lg font-bold">{inf.successRate}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Audience</p>
                        <p className="text-lg font-bold">{inf.audience}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {inf.tags.map((t) => (
                        <span key={t} className="px-2.5 py-1 bg-secondary text-[10px] font-bold rounded border">{t}</span>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full hover:bg-primary hover:text-primary-foreground transition-all">
                      View Full Profile
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center gap-4">
              <p className="text-sm text-muted-foreground">Showing 6 of 248 influencers</p>
              <Button variant="outline" className="gap-3">
                <RefreshCw className="h-4 w-4" /> Load More Creators
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
