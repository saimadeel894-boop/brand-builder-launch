import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";

export default function DemoCampaignTracking() {
  const stats = [
    { label: "Total Sales Revenue", value: "$1.2M", change: "+12.4% vs target", icon: "💰", positive: true },
    { label: "Conversion Rate", value: "8.4%", change: "+2.1% from baseline", icon: "🛒", positive: true },
    { label: "Social Sentiment", value: "92%", change: "Highly Positive", icon: "😊", positive: true },
    { label: "Influencer ROI", value: "4.5x", change: "Verified Attribution", icon: "⭐", positive: true },
  ];

  const content = [
    { title: "Night Ritual Routine", platform: "TikTok Video • 2 days ago", views: "842K", engagement: "6.8%", sales: "$184,200", clicks: "24.5K" },
    { title: "The Golden Hour Glow", platform: "IG Reel • 5 days ago", views: "521K", engagement: "4.2%", sales: "$92,800", clicks: "12.1K" },
    { title: "Skincare Layering 101", platform: "TikTok Tutorial • 1 week ago", views: "1.1M", engagement: "7.1%", sales: "$312,000", clicks: "41.8K" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold">Campaign: Glow Serum x Elena V.</h2>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Live
              </span>
            </div>
            <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest">Launched October 12, 2023 • Duration: 30 Days</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-6 py-2.5 border border-border rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-accent">📥 Export Report</button>
            <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-bold uppercase tracking-widest">⚙️ Campaign Settings</button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(s => (
            <Card key={s.label}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">{s.label}</p>
                  <span className="text-xl">{s.icon}</span>
                </div>
                <p className="text-3xl font-bold">{s.value}</p>
                <div className="mt-4 flex items-center gap-2 text-emerald-600 text-xs font-bold">
                  📈 {s.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-lg font-bold">Daily Sales vs. Social Mentions</h3>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Real-time correlation tracking</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary" /><span className="text-[10px] font-bold uppercase text-muted-foreground">Sales</span></div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-400" /><span className="text-[10px] font-bold uppercase text-muted-foreground">Mentions</span></div>
              </div>
            </div>
            <div className="h-64 relative border-l border-b border-border">
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 200">
                <path d="M0,150 Q100,140 200,160 T400,100 T600,120 T800,40" fill="none" stroke="hsl(var(--primary))" strokeDasharray="8 4" strokeWidth="3" opacity="0.5" />
                <path d="M0,180 Q100,170 200,130 T400,110 T600,70 T800,20" fill="none" stroke="hsl(var(--primary))" strokeWidth="4" />
              </svg>
              <div className="absolute bottom-[-24px] w-full flex justify-between text-[10px] font-bold text-muted-foreground uppercase px-2">
                <span>Oct 12</span><span>Oct 18</span><span>Oct 24</span><span>Oct 30</span>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <h3 className="text-lg font-bold mb-8">Performance by Channel</h3>
            <div className="space-y-8">
              {[{ name: "TikTok", share: "62%", revenue: "$744K", w: "62%" }, { name: "Instagram", share: "38%", revenue: "$456K", w: "38%" }].map(ch => (
                <div key={ch.name}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{ch.name}</span>
                      <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{ch.share} Share</span>
                    </div>
                    <span className="text-sm font-bold">{ch.revenue}</span>
                  </div>
                  <div className="w-full bg-muted h-8 rounded-lg overflow-hidden">
                    <div className="bg-primary h-full" style={{ width: ch.w }} />
                  </div>
                </div>
              ))}
              <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
                <div><p className="text-[10px] font-bold uppercase text-muted-foreground">Total Reach</p><p className="text-xl font-bold">3.2M</p></div>
                <div className="text-right"><p className="text-[10px] font-bold uppercase text-muted-foreground">Total Eng.</p><p className="text-xl font-bold">184K</p></div>
              </div>
            </div>
          </Card>
        </div>

        {/* Content Table */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold flex items-center gap-3">🎬 Top Performing Content</h3>
            <button className="text-xs font-bold uppercase tracking-widest text-primary border-b border-primary pb-0.5">View Content Library</button>
          </div>
          <Card className="overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Post</th>
                  <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Views</th>
                  <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Engagement</th>
                  <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Direct Sales</th>
                  <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Link Clicks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {content.map(c => (
                  <tr key={c.title} className="hover:bg-muted/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl">🎥</div>
                        <div>
                          <p className="text-sm font-bold">{c.title}</p>
                          <p className="text-[10px] font-medium text-muted-foreground uppercase">{c.platform}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm font-bold">{c.views}</td>
                    <td className="px-8 py-5 text-sm font-bold">{c.engagement}</td>
                    <td className="px-8 py-5 text-sm font-bold text-emerald-600">{c.sales}</td>
                    <td className="px-8 py-5 text-sm font-bold">{c.clicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
