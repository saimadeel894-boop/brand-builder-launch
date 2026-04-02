import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DemoInfluencerOnboarding() {
  const steps = [
    { name: "Profile Details", sub: "Bio, Photo, Basic Info", done: true },
    { name: "Social Accounts", sub: "Instagram, TikTok Connected", done: true },
    { name: "Audience & Niche", sub: "Demographics & Interests", active: true },
    { name: "Collaboration", sub: "", pending: true },
    { name: "Payout Setup", sub: "", pending: true },
  ];

  const niches = [
    { name: "Skincare", selected: true },
    { name: "Clean Beauty", selected: true },
    { name: "Vegan" }, { name: "Luxury" }, { name: "Haircare" },
    { name: "Makeup Tutorials" }, { name: "Lifestyle" },
  ];

  const locations = [
    { city: "New York, USA", pct: 42 },
    { city: "London, UK", pct: 24 },
  ];

  return (
    <DashboardLayout>
      <div className="flex gap-8 flex-col lg:flex-row">
        {/* Stepper Sidebar */}
        <aside className="w-full lg:w-80 shrink-0">
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-6">
              <div>
                <h1 className="text-xl font-bold">Onboarding</h1>
                <p className="text-muted-foreground text-sm">Complete your setup to start collaborating.</p>
                <div className="mt-2 w-full bg-muted rounded-full h-1.5 overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "60%" }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">3 of 5 steps completed</p>
              </div>
              <div className="space-y-2">
                {steps.map((s) => (
                  <div key={s.name} className={`flex items-center gap-3 px-3 py-3 rounded-xl ${
                    s.active ? "bg-primary/10 border border-primary/20" :
                    s.done ? "opacity-60" : "text-muted-foreground"
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      s.done ? "bg-emerald-500/10 text-emerald-600" :
                      s.active ? "bg-primary text-primary-foreground" :
                      "border border-border"
                    }`}>
                      {s.done ? "✓" : s.active ? "👥" : ""}
                    </div>
                    <div>
                      <p className={`text-sm ${s.active ? "font-bold text-primary" : "font-medium"}`}>{s.name}</p>
                      {s.sub && <p className="text-xs text-muted-foreground">{s.sub}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Main Form */}
        <main className="flex-1 space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Audience & Niche</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">Help brands understand who follows you and what content you create. This increases your match rate by 45%.</p>
          </div>

          <Card>
            <CardContent className="p-8 space-y-8">
              {/* Niches */}
              <div>
                <h2 className="text-xl font-bold mb-2">🏷 Content Niches</h2>
                <p className="text-sm text-muted-foreground mb-6">Select up to 5 categories that best describe your content.</p>
                <div className="flex flex-wrap gap-3">
                  {niches.map((n) => (
                    <Badge key={n.name} className={n.selected ? "bg-primary text-primary-foreground shadow-lg" : "bg-muted text-foreground"}>
                      {n.name} {n.selected && "✕"}
                    </Badge>
                  ))}
                  <Badge variant="outline" className="border-dashed">+ Add Custom</Badge>
                </div>
              </div>

              {/* Demographics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t">
                <div>
                  <h3 className="text-lg font-bold mb-4">📊 Gender Split</h3>
                  <div className="p-5 rounded-2xl bg-muted space-y-4">
                    {[{ label: "Female", pct: 85, color: "bg-pink-400" }, { label: "Male", pct: 12, color: "bg-blue-400" }, { label: "Other", pct: 3, color: "bg-purple-400" }].map((g) => (
                      <div key={g.label}>
                        <div className="flex justify-between text-sm mb-1"><span>{g.label}</span><span className="font-bold">{g.pct}%</span></div>
                        <div className="w-full bg-background h-3 rounded-full"><div className={`${g.color} h-3 rounded-full`} style={{ width: `${g.pct}%` }} /></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4">📊 Age Range</h3>
                  <div className="p-5 rounded-2xl bg-muted flex items-end justify-between gap-2 h-48">
                    {[{ age: "13-17", pct: 10 }, { age: "18-24", pct: 45, highlight: true }, { age: "25-34", pct: 30 }, { age: "35+", pct: 15 }].map((a) => (
                      <div key={a.age} className="flex flex-col items-center gap-1 w-full">
                        <span className={`text-xs font-bold ${a.highlight ? "text-primary" : "text-muted-foreground"}`}>{a.pct}%</span>
                        <div className={`w-full max-w-[40px] rounded-t-lg ${a.highlight ? "bg-primary shadow-lg" : "bg-muted-foreground/20"}`} style={{ height: `${a.pct * 1.5}%` }} />
                        <span className={`text-[10px] ${a.highlight ? "font-bold" : "text-muted-foreground"}`}>{a.age}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Locations */}
              <div className="pt-8 border-t">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">🌍 Top Locations</h2>
                  <button className="text-sm font-bold text-primary">Add Location</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {locations.map((loc) => (
                    <div key={loc.city} className="flex items-center gap-4 p-3 rounded-xl border shadow-sm">
                      <div className="w-12 h-12 rounded-lg bg-muted" />
                      <div className="flex-1">
                        <p className="text-sm font-bold">{loc.city}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden"><div className="bg-primary h-full" style={{ width: `${loc.pct}%` }} /></div>
                          <span className="text-xs text-muted-foreground">{loc.pct}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center gap-4 py-4">
            <button className="px-6 h-12 rounded-xl border font-bold text-sm">⬅ Back</button>
            <button className="px-8 h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg">Continue ➡</button>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}
