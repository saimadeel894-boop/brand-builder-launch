import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Download, Archive, Edit, Send, Check, Clock, UserPlus } from "lucide-react";

const steps = [
  { label: "Draft", done: true },
  { label: "Open", done: true },
  { label: "Quoted (3)", current: true },
  { label: "Approved", done: false },
  { label: "Production", done: false },
];

const quotes = [
  { name: "PureLabs Mfg.", price: "$4.85", location: "South Korea", date: "Oct 25" },
  { name: "NatureCosmetics Inc.", price: "$5.20", location: "USA", date: "New Message", highlight: true },
  { name: "Global Beauty Co.", price: "$4.55", location: "China", date: "Oct 23" },
];

const ingredients = ["Hyaluronic Acid", "Vitamin C", "Niacinamide", "Aloe Vera"];
const blacklist = ["Parabens", "Sulfates"];

export default function DemoRfqManagement() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Badge variant="outline" className="font-mono">#RFQ-2024-004</Badge>
              <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse mr-1.5" />Quoted
              </Badge>
              <span className="text-xs text-muted-foreground">Last updated: 2 hours ago</span>
            </div>
            <h1 className="text-2xl font-bold">Organic Face Serum</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon"><Download className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon"><Archive className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon"><Edit className="h-4 w-4" /></Button>
            <Button><Send className="h-4 w-4 mr-2" />Send to Manufacturers</Button>
          </div>
        </div>

        {/* Progress Stepper */}
        <div className="flex items-center w-full justify-between relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -z-10 transform -translate-y-1/2" />
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-2 bg-background px-2 z-10">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ring-4 ring-background ${
                s.done ? "bg-primary text-primary-foreground" : s.current ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30" : "bg-muted text-muted-foreground"
              }`}>
                {s.done ? <Check className="h-4 w-4" /> : <span className="text-xs">{i + 1}</span>}
              </div>
              <span className={`text-xs font-medium ${s.current ? "font-bold text-foreground" : s.done ? "text-primary" : "text-muted-foreground"}`}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Product Overview */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Product Overview</CardTitle>
                <Button variant="link" className="text-primary">Edit</Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-6">
                  We are looking for a high-quality, organic face serum formulation targeting anti-aging and hydration. Vegan, cruelty-free, paraben-free. Lightweight and fast-absorbing texture.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <span className="text-xs text-muted-foreground uppercase font-semibold block mb-1">Product Category</span>
                    <span className="text-sm font-medium">Skincare / Serum</span>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <span className="text-xs text-muted-foreground uppercase font-semibold block mb-1">Target Market</span>
                    <span className="text-sm font-medium">Premium / Luxury</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ingredients */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-sm font-bold uppercase tracking-wide mb-4">🔬 Key Ingredients</h3>
                  <div className="flex flex-wrap gap-2">
                    {ingredients.map((i) => <Badge key={i} className="bg-green-50 text-green-700 border-green-100">{i}</Badge>)}
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wide mt-6 mb-3">🚫 Blacklist</h3>
                  <div className="flex flex-wrap gap-2">
                    {blacklist.map((i) => <Badge key={i} className="bg-red-50 text-red-700 border-red-100 line-through">{i}</Badge>)}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-sm font-bold uppercase tracking-wide mb-4">📦 Packaging</h3>
                  <div className="space-y-4">
                    <div><span className="text-xs text-muted-foreground block mb-1">Container</span><span className="text-sm font-medium">Glass Dropper Bottle</span></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><span className="text-xs text-muted-foreground block mb-1">Volume</span><span className="text-sm font-medium">30 ml</span></div>
                      <div><span className="text-xs text-muted-foreground block mb-1">Material</span><span className="text-sm font-medium">Frosted Glass</span></div>
                    </div>
                    <div><span className="text-xs text-muted-foreground block mb-1">Secondary</span><span className="text-sm font-medium">Recycled Cardboard Box with Foil Stamping</span></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mood Board */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-sm font-bold uppercase tracking-wide mb-4">🖼️ Reference Mood Board</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square rounded-lg bg-muted" />
                  ))}
                  <div className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center text-muted-foreground hover:text-primary hover:border-primary cursor-pointer transition-colors">
                    <Plus className="h-8 w-8" /><span className="text-xs mt-1">Upload</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-5">
                <h3 className="text-sm font-bold uppercase tracking-wide mb-4">Requirements</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-50 p-2 rounded text-primary"><Clock className="h-4 w-4" /></div>
                    <div><span className="text-xs text-muted-foreground block">Required By</span><span className="text-sm font-semibold">Jan 15, 2025</span><span className="text-xs text-orange-500 block mt-0.5">Urgent</span></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-50 p-2 rounded text-primary">📦</div>
                    <div><span className="text-xs text-muted-foreground block">Quantity (MOQ)</span><span className="text-sm font-semibold">5,000 Units</span></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-50 p-2 rounded text-primary">💰</div>
                    <div><span className="text-xs text-muted-foreground block">Target Budget</span><span className="text-sm font-semibold">$4.50 - $6.00 / unit</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="text-sm font-bold uppercase tracking-wide">Received Quotes</h3>
                <Badge className="bg-primary/10 text-primary">3</Badge>
              </div>
              <div className="divide-y">
                {quotes.map((q) => (
                  <div key={q.name} className={`p-4 hover:bg-muted/30 transition-colors cursor-pointer ${q.highlight ? "bg-blue-50/50" : ""}`}>
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-sm">{q.name}</span>
                      <Badge className="bg-green-50 text-green-600">{q.price}</Badge>
                    </div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{q.location}</span>
                      <span className={q.highlight ? "text-primary font-medium" : ""}>{q.date}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-muted/30 text-center">
                <Button variant="link" size="sm">Compare All Quotes</Button>
              </div>
            </Card>

            <Card>
              <CardContent className="p-5">
                <h3 className="text-sm font-bold uppercase tracking-wide mb-4">Team</h3>
                <div className="flex -space-x-2 overflow-hidden mb-4">
                  {[1, 2, 3].map((i) => <div key={i} className="h-8 w-8 rounded-full bg-muted ring-2 ring-background" />)}
                  <div className="h-8 w-8 rounded-full bg-muted ring-2 ring-background flex items-center justify-center text-xs text-muted-foreground font-medium">+2</div>
                </div>
                <Button variant="outline" className="w-full"><UserPlus className="h-4 w-4 mr-2" />Invite Collaborator</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
