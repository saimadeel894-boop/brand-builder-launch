import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, Bell, Shield, Globe, Palette, CreditCard, Users, Lock } from "lucide-react";

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Platform Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and platform configuration</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Settings Navigation */}
          <Card className="lg:col-span-1 h-fit">
            <CardContent className="pt-6 space-y-1">
              {[
                { icon: SettingsIcon, label: "General", active: true },
                { icon: Bell, label: "Notifications" },
                { icon: Shield, label: "Security" },
                { icon: Globe, label: "Language & Region" },
                { icon: Palette, label: "Appearance" },
                { icon: CreditCard, label: "Billing" },
                { icon: Users, label: "Team Members" },
                { icon: Lock, label: "Privacy" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${item.active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-secondary"}`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              })}
            </CardContent>
          </Card>

          {/* Settings Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Info */}
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Update your account details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Display Name</Label>
                    <Input placeholder="Your name" defaultValue="John Smith" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="Email" defaultValue="john@example.com" disabled />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Company / Brand</Label>
                  <Input placeholder="Company name" defaultValue="Glow Beauty Co" />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to be notified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Email Notifications", desc: "Receive updates about RFQs, messages, and campaigns", default: true },
                  { label: "New Match Alerts", desc: "Get notified when AI finds a new partner match", default: true },
                  { label: "RFQ Status Updates", desc: "Notifications when RFQ status changes", default: true },
                  { label: "Marketing Emails", desc: "Platform news and feature updates", default: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch defaultChecked={item.default} />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Security */}
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div>
                    <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                    <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Badge variant="outline">Coming Soon</Badge>
                </div>
                <Separator />
                <Button variant="outline">Change Password</Button>
              </CardContent>
            </Card>

            {/* Plan */}
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Current Plan</CardTitle>
                  <Badge className="bg-primary">Pro</Badge>
                </div>
                <CardDescription>You're on the Pro plan with unlimited matches</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline">Manage Subscription</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
