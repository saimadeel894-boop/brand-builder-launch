import { DashboardLayout } from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Download,
  Archive,
  Edit,
  Send,
  Calendar,
  Package,
  DollarSign,
  MapPin,
  Check,
  Clock,
  Users,
  Image,
  MessageSquare,
  FlaskConical,
  Ban,
} from "lucide-react";

const steps = [
  { label: "Draft", completed: true, icon: Check },
  { label: "Open", completed: true, icon: Check },
  { label: "Quoted (3)", active: true, icon: FileText },
  { label: "Approved", upcoming: true, icon: Check },
  { label: "Production", upcoming: true, icon: Package },
];

const quotes = [
  { name: "PureLabs Mfg.", price: "$4.85", location: "South Korea", date: "Oct 25" },
  { name: "NatureCosmetics Inc.", price: "$5.20", location: "USA", date: "New Message", highlighted: true },
  { name: "Global Beauty Co.", price: "$4.55", location: "China", date: "Oct 23" },
];

const recentActivity = [
  { title: "Lipstick - Matte Red", id: "#RFQ-24-001", time: "2h ago", color: "bg-green-500" },
  { title: "Organic Face Serum", id: "#RFQ-24-004", time: "5h ago", color: "bg-yellow-500", active: true },
  { title: "Eco Packaging V2", id: "#RFQ-24-005", time: "1d ago", color: "bg-muted-foreground" },
];

const filters = [
  { name: "All Requests", count: "12", active: true },
  { name: "Drafts", count: "3" },
  { name: "Open for Quotes", count: "5", countColor: "text-green-700 bg-green-100" },
  { name: "In Negotiation" },
  { name: "Closed" },
];

export default function RfqManagement() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Progress Stepper */}
        <div className="bg-card rounded-xl border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-sm font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded">#RFQ-2024-004</span>
                <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                  Quoted
                </Badge>
              </div>
              <h1 className="text-2xl font-bold">Organic Face Serum</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon"><Download className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon"><Archive className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon"><Edit className="h-4 w-4" /></Button>
              <Button className="gap-2"><Send className="h-4 w-4" /> Send to Manufacturers</Button>
            </div>
          </div>

          <div className="flex items-center w-full justify-between relative mt-6">
            <div className="absolute top-4 left-0 w-full h-0.5 bg-border -z-10" />
            {steps.map((step) => (
              <div key={step.label} className="flex flex-col items-center gap-2 bg-card px-2 z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ring-4 ring-card ${
                  step.completed ? "bg-primary text-primary-foreground" :
                  step.active ? "bg-yellow-500 text-white shadow-lg shadow-yellow-500/30" :
                  "bg-secondary text-muted-foreground"
                }`}>
                  {step.completed ? <Check className="h-4 w-4" /> : <step.icon className="h-4 w-4" />}
                </div>
                <span className={`text-xs font-medium ${step.active ? "font-bold" : step.upcoming ? "text-muted-foreground" : "text-primary"}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="specs" className="space-y-6">
          <TabsList>
            <TabsTrigger value="specs" className="gap-2"><FileText className="h-4 w-4" /> Specifications</TabsTrigger>
            <TabsTrigger value="financials" className="gap-2"><DollarSign className="h-4 w-4" /> Financials</TabsTrigger>
            <TabsTrigger value="files" className="gap-2"><Image className="h-4 w-4" /> Mood Board & Files</TabsTrigger>
            <TabsTrigger value="collab" className="gap-2"><MessageSquare className="h-4 w-4" /> Collaboration</TabsTrigger>
          </TabsList>

          <TabsContent value="specs">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Product Overview */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Product Overview</CardTitle>
                    <Button variant="link" size="sm">Edit</Button>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-6">
                      We are looking for a high-quality, organic face serum formulation that targets anti-aging and hydration.
                      The product should be vegan, cruelty-free, and free from parabens. Lightweight and fast-absorbing texture.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-secondary/50 p-3 rounded-lg border">
                        <span className="text-xs text-muted-foreground uppercase font-semibold block mb-1">Product Category</span>
                        <span className="text-sm font-medium">Skincare / Serum</span>
                      </div>
                      <div className="bg-secondary/50 p-3 rounded-lg border">
                        <span className="text-xs text-muted-foreground uppercase font-semibold block mb-1">Target Market</span>
                        <span className="text-sm font-medium">Premium / Luxury</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Ingredients & Packaging */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm uppercase tracking-wide flex items-center gap-2">
                        <FlaskConical className="h-4 w-4 text-primary" /> Key Ingredients
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {["Hyaluronic Acid", "Vitamin C", "Niacinamide", "Aloe Vera"].map((i) => (
                          <Badge key={i} variant="secondary" className="bg-green-50 text-green-700 border-green-100">{i}</Badge>
                        ))}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-wide flex items-center gap-2 mb-2">
                          <Ban className="h-4 w-4 text-red-500" /> Blacklist
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {["Parabens", "Sulfates"].map((i) => (
                            <Badge key={i} variant="secondary" className="bg-red-50 text-red-700 border-red-100 line-through">{i}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm uppercase tracking-wide flex items-center gap-2">
                        <Package className="h-4 w-4 text-primary" /> Packaging
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <span className="text-xs text-muted-foreground block mb-1">Container Type</span>
                        <span className="text-sm font-medium">Glass Dropper Bottle</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-xs text-muted-foreground block mb-1">Volume</span>
                          <span className="text-sm font-medium">30 ml</span>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground block mb-1">Material</span>
                          <span className="text-sm font-medium">Frosted Glass</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground block mb-1">Secondary Packaging</span>
                        <span className="text-sm font-medium">Recycled Cardboard Box with Foil Stamping</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Mood Board */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-sm uppercase tracking-wide flex items-center gap-2">
                      <Image className="h-4 w-4 text-primary" /> Reference Mood Board
                    </CardTitle>
                    <Button variant="link" size="sm" className="gap-1">Add Image</Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="aspect-square rounded-lg bg-secondary flex items-center justify-center">
                          <Image className="h-8 w-8 text-muted-foreground/30" />
                        </div>
                      ))}
                      <div className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground hover:text-primary hover:border-primary cursor-pointer transition-colors">
                        <Package className="h-8 w-8" />
                        <span className="text-xs mt-1">Upload</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Requirements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm uppercase tracking-wide">Requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="flex items-start gap-3">
                      <div className="bg-accent p-2 rounded text-primary"><Calendar className="h-5 w-5" /></div>
                      <div>
                        <span className="text-xs text-muted-foreground block">Required By</span>
                        <span className="text-sm font-semibold">Jan 15, 2025</span>
                        <span className="text-xs text-orange-500 block mt-0.5">Urgent</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-accent p-2 rounded text-primary"><Package className="h-5 w-5" /></div>
                      <div>
                        <span className="text-xs text-muted-foreground block">Quantity (MOQ)</span>
                        <span className="text-sm font-semibold">5,000 Units</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-accent p-2 rounded text-primary"><DollarSign className="h-5 w-5" /></div>
                      <div>
                        <span className="text-xs text-muted-foreground block">Target Budget</span>
                        <span className="text-sm font-semibold">$4.50 - $6.00 / unit</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Shipping To</span>
                      <span className="text-sm font-semibold flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> Los Angeles, CA
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Received Quotes */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between border-b">
                    <CardTitle className="text-sm uppercase tracking-wide">Received Quotes</CardTitle>
                    <Badge className="bg-accent text-accent-foreground">3</Badge>
                  </CardHeader>
                  <CardContent className="p-0 divide-y">
                    {quotes.map((q) => (
                      <div key={q.name} className={`p-4 hover:bg-secondary/50 transition-colors cursor-pointer ${q.highlighted ? "bg-accent/30" : ""}`}>
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-semibold text-sm">{q.name}</span>
                          <Badge variant="secondary" className="bg-green-50 text-green-700">{q.price}</Badge>
                        </div>
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <span>{q.location}</span>
                          <span className={q.highlighted ? "text-primary font-medium" : ""}>{q.date}</span>
                        </div>
                      </div>
                    ))}
                    <div className="p-3 bg-secondary/30 text-center">
                      <Button variant="link" size="sm">Compare All Quotes</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Team */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm uppercase tracking-wide">Team</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex -space-x-2 overflow-hidden mb-4">
                      {["JD", "SK", "MR"].map((initials) => (
                        <div key={initials} className="h-8 w-8 rounded-full bg-primary/10 ring-2 ring-card flex items-center justify-center text-xs font-medium text-primary">
                          {initials}
                        </div>
                      ))}
                      <div className="h-8 w-8 rounded-full bg-secondary ring-2 ring-card flex items-center justify-center text-xs text-muted-foreground">+2</div>
                    </div>
                    <Button variant="outline" className="w-full gap-2">
                      <Users className="h-4 w-4" /> Invite Collaborator
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="financials">
            <Card><CardContent className="p-12 text-center text-muted-foreground">Financial details and cost breakdown coming soon.</CardContent></Card>
          </TabsContent>
          <TabsContent value="files">
            <Card><CardContent className="p-12 text-center text-muted-foreground">Mood board and file management coming soon.</CardContent></Card>
          </TabsContent>
          <TabsContent value="collab">
            <Card><CardContent className="p-12 text-center text-muted-foreground">Collaboration thread and comments coming soon.</CardContent></Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
