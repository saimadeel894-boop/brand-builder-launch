import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function DemoManufacturerOnboarding() {
  const steps = [
    { name: "Company Info", icon: "🏢", active: true },
    { name: "Capabilities", icon: "⚙️" },
    { name: "Certifications", icon: "✅" },
    { name: "Payment", icon: "💳" },
    { name: "Review", icon: "☑️" },
  ];

  return (
    <DashboardLayout>
      <div className="flex gap-8 flex-col lg:flex-row">
        {/* Stepper */}
        <aside className="hidden lg:flex flex-col w-72 shrink-0">
          <Card>
            <CardContent className="p-6">
              <div className="mb-8">
                <h1 className="text-xl font-bold">Setup Guide</h1>
                <p className="text-sm text-muted-foreground mt-1">Complete your factory profile</p>
                <div className="mt-4 w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "20%" }} />
                </div>
                <p className="text-xs font-semibold text-primary mt-2">Step 1 of 5</p>
              </div>
              <nav className="space-y-2">
                {steps.map((s) => (
                  <a key={s.name} className={`flex items-center gap-3 px-4 py-3 rounded-xl ${s.active ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:bg-muted"}`} href="#">
                    <span>{s.icon}</span>
                    <span className={`text-sm ${s.active ? "font-bold" : "font-medium"}`}>{s.name}</span>
                  </a>
                ))}
              </nav>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <span className="text-xl">🎧</span>
                <div>
                  <p className="text-xs font-bold">Need help?</p>
                  <p className="text-xs text-muted-foreground mt-1">Contact our onboarding support team.</p>
                  <a className="text-xs text-primary font-medium hover:underline mt-2 inline-block" href="#">Chat with us</a>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Main Form */}
        <main className="flex-1">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Tell us about your factory</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">Start by providing your basic business details so brands can verify your identity and ensure supply chain transparency.</p>
          </div>

          <Card>
            <CardContent className="p-8 space-y-8">
              {/* Identity */}
              <div>
                <div className="flex items-center gap-2 mb-6 pb-2 border-b">
                  <span>🪪</span>
                  <h3 className="text-lg font-bold">Corporate Identity</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Company Name <span className="text-destructive">*</span></Label>
                    <Input placeholder="e.g. Apex Manufacturing Ltd." className="mt-2" />
                  </div>
                  <div>
                    <Label>Registration Number (CRN) <span className="text-destructive">*</span></Label>
                    <Input placeholder="e.g. 12345678" className="mt-2" />
                  </div>
                  <div className="col-span-2">
                    <Label>Company Website</Label>
                    <Input placeholder="https://www.yourfactory.com" className="mt-2" />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <div className="flex items-center gap-2 mb-6 pb-2 border-b">
                  <span>📍</span>
                  <h3 className="text-lg font-bold">Headquarters Location</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <Label>Street Address <span className="text-destructive">*</span></Label>
                    <Input placeholder="Building, Street, Area" className="mt-2" />
                  </div>
                  <div>
                    <Label>Country / Region <span className="text-destructive">*</span></Label>
                    <select className="w-full mt-2 rounded-lg border bg-background h-12 px-4">
                      <option disabled selected>Select country</option>
                      <option>China</option><option>South Korea</option><option>Japan</option>
                      <option>United States</option><option>France</option><option>Italy</option>
                    </select>
                  </div>
                  <div>
                    <Label>City <span className="text-destructive">*</span></Label>
                    <Input placeholder="e.g. Shanghai" className="mt-2" />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <div className="flex items-center gap-2 mb-6 pb-2 border-b">
                  <span>📝</span>
                  <h3 className="text-lg font-bold">About the Factory</h3>
                </div>
                <Label>Short Bio</Label>
                <p className="text-xs text-muted-foreground mb-2">Briefly describe your specialization, history, and key clients (max 500 chars).</p>
                <Textarea placeholder="Established in 2005, we specialize in organic skincare formulations..." rows={4} />
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 flex items-center justify-between">
            <button className="px-6 py-3 rounded-lg text-muted-foreground font-medium">Cancel</button>
            <button className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-bold rounded-lg shadow-lg">Continue to Capabilities ➡</button>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}
