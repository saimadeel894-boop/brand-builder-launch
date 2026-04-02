import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DemoFormulationCanvas() {
  const steps = [
    { name: "Ideation", status: "done" },
    { name: "Formulation", status: "active" },
    { name: "Packaging", status: "pending" },
    { name: "Marketing", status: "pending" },
  ];

  const ingredients = [
    {
      name: "Hyaluronic Acid (Complex 2%)",
      type: "Hydrating Agent",
      icon: "🧪",
      comments: [
        { author: "Elena (Influencer)", text: "Can we ensure we use a multi-molecular weight version? My audience really cares about deep hydration vs surface glow." },
        { author: "Brand Team", text: "Agreed. We've updated the spec to include 3 weights. This will slightly adjust the viscosity.", isReply: true },
      ],
    },
    {
      name: "Rosehip Oil (Cold-Pressed)",
      type: "Antioxidant & Glow",
      icon: "🌿",
      comments: [
        { author: "Elena (Influencer)", text: "Love this for the natural Vitamin A. Is it sourced sustainably?" },
      ],
    },
  ];

  const specs = [
    { label: "Bottle Type", value: "Frosted Glass Pipette" },
    { label: "Volume", value: "30ml (1 fl. oz)" },
    { label: "Fragrance Profile", value: "Light Santal & Bergamot" },
  ];

  const costBreakdown = [
    { label: "Ingredients", value: "$2.15" },
    { label: "Packaging", value: "$1.90" },
    { label: "Labor & HQ", value: "$0.77" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold">Product Creation Workspace</h2>
              <Badge className="bg-pink-100 text-pink-700">Radiance Dew Drops</Badge>
            </div>
            <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest">Formulation Canvas — Define & refine active ingredients</p>
          </div>
          <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-bold uppercase tracking-widest">✨ Submit Stage</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar - Journey */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-6">Product Journey</h3>
                <div className="space-y-6">
                  {steps.map((step, i) => (
                    <div key={step.name} className={`flex items-start gap-4 ${step.status === "pending" ? "opacity-50" : ""}`}>
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                          step.status === "done" ? "bg-primary text-primary-foreground" :
                          step.status === "active" ? "border-2 border-primary bg-background" :
                          "border-2 border-border bg-background"
                        }`}>
                          {step.status === "done" ? "✓" : step.status === "active" ? <div className="w-2 h-2 rounded-full bg-primary" /> : null}
                        </div>
                        {i < steps.length - 1 && <div className={`w-0.5 h-8 mt-1 ${step.status === "done" ? "bg-primary/20" : "bg-border"}`} />}
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${step.status === "active" ? "text-primary" : ""}`}>Step {i + 1}</p>
                        <p className={`text-sm font-bold ${step.status === "active" ? "text-primary" : ""}`}>{step.name}</p>
                        {step.status === "active" && <Badge variant="outline" className="mt-1 text-[10px]">In Progress</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-4 bg-muted rounded-xl">
                  <p className="text-xs font-bold text-primary mb-2">Project Timeline</p>
                  <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                    <div className="w-2/5 h-full bg-amber-500" />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2">Estimated Launch: Oct 2024</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main - Ingredients */}
          <div className="lg:col-span-6 space-y-6">
            {ingredients.map((ing) => (
              <Card key={ing.name} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center text-2xl">{ing.icon}</div>
                      <div>
                        <h4 className="text-lg font-bold">{ing.name}</h4>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{ing.type}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-primary">✏️</button>
                      <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-destructive">🗑</button>
                    </div>
                  </div>
                  <div className="bg-muted rounded-xl p-4 space-y-3">
                    {ing.comments.map((c, i) => (
                      <div key={i} className={`flex gap-3 ${c.isReply ? "pl-6 border-l-2 border-primary/10" : ""}`}>
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-primary">{c.author}</p>
                          <p className="text-sm text-muted-foreground italic">&ldquo;{c.text}&rdquo;</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            <button className="w-full py-6 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all">
              <span className="text-3xl mb-1">➕</span>
              <span className="text-sm font-bold">Add Active Ingredient</span>
            </button>
          </div>

          {/* Right Sidebar - Specs & Cost */}
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-6">Product Specs</h3>
                <div className="space-y-4">
                  {specs.map((s) => (
                    <div key={s.label} className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase">{s.label}</label>
                      <div className="flex items-center gap-2 p-2 rounded-lg border bg-muted text-sm">{s.value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-80">Real-time Tracker</h3>
                  <Badge className="bg-amber-500 text-primary font-black text-[10px]">LIVE</Badge>
                </div>
                <p className="text-xs opacity-60 mb-1">Estimated Unit Cost</p>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-extrabold">$4.82</span>
                  <span className="text-xs opacity-60">/ unit</span>
                </div>
                <div className="space-y-2 mb-6">
                  {costBreakdown.map((c) => (
                    <div key={c.label} className="flex justify-between text-[11px]">
                      <span>{c.label}</span><span>{c.value}</span>
                    </div>
                  ))}
                  <div className="h-px bg-primary-foreground/20 w-full my-2" />
                  <div className="flex justify-between text-xs font-bold">
                    <span>Target MSRP</span><span>$32.00</span>
                  </div>
                </div>
                <button className="w-full py-3 bg-primary-foreground text-primary rounded-xl text-xs font-bold uppercase tracking-wider">Download Cost Report</button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
