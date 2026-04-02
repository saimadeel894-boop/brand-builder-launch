import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function DemoIngredientDatabase() {
  const ingredients = [
    { name: "Retinol", cas: "68-26-8", score: 7, scoreLabel: "High", scoreColor: "text-red-500", barW: "70%", usa: "Restricted", eu: "Restricted", china: "Allowed" },
    { name: "Hyaluronic Acid", cas: "9004-61-9", score: 1, scoreLabel: "Low", scoreColor: "text-emerald-500", barW: "10%", usa: "Allowed", eu: "Allowed", china: "Allowed", active: true },
    { name: "Phenoxyethanol", cas: "122-99-6", score: 4, scoreLabel: "Mod", scoreColor: "text-amber-500", barW: "40%", usa: "Restricted", eu: "Restricted", china: "Allowed" },
    { name: "Methylparaben", cas: "99-76-3", score: 8, scoreLabel: "High", scoreColor: "text-red-500", barW: "80%", usa: "Restricted", eu: "Banned", china: "Banned" },
  ];

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      Allowed: "bg-emerald-100 text-emerald-700",
      Restricted: "bg-amber-100 text-amber-700",
      Banned: "bg-red-100 text-red-700",
    };
    return <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${colors[status]}`}>{status}</span>;
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Global Cosmetic Ingredient Database</h2>
            <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest mt-1">Ingredient Intelligence Registry</p>
          </div>
          <div className="flex items-center gap-3">
            <Input placeholder="Search by INCI, CAS number, or function..." className="w-80" />
            <button className="px-4 py-2 border rounded-lg text-xs font-bold">🔍 Advanced Filters</button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-muted-foreground uppercase mr-2">Clean Standards:</span>
          <Badge className="bg-primary/10 text-primary border-primary">Sephora Clean ✕</Badge>
          <Badge variant="outline">Ulta Conscious</Badge>
          <Badge variant="outline">Credo Standard</Badge>
          <Badge variant="outline">Vegan</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Table */}
          <div className="lg:col-span-8">
            <Card className="overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-muted/50 border-b">
                    <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Ingredient (INCI)</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Safety (1-10)</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest text-center">USA</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest text-center">EU</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest text-center">China</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {ingredients.map((ing) => (
                    <tr key={ing.name} className={`hover:bg-muted/50 transition-colors cursor-pointer border-l-4 ${ing.active ? "border-l-primary bg-primary/5" : "border-l-transparent hover:border-l-primary"}`}>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold">{ing.name}</span>
                        <br />
                        <span className="text-[10px] text-muted-foreground font-mono">CAS: {ing.cas}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                            <div className={`h-full ${ing.score >= 7 ? "bg-red-500" : ing.score >= 4 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: ing.barW }} />
                          </div>
                          <span className={`text-xs font-bold ${ing.scoreColor}`}>{ing.score} ({ing.scoreLabel})</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">{statusBadge(ing.usa)}</td>
                      <td className="px-6 py-4 text-center">{statusBadge(ing.eu)}</td>
                      <td className="px-6 py-4 text-center">{statusBadge(ing.china)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-6 py-4 bg-muted/30 border-t flex items-center justify-between">
                <p className="text-[10px] text-muted-foreground uppercase font-bold">Showing 1 to 4 of 2,480 ingredients</p>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 rounded border flex items-center justify-center text-muted-foreground">‹</button>
                  <button className="w-8 h-8 rounded bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</button>
                  <button className="w-8 h-8 rounded border flex items-center justify-center text-xs">2</button>
                  <button className="w-8 h-8 rounded border flex items-center justify-center text-muted-foreground">›</button>
                </div>
              </div>
            </Card>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-4">
            <Card>
              <div className="p-6 bg-primary/5 border-b">
                <Badge className="bg-primary text-primary-foreground text-[9px] mb-2">Active Detail</Badge>
                <h3 className="text-xl font-extrabold">Hyaluronic Acid</h3>
                <p className="text-xs text-muted-foreground font-mono">MW: 1.2M - 1.5M Daltons</p>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-background p-3 rounded border border-primary/20">
                    <p className="text-[9px] text-muted-foreground uppercase font-bold mb-1">EWG Score</p>
                    <span className="text-lg font-bold text-emerald-500">1</span>
                    <span className="text-[10px] font-bold text-emerald-500 ml-1">Verified</span>
                  </div>
                  <div className="bg-background p-3 rounded border border-primary/20">
                    <p className="text-[9px] text-muted-foreground uppercase font-bold mb-1">Safety Dial</p>
                    <span className="text-lg font-bold text-emerald-500">Low ✅</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h4 className="text-[11px] font-bold text-primary uppercase tracking-widest mb-3">Functional Properties</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Humectant", "Skin-Identical", "Viscosity Controller"].map((f) => (
                      <Badge key={f} variant="outline">{f}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-primary uppercase tracking-widest mb-3">Allergen Profile</h4>
                  <div className="p-4 rounded bg-red-50 border border-red-100">
                    <p className="text-xs font-bold text-red-700 mb-1">⚠️ Low Sensitivity Risk</p>
                    <p className="text-[11px] text-red-600/80">Generally recognized as safe. Rare instances of flare-ups with low-molecular weights.</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-primary uppercase tracking-widest mb-3">Sustainability</h4>
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <p className="text-xs font-bold">Natural Fermentation</p>
                      <p className="text-[10px] text-muted-foreground">Bio-synthesized via Streptococcus zooepidemicus.</p>
                    </div>
                    <span className="text-xs font-bold text-primary">A+</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "92%" }} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div><span className="text-[10px] text-muted-foreground uppercase font-bold">Carbon Footprint</span><br /><span className="text-xs font-bold">0.4kg CO2e/kg</span></div>
                    <div><span className="text-[10px] text-muted-foreground uppercase font-bold">Biodegradability</span><br /><span className="text-xs font-bold">Readily Biodeg.</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
