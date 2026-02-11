import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Beaker, Shield, Leaf, AlertTriangle, CheckCircle, Info, Filter } from "lucide-react";

const ingredients = [
  { name: "Hyaluronic Acid", inci: "Sodium Hyaluronate", category: "Humectant", safety: "Low", ewg: 1, function: "Moisturizing, Anti-aging", origin: "Biotechnology" },
  { name: "Niacinamide", inci: "Niacinamide", category: "Active", safety: "Low", ewg: 1, function: "Brightening, Pore minimizing", origin: "Synthetic" },
  { name: "Retinol", inci: "Retinol", category: "Active", safety: "Moderate", ewg: 4, function: "Anti-aging, Cell renewal", origin: "Synthetic" },
  { name: "Salicylic Acid", inci: "Salicylic Acid", category: "Exfoliant", safety: "Moderate", ewg: 3, function: "Acne treatment, Exfoliation", origin: "Plant-derived" },
  { name: "Vitamin C", inci: "Ascorbic Acid", category: "Antioxidant", safety: "Low", ewg: 1, function: "Brightening, Antioxidant", origin: "Synthetic" },
  { name: "Centella Asiatica", inci: "Centella Asiatica Extract", category: "Botanical", safety: "Low", ewg: 1, function: "Soothing, Healing", origin: "Plant-derived" },
  { name: "Glycolic Acid", inci: "Glycolic Acid", category: "AHA", safety: "Moderate", ewg: 4, function: "Exfoliation, Brightening", origin: "Synthetic" },
  { name: "Squalane", inci: "Squalane", category: "Emollient", safety: "Low", ewg: 1, function: "Moisturizing, Barrier repair", origin: "Plant-derived" },
];

const getSafetyColor = (safety: string) => {
  switch (safety) {
    case "Low": return "bg-manufacturer/10 text-manufacturer border-manufacturer/20";
    case "Moderate": return "bg-warning/10 text-warning border-warning/20";
    case "High": return "bg-destructive/10 text-destructive border-destructive/20";
    default: return "";
  }
};

export default function IngredientDatabase() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Beaker className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Ingredient Database</h1>
                <p className="text-sm text-muted-foreground">Global cosmetic ingredient reference</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <Leaf className="h-3 w-3" />
              8,400+ Ingredients
            </Badge>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by name, INCI, or function..." className="pl-9" />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {["All", "Actives", "Humectants", "Emollients", "Botanicals", "AHA/BHA", "Antioxidants"].map((cat) => (
                <Badge key={cat} variant={cat === "All" ? "default" : "outline"} className="cursor-pointer">{cat}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Safety Legend */}
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground">Safety Rating:</span>
          <div className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5 text-manufacturer" /> Low Risk</div>
          <div className="flex items-center gap-1"><Info className="h-3.5 w-3.5 text-warning" /> Moderate</div>
          <div className="flex items-center gap-1"><AlertTriangle className="h-3.5 w-3.5 text-destructive" /> High</div>
        </div>

        {/* Ingredient Table */}
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Ingredient</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">INCI Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Function</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Safety</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">EWG</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Origin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {ingredients.map((ing) => (
                    <tr key={ing.name} className="hover:bg-secondary/30 cursor-pointer">
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{ing.name}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground font-mono text-xs">{ing.inci}</td>
                      <td className="px-4 py-3"><Badge variant="secondary" className="text-xs">{ing.category}</Badge></td>
                      <td className="px-4 py-3 text-sm text-muted-foreground max-w-[200px] truncate">{ing.function}</td>
                      <td className="px-4 py-3"><Badge className={`text-xs ${getSafetyColor(ing.safety)}`}>{ing.safety}</Badge></td>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{ing.ewg}</td>
                      <td className="px-4 py-3"><Badge variant="outline" className="text-xs">{ing.origin}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
