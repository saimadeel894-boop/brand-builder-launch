import { DashboardLayout } from "@/components/DashboardLayout";

export default function DemoAIMatching() {
  const ingredients = [
    { name: "Aqua (Water)", fn: "Solvent", pct: "72.5%", w: "72%", color: "bg-blue-500", ai: false },
    { name: "Niacinamide", fn: "Brightening Active", pct: "5.0%", w: "5%", color: "bg-purple-500", ai: true },
    { name: "Glycerin", fn: "Humectant", pct: "4.0%", w: "4%", color: "bg-blue-400", ai: false },
    { name: "Ascorbyl Glucoside", fn: "Vitamin C Derivative", pct: "2.0%", w: "2%", color: "bg-purple-500", ai: true },
    { name: "Sodium Hyaluronate", fn: "Hydration Booster", pct: "1.5%", w: "1.5%", color: "bg-blue-300", ai: true },
  ];

  const matches = [
    { name: "Pure Labs Manufacturing", location: "Seoul, South Korea", score: 98, tags: ["Vegan Certified", "Serum Expert"], moq: "500 units", lead: "6 weeks" },
    { name: "BioGlow Ingredients", location: "Lyon, France", score: 91, tags: ["EU Certified", "Clean Beauty"], moq: "1000 units", lead: "8 weeks" },
    { name: "NaturaChem Labs", location: "Mumbai, India", score: 85, tags: ["Cost Effective", "Scale Ready"], moq: "2000 units", lead: "5 weeks" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Project Phase: Development</span>
              <span className="text-xs text-muted-foreground">Last saved 2 mins ago</span>
            </div>
            <h1 className="text-2xl font-bold">Summer Glow Serum v2</h1>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background text-sm font-medium hover:bg-accent transition-colors">
              Save Draft
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-white shadow-lg text-sm font-medium">
              🚀 Launch Project
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left: Formulation Lab */}
          <section className="col-span-12 xl:col-span-7 space-y-6">
            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <div className="p-5 border-b border-border bg-muted/50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-primary">🧬</span>
                  <h3 className="font-bold">AI Formulation Lab</h3>
                </div>
                <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full font-medium border border-purple-200">
                  Generative Mode
                </span>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1.5">Product Concept</label>
                    <textarea className="w-full bg-muted border border-border rounded-lg text-sm p-3 min-h-[80px]" defaultValue="Brightening serum targeting hyperpigmentation for Gen Z demographic. Texture should be watery and fast-absorbing. Natural finish." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Desired Effects</label>
                    <div className="flex flex-wrap gap-2 p-3 bg-muted border border-border rounded-lg">
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">Brightening ×</span>
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">Hydrating ×</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Constraints</label>
                    <div className="flex flex-wrap gap-2 p-3 bg-muted border border-border rounded-lg">
                      <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded">No Parabens ×</span>
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Vegan ×</span>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-foreground text-background hover:opacity-90 font-medium py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg">
                  🔄 Generate Optimized Formula
                </button>
              </div>
            </div>

            {/* Generated Formula */}
            <div className="bg-card rounded-xl border border-border shadow-sm">
              <div className="p-5 border-b border-border flex justify-between items-center">
                <h3 className="font-bold">Generated Formula #A3</h3>
                <div className="flex gap-4 text-sm">
                  <span className="text-green-600 font-medium">✓ Stability: 94%</span>
                  <span className="text-primary font-medium">💰 Est. Cost: $4.20/unit</span>
                </div>
              </div>
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                  <tr>
                    <th className="px-6 py-3">Ingredient</th>
                    <th className="px-6 py-3">Function</th>
                    <th className="px-6 py-3 w-32">Concentration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {ingredients.map((ing) => (
                    <tr key={ing.name} className={`hover:bg-muted/50 transition-colors ${ing.ai ? 'bg-purple-50/30' : ''}`}>
                      <td className="px-6 py-4 font-medium flex items-center gap-2">
                        {ing.name}
                        {ing.ai && <span className="text-purple-500 text-xs">✨</span>}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{ing.fn}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs w-8 text-right">{ing.pct}</span>
                          <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className={`${ing.color} h-full`} style={{ width: ing.w }} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-4 bg-muted/50 text-center border-t border-border">
                <button className="text-sm text-primary font-medium hover:underline">View Full Breakdown (18 Ingredients)</button>
              </div>
            </div>
          </section>

          {/* Right: Partner Matching */}
          <section className="col-span-12 xl:col-span-5 space-y-6">
            <div className="bg-card rounded-xl border border-border shadow-sm flex flex-col h-full">
              <div className="p-5 border-b border-border">
                <h3 className="font-bold mb-1">AI Partner Matching</h3>
                <p className="text-xs text-muted-foreground">Based on your formulation, aesthetic, and budget.</p>
                <div className="flex p-1 bg-muted rounded-lg mt-4">
                  <button className="flex-1 py-1.5 text-xs font-medium rounded-md bg-background shadow-sm">Manufacturers</button>
                  <button className="flex-1 py-1.5 text-xs font-medium rounded-md text-muted-foreground">Influencers</button>
                  <button className="flex-1 py-1.5 text-xs font-medium rounded-md text-muted-foreground">Brands</button>
                </div>
              </div>
              <div className="p-4 flex-1 overflow-y-auto space-y-4">
                {matches.map((m) => (
                  <div key={m.name} className="border border-border rounded-lg p-4 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer relative bg-card">
                    <div className="absolute top-3 right-3">
                      <span className="text-green-600 font-bold text-sm bg-green-50 px-2 py-0.5 rounded-full">
                        {m.score}% Match ✓
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-primary font-bold">
                        {m.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{m.name}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5 mb-2">{m.location}</p>
                        <div className="flex flex-wrap gap-1">
                          {m.tags.map(t => (
                            <span key={t} className="text-[10px] bg-muted px-1.5 py-0.5 rounded">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border flex gap-6 text-xs text-muted-foreground">
                      <span>MOQ: {m.moq}</span>
                      <span>Lead: {m.lead}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
