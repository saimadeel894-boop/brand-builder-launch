import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";

export default function DemoMarketIntelligence() {
  const trending = [
    { rank: "01", name: "Bakuchiol Serum", sub: "Retinol Alternative", growth: "+42%" },
    { rank: "02", name: "Polyglutamic Acid", sub: "Super-Hydrator", growth: "+28%" },
    { rank: "03", name: "Rice Ferment", sub: "Barrier Support", growth: "+15%" },
    { rank: "04", name: "Chebula", sub: "Antioxidant", growth: "+34%" },
  ];

  const viral = [
    { name: "Cloud Skin", sub: "Matte-Glow Fusion", mentions: "8.4M", icon: "💆" },
    { name: "Slugging 2.0", sub: "Nightcare Evolution", mentions: "12.2M", icon: "🧖" },
    { name: "Barrier Repair Sticks", sub: "Portable Care", mentions: "4.1M", icon: "💧" },
  ];

  const platforms = [
    { name: "TikTok Velocity", level: "Extreme", bars: 4, color: "bg-primary" },
    { name: "Instagram Reach", level: "High", bars: 3, color: "bg-amber-500" },
    { name: "Pinterest Intent", level: "Moderate", bars: 2, color: "bg-muted-foreground/40" },
  ];

  const competitors = [
    { category: "Biotech Skincare", rivals: 6, spend: "$1.2M", share: "72%" },
    { category: "Microbiome Balancers", rivals: 2, spend: "$840K", share: "45%" },
    { category: "Adaptogen Topicals", rivals: 9, spend: "$2.1M", share: "88%" },
    { category: "Waterless Fragrance", rivals: 1, spend: "$150K", share: "12%" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Market Intelligence & Global Trends</h2>
            <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest">Global consumer demand & predictive beauty forecasting</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-6 py-2.5 border rounded-xl text-xs font-bold uppercase tracking-widest">📅 Oct - Nov 2023</button>
            <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-bold uppercase tracking-widest">📈 Strategy Hub</button>
          </div>
        </div>

        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Trending Ingredients</h3>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">View All</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {trending.map((t) => (
                  <div key={t.rank} className="p-4 bg-muted rounded-xl">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-bold text-muted-foreground">{t.rank}</span>
                      <span className="text-emerald-500 text-[10px] font-bold">{t.growth}</span>
                    </div>
                    <p className="text-lg font-bold">{t.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">{t.sub}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Viral Product Categories</h3>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Live Updates</span>
              </div>
              <div className="space-y-4">
                {viral.map((v) => (
                  <div key={v.name} className="flex items-center justify-between p-4 border rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/20 flex items-center justify-center rounded-full text-xl">{v.icon}</div>
                      <div>
                        <p className="text-sm font-bold uppercase">{v.name}</p>
                        <p className="text-[10px] text-muted-foreground uppercase">{v.sub}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{v.mentions}</p>
                      <p className="text-[10px] text-emerald-500 font-bold uppercase">Mentions</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Heatmap */}
        <Card>
          <CardContent className="p-10">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h3 className="text-2xl font-bold">Geographic Demand Heatmap</h3>
                <p className="text-sm text-muted-foreground uppercase tracking-widest mt-2">Active Trend: <span className="text-primary font-bold italic">Clean Beauty Aesthetics</span></p>
              </div>
              <div className="flex gap-4">
                {[{ label: "Developing", opacity: "bg-primary/20" }, { label: "Growing", opacity: "bg-primary/60" }, { label: "Saturation", opacity: "bg-primary" }].map((l) => (
                  <div key={l.label} className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${l.opacity}`} />
                    <span className="text-[10px] font-bold uppercase text-muted-foreground">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative w-full aspect-[21/9] bg-muted rounded-xl overflow-hidden flex items-center justify-center">
              <div className="absolute left-[24%] top-[45%] bg-background p-3 rounded-lg shadow border">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">North America</p>
                <p className="text-sm font-bold">Cloud Skin</p>
                <p className="text-[10px] text-emerald-500 font-bold">+184% Growth</p>
              </div>
              <div className="absolute left-[70%] top-[35%] bg-background p-3 rounded-lg shadow border">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">East Asia</p>
                <p className="text-sm font-bold">Glass Skin</p>
                <p className="text-[10px] text-primary font-bold">Market Peak</p>
              </div>
              <p className="text-muted-foreground/30 text-lg font-bold">🗺 Interactive Map</p>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-lg font-bold mb-8">Platform Pulse</h3>
              <div className="space-y-10">
                {platforms.map((p) => (
                  <div key={p.name}>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-bold">{p.name}</span>
                      <span className={`text-sm font-bold ${p.bars >= 4 ? "text-emerald-500" : p.bars >= 3 ? "text-primary" : "text-muted-foreground"}`}>{p.level}</span>
                    </div>
                    <div className="flex gap-1 h-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className={`flex-1 rounded-full ${i <= p.bars ? p.color : "bg-muted"}`} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold">Competitive Landscape</h3>
                <button className="text-[10px] font-bold uppercase text-primary border-b border-primary">Advanced Filtering</button>
              </div>
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Emerging Category</th>
                    <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Key Rivals</th>
                    <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Ad Spend</th>
                    <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Share of Voice</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {competitors.map((c) => (
                    <tr key={c.category} className="hover:bg-muted/50 transition-colors">
                      <td className="py-5 text-sm font-bold">{c.category}</td>
                      <td className="py-5"><span className="px-2 py-1 bg-primary/20 rounded-full text-[10px] font-bold text-primary">+{c.rivals}</span></td>
                      <td className="py-5 text-sm font-bold">{c.spend}</td>
                      <td className="py-5">
                        <div className="w-24 bg-muted h-1.5 rounded-full"><div className="bg-primary h-full rounded-full" style={{ width: c.share }} /></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
