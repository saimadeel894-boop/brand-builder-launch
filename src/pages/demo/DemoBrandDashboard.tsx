import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";

export default function DemoBrandDashboard() {
  const creators = [
    { name: "Lena Skincare", engagement: "8.2%", revenue: "$124k" },
    { name: "James Glow", engagement: "6.5%", revenue: "$98k" },
    { name: "Sofia Zen", engagement: "10.1%", revenue: "$85k" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <header className="flex justify-between items-end">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-black text-primary leading-tight tracking-tight mb-2">Hello, Brand Team</h1>
            <p className="text-muted-foreground text-lg">Your creator partnerships generated <span className="text-primary font-bold">14% more engagement</span> than last month.</p>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 h-12 rounded-xl bg-card border border-border font-bold text-sm hover:bg-accent">📥 Export PDF</button>
            <button className="flex items-center gap-2 px-6 h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg">+ New Campaign</button>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-8 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10" />
            <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest mb-4">Total Revenue Collabs</p>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl font-black text-primary tracking-tight">$842,500</span>
              <span className="text-green-600 font-bold text-sm">+12.5%</span>
            </div>
            <div className="w-full h-1 bg-muted rounded-full mt-4"><div className="w-4/5 h-full bg-primary rounded-full" /></div>
          </Card>
          <Card className="p-8">
            <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest mb-4">Active Campaigns</p>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl font-black text-primary tracking-tight">24</span>
              <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs font-black">+2 NEW</span>
            </div>
          </Card>
          <Card className="bg-primary p-8 relative overflow-hidden shadow-2xl">
            <p className="text-primary-foreground/60 text-sm font-bold uppercase tracking-widest mb-4">Avg. Influencer ROI</p>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl font-black text-primary-foreground tracking-tight">8.4x</span>
              <span className="text-pink-300 font-bold text-sm">+0.4x</span>
            </div>
            <p className="text-primary-foreground/40 text-xs mt-4">Industry benchmark: 4.2x</p>
          </Card>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 p-8">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-2xl font-black text-primary tracking-tight">Market Trends</h2>
                <p className="text-muted-foreground text-sm">Ingredient popularity forecast</p>
              </div>
            </div>
            <div className="relative h-[280px] w-full mt-6 border-l border-b border-border">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0 80 Q 20 75, 30 50 T 60 40 T 100 20" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" />
                <path d="M0 90 Q 25 85, 40 70 T 70 55 T 100 45" fill="none" stroke="#ec4899" strokeWidth="2.5" />
              </svg>
            </div>
            <div className="mt-8 flex gap-6">
              <div className="flex-1 p-4 bg-muted rounded-xl">
                <span className="bg-pink-100 text-pink-700 text-[10px] font-black px-2 py-0.5 rounded-full">HOT</span>
                <p className="text-sm font-bold mt-2">Snail Mucin</p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold">+48% Surge</p>
              </div>
              <div className="flex-1 p-4 bg-muted rounded-xl">
                <span className="bg-primary/10 text-primary text-[10px] font-black px-2 py-0.5 rounded-full">STABLE</span>
                <p className="text-sm font-bold mt-2">Niacinamide</p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold">+12% Organic</p>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-black text-primary tracking-tight mb-6">Top Creators</h2>
            <div className="flex flex-col gap-6">
              {creators.map(c => (
                <div key={c.name} className="flex items-center gap-4 p-2 hover:bg-muted rounded-xl transition-colors cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center font-bold">{c.name.charAt(0)}</div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold">{c.name}</h4>
                    <p className="text-[11px] text-muted-foreground font-medium">{c.engagement} Engagement</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-primary">{c.revenue}</p>
                    <p className="text-[10px] text-muted-foreground">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
