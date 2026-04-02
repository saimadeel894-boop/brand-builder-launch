import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";

export default function DemoInfluencerProfile() {
  const stats = [
    { label: "Performance Index", value: "94", suffix: "/100", change: "+5% vs last month", icon: "📈" },
    { label: "Avg. Engagement", value: "4.2%", change: "+0.8% organic lift", icon: "🔗" },
    { label: "Success Rate", value: "88%", change: "Verified campaigns only", icon: "✅" },
  ];

  const collabs = [
    { name: "Glow Serum x Glossier", type: "Co-Creation & Campaign", roi: "4.5x", reach: "1.2M+" },
    { name: "Hydra-Mist x Sephora", type: "Exclusive Product Launch", roi: "3.8x", engagement: "5.2%" },
    { name: "Velvet Lip x MAC", type: "Holiday Collection", roi: "5.1x", conversion: "12%" },
  ];

  const cities = [
    { name: "New York", pct: 42 },
    { name: "London", pct: 28 },
    { name: "Paris", pct: 15 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-12">
        {/* Profile Header */}
        <section>
          <div className="relative w-full h-48 rounded-xl overflow-hidden mb-16 bg-gradient-to-r from-primary/20 to-accent/20">
            <div className="absolute -bottom-12 left-10 flex items-end gap-6">
              <div className="w-32 h-32 rounded-full border-4 border-background bg-muted flex items-center justify-center text-5xl shadow-xl">👩</div>
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-3xl font-bold">Elena V.</h2>
                  <span className="text-blue-500">✅</span>
                </div>
                <p className="text-lg text-muted-foreground font-medium">@elena_beauty</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mt-4">
            <div className="md:col-span-2">
              <p className="text-xl leading-relaxed text-muted-foreground italic mb-6">
                "Redefining modern elegance through curated skincare rituals and high-fashion narratives. Based between Paris and New York."
              </p>
              <div className="flex flex-wrap gap-6">
                <span className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider">📍 New York / Paris</span>
                <span className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider">📸 Instagram: 1.2M</span>
                <span className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider">🎬 TikTok: 850K</span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <button className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold uppercase tracking-widest">✨ Start Collaboration</button>
              <div className="flex gap-2">
                <button className="flex-1 border py-3 rounded-xl flex items-center justify-center gap-2">✉️ Message</button>
                <button className="border px-4 py-3 rounded-xl">🔗</button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((s) => (
              <Card key={s.label}>
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{s.label}</p>
                    <span className="text-xl">{s.icon}</span>
                  </div>
                  <p className="text-5xl font-bold mb-2">{s.value}<span className="text-xl text-muted-foreground">{s.suffix || ""}</span></p>
                  <p className="mt-4 text-sm font-medium text-emerald-600">{s.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Audience Insights */}
          <div className="lg:col-span-5 space-y-8">
            <h3 className="text-2xl font-bold flex items-center gap-3">📊 Audience Insights</h3>
            <Card>
              <CardContent className="p-8">
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">Age Distribution</p>
                <div className="flex items-center justify-center h-48">
                  <div className="w-48 h-48 rounded-full border-[16px] border-primary/10 relative">
                    <div className="absolute inset-0 rounded-full border-[16px] border-primary border-t-transparent border-r-transparent rotate-45" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold">18-34</span>
                      <span className="text-xs font-bold text-muted-foreground uppercase">Primary</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8">
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">Top Global Cities</p>
                <div className="space-y-6">
                  {cities.map((c) => (
                    <div key={c.name}>
                      <div className="flex justify-between text-sm font-bold mb-2 uppercase">{c.name} <span>{c.pct}%</span></div>
                      <div className="w-full bg-muted h-2 rounded-full overflow-hidden"><div className="bg-primary h-full" style={{ width: `${c.pct}%` }} /></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Collaborations */}
          <div className="lg:col-span-7">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">🎨 Past Collaborations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {collabs.map((c) => (
                <Card key={c.name} className="group cursor-pointer overflow-hidden">
                  <div className="relative aspect-[4/5] bg-muted flex items-center justify-center text-5xl">🧴
                    <div className="absolute top-4 right-4 bg-background/90 px-3 py-1 rounded-full text-[10px] font-bold uppercase">ROI: {c.roi}</div>
                    <div className="absolute bottom-4 left-4 right-4 bg-foreground/40 backdrop-blur-md p-3 rounded-xl">
                      <p className="text-background text-xs font-bold uppercase mb-1">{c.reach ? "Reach" : c.engagement ? "Engagement" : "Conversion"}</p>
                      <p className="text-background text-lg font-bold">{c.reach || c.engagement || c.conversion}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="text-lg font-bold mb-1">{c.name}</h4>
                    <p className="text-sm text-muted-foreground uppercase tracking-widest">{c.type}</p>
                  </CardContent>
                </Card>
              ))}
              <Card className="flex items-center justify-center aspect-[4/5] border-dashed cursor-pointer hover:bg-muted/50">
                <div className="text-center p-6">
                  <span className="text-4xl text-muted-foreground">···</span>
                  <p className="text-sm font-bold uppercase tracking-widest mt-2">View All Cases</p>
                  <p className="text-xs text-muted-foreground mt-2">12 Additional Verified Campaigns</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
