import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Download, TrendingUp, TrendingDown, Leaf, Heart, Award, Building } from "lucide-react";

const stats = [
  { label: "Overall Grade", value: "A", sub: "+5% vs. v2", primary: true },
  { label: "Plastic-Free", value: "94%", change: "+12.4%", up: true },
  { label: "Carbon Footprint", value: "1.2 kg CO₂e", change: "-8.1%", up: false },
  { label: "Recyclability", value: "100%", pct: 100 },
];

const certs = [
  { icon: Heart, name: "Leaping Bunny" },
  { icon: Leaf, name: "Fair Trade" },
  { icon: Building, name: "B-Corp Status" },
];

const ingredients = [
  { name: "Organic Shea Butter", origin: "Ghana, Women's Co-op", ethics: "Fair Trade Certified", bio: "100% (28 days)", score: "98/100" },
  { name: "Wild Rosehip Oil", origin: "Chile, Andes Region", ethics: "Wild Harvested", bio: "100% (14 days)", score: "95/100" },
  { name: "Vegetable Glycerin", origin: "Netherlands (EU)", ethics: "RSPO Certified", bio: "92% (28 days)", score: "88/100" },
];

export default function DemoSustainability() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="text-primary font-bold tracking-widest text-xs uppercase">Transparency Report 2024</span>
            <h1 className="text-4xl font-black leading-tight tracking-tight mt-1">Glow Serum v3</h1>
            <p className="text-muted-foreground flex items-center gap-2 mt-1">
              <Award className="h-4 w-4" /> Verified by EcoCert • Last update Oct 24, 2023
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">View History</Button>
            <Button variant="outline">Share Data</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <Card key={s.label} className={s.primary ? "bg-primary text-primary-foreground shadow-xl" : ""}>
              <CardContent className="p-8 flex flex-col justify-between">
                <p className={`text-sm font-semibold mb-2 uppercase tracking-wider ${s.primary ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{s.label}</p>
                <h3 className={`text-4xl font-black ${s.primary ? "" : ""}`}>{s.value}</h3>
                {s.sub && <span className="mt-4 bg-primary-foreground/20 px-3 py-1 rounded-full text-xs font-bold">{s.sub}</span>}
                {s.change && (
                  <div className={`mt-4 flex items-center gap-2 font-bold ${s.up ? "text-green-500" : "text-red-400"}`}>
                    {s.up ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    <span>{s.change}</span>
                  </div>
                )}
                {s.pct !== undefined && <Progress value={s.pct} className="h-2 mt-4" />}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Supply Chain */}
        <Card>
          <CardHeader>
            <CardTitle>Supply Chain Traceability</CardTitle>
            <p className="text-sm text-muted-foreground">Direct sourcing routes for active botanicals</p>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[200px] bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
              <Leaf className="h-12 w-12 opacity-20" />
            </div>
          </CardContent>
        </Card>

        {/* Certifications + Carbon */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-black mb-6">Ethics & Certifications</h3>
            <div className="grid grid-cols-3 gap-4">
              {certs.map((c) => (
                <Card key={c.name} className="text-center hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex flex-col items-center gap-3">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                      <c.icon className="h-8 w-8 text-primary" />
                    </div>
                    <span className="text-xs font-extrabold uppercase tracking-tighter">{c.name}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-black mb-6">Carbon Offset Tracker</h3>
            <Card className="h-full">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div><p className="text-4xl font-black text-green-500">115%</p><p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Projected Offset</p></div>
                </div>
                <div className="space-y-4">
                  <div><div className="flex justify-between text-sm font-bold mb-1"><span>Emissions</span><span>1,200kg</span></div><Progress value={60} className="h-4" /></div>
                  <div><div className="flex justify-between text-sm font-bold mb-1"><span>Offset Investment</span><span>1,380kg</span></div><Progress value={80} className="h-4" /></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Ingredient Table */}
        <Card>
          <CardHeader><CardTitle>Ingredient Ethical Disclosure</CardTitle></CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-muted/50 text-xs font-extrabold uppercase tracking-widest text-muted-foreground">
                    <th className="px-6 py-4">Ingredient</th>
                    <th className="px-6 py-4">Origin</th>
                    <th className="px-6 py-4">Sourcing Ethics</th>
                    <th className="px-6 py-4">Biodegradability</th>
                    <th className="px-6 py-4 text-right">Impact Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {ingredients.map((ing) => (
                    <tr key={ing.name} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-primary">{ing.name}</td>
                      <td className="px-6 py-4 text-sm">{ing.origin}</td>
                      <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[10px] font-black uppercase">{ing.ethics}</span></td>
                      <td className="px-6 py-4 text-sm">{ing.bio}</td>
                      <td className="px-6 py-4 text-right font-black">{ing.score}</td>
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
