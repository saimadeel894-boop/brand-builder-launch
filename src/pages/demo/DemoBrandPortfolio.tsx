import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";

export default function DemoBrandPortfolio() {
  const stats = [
    { label: "Total Launched", value: "24", sub: "+12% vs LY" },
    { label: "Combined Reach", value: "45.2M", sub: "Verified Engagement" },
    { label: "Lifetime Revenue", value: "$12.8M", sub: "+18% Net Margin" },
  ];

  const products = [
    { name: "Luminous Silk Drops", creator: "Elena Rossi Edition", date: "Launched Oct 2023", badge: "Sold Out", badgeColor: "bg-primary text-primary-foreground" },
    { name: "Velvet Matte Lip Kit", creator: "Marcus Thorne Collaboration", date: "Launched Jan 2024", badge: "Award Winning", badgeColor: "bg-card border border-primary text-primary" },
    { name: "Midnight Essence", creator: "Aria Vance Signature", date: "Launched Mar 2024", badge: "New Release", badgeColor: "bg-foreground text-background" },
    { name: "Bakuchiol Infusion", creator: "Leo Grant Series", date: "Launched Nov 2023" },
    { name: "Volcanic Pore Ritual", creator: "Sienna Bloom Co.", date: "Launched Dec 2023", badge: "Sold Out", badgeColor: "bg-primary text-primary-foreground" },
    { name: "Keratin Bond Duo", creator: "David Jensen Salon", date: "Launched Feb 2024" },
    { name: "Gua Sha Sculpt Tool", creator: "Jade Harmony Edition", date: "Launched Jan 2024", badge: "Limited", badgeColor: "bg-foreground text-background" },
    { name: "Alpine Salt Soak", creator: "Mountain Zen Retreat", date: "Launched Nov 2023" },
  ];

  const gradients = [
    "from-rose-200 to-pink-300", "from-amber-200 to-orange-300", "from-violet-200 to-purple-300", "from-emerald-200 to-teal-300",
    "from-sky-200 to-blue-300", "from-lime-200 to-green-300", "from-yellow-200 to-amber-300", "from-indigo-200 to-blue-300",
  ];

  return (
    <DashboardLayout>
      <div className="space-y-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Curated Excellence</p>
            <h2 className="text-4xl md:text-5xl font-light leading-[1.1]">Collaborative Portfolio</h2>
            <p className="mt-6 text-lg text-muted-foreground font-light leading-relaxed">
              Explore our anthology of limited-edition co-creations. Each product represents a unique synergy between avant-garde formulation and influencer vision.
            </p>
          </div>
          <button className="px-8 py-4 bg-primary text-primary-foreground font-bold text-sm tracking-widest uppercase rounded-lg">📥 Export PDF Report</button>
        </div>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border bg-card rounded-xl overflow-hidden shadow-sm">
          {stats.map((s, i) => (
            <div key={s.label} className={`p-8 md:p-10 flex flex-col items-center text-center ${i < 2 ? 'border-b md:border-b-0 md:border-r border-border' : ''}`}>
              <p className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase mb-4">{s.label}</p>
              <p className="text-4xl font-bold text-primary">{s.value}</p>
              <div className="flex items-center gap-1 mt-2 text-green-600 text-xs font-bold">📈 {s.sub}</div>
            </div>
          ))}
        </section>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-2 bg-foreground text-background text-xs font-bold tracking-widest uppercase rounded-full">All Products</button>
          {["Skincare", "Haircare", "Makeup", "Wellness"].map(f => (
            <button key={f} className="px-6 py-2 text-muted-foreground text-xs font-bold tracking-widest uppercase rounded-full border border-border hover:text-primary transition-colors">{f}</button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((p, i) => (
            <div key={p.name} className="group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-card mb-6 shadow-sm border border-border">
                {p.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded ${p.badgeColor}`}>{p.badge}</span>
                  </div>
                )}
                <div className={`w-full h-full bg-gradient-to-br ${gradients[i % gradients.length]} group-hover:scale-105 transition-transform duration-700 flex items-center justify-center text-6xl`}>
                  {["🧴", "💄", "✨", "🌿", "🌋", "💇", "🪨", "🧂"][i % 8]}
                </div>
              </div>
              <div>
                <h3 className="text-xl mb-1 group-hover:text-primary transition-colors font-medium">{p.name}</h3>
                <p className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase mb-3">{p.creator}</p>
                <div className="flex justify-between items-center text-xs text-muted-foreground font-medium">
                  <span>{p.date}</span>
                  <span className="text-primary font-bold">View Case Study</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
