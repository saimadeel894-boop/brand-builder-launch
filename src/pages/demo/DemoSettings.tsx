import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function DemoSettings() {
  const settingsNav = [
    { name: "General", icon: "👤", active: true },
    { name: "Security", icon: "🔒" },
    { name: "Notifications", icon: "🔔" },
    { name: "Platform Preferences", icon: "⚙️" },
    { name: "Billing", icon: "💳" },
    { name: "Team Members", icon: "👥" },
  ];

  return (
    <DashboardLayout>
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 gap-6">
          <div>
            <h1 className="text-xl font-bold px-3 mb-2">Settings</h1>
            <p className="text-muted-foreground text-sm px-3 mb-4">Manage platform preferences</p>
            <nav className="flex flex-col gap-1">
              {settingsNav.map((item) => (
                <a key={item.name} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${item.active ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"}`} href="#">
                  <span>{item.icon}</span>
                  <span className="text-sm">{item.name}</span>
                </a>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4 bg-primary/10 rounded-xl border border-primary/20">
            <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">✨ Pro Feature</p>
            <p className="text-xs text-muted-foreground mb-3">Enable AI Sourcing to find manufacturers 3x faster.</p>
            <button className="text-xs font-bold text-primary hover:underline">Upgrade Plan</button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 space-y-6">
          <div className="mb-8">
            <h2 className="text-3xl font-black tracking-tight mb-2">General Settings</h2>
            <p className="text-muted-foreground text-lg">Manage your account details and public profile visibility.</p>
          </div>

          {/* Profile Card */}
          <Card>
            <div className="p-6 border-b">
              <h3 className="text-lg font-bold">Public Profile</h3>
              <p className="text-sm text-muted-foreground mt-1">This information will be displayed on your brand page.</p>
            </div>
            <CardContent className="p-6 flex flex-col md:flex-row gap-8 items-start">
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-muted border-4 border-background shadow-inner flex items-center justify-center text-3xl">👤</div>
                <button className="text-sm font-semibold text-primary">Change Avatar</button>
              </div>
              <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <Label>Display Name</Label>
                  <Input defaultValue="Sarah Jenkins" className="mt-2" />
                </div>
                <div>
                  <Label>Role</Label>
                  <Input defaultValue="Brand Manager" className="mt-2" />
                </div>
                <div>
                  <Label>Company / Entity</Label>
                  <Input defaultValue="Lumina Cosmetics" className="mt-2" />
                </div>
                <div className="col-span-2">
                  <Label>Bio</Label>
                  <Textarea placeholder="Tell us about your brand vision..." className="mt-2" rows={3} />
                  <p className="text-xs text-muted-foreground mt-1 text-right">0/150 characters</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Info */}
          <Card>
            <div className="p-6 border-b flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">Account Information</h3>
                <p className="text-sm text-muted-foreground mt-1">Private details used for account recovery and notifications.</p>
              </div>
              <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">✅ Verified</span>
            </div>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>First Name</Label>
                <Input defaultValue="Sarah" className="mt-2" />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input defaultValue="Jenkins" className="mt-2" />
              </div>
              <div>
                <Label>Email Address</Label>
                <Input defaultValue="sarah.j@luminacosmetics.com" type="email" className="mt-2" />
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input defaultValue="+1 (555) 000-0000" type="tel" className="mt-2" />
              </div>
            </CardContent>
          </Card>

          {/* Intelligence Settings */}
          <Card>
            <div className="p-6 border-b">
              <h3 className="text-lg font-bold">BeautyChain Intelligence</h3>
              <p className="text-sm text-muted-foreground mt-1">Configure AI and smart matching features.</p>
            </div>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="max-w-[80%]">
                  <span className="text-sm font-semibold">AI Product Matching</span>
                  <p className="text-sm text-muted-foreground">Allow our AI to analyze your brand moodboard and suggest manufacturers automatically.</p>
                </div>
                <Switch />
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-center justify-between">
                <div className="max-w-[80%]">
                  <span className="text-sm font-semibold">RFQ Smart Alerts</span>
                  <p className="text-sm text-muted-foreground">Receive instant notifications when a manufacturer bids on your RFQ with {"<"} 90% match score.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4 py-4">
            <button className="px-6 py-2.5 rounded-lg border text-muted-foreground font-medium hover:bg-muted">Cancel</button>
            <button className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium">Save Changes</button>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}
