import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare, TrendingUp, Users, Sparkles } from "lucide-react";

interface InfluencerProfile {
  name: string;
  primary_platform: string;
}

export default function InfluencerDashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<InfluencerProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const { data } = await supabase
        .from("influencer_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (data) {
        setProfile(data);
      }
    };

    fetchProfile();
  }, [user]);

  const stats = [
    { label: "Active Collaborations", value: "0", icon: Users, trend: null },
    { label: "Messages", value: "0", icon: MessageSquare, trend: null },
    { label: "Pending Requests", value: "0", icon: Sparkles, trend: null },
    { label: "Growth", value: "-", icon: TrendingUp, trend: null },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome section */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, {profile?.name || "Influencer"}!
          </h1>
          <p className="mt-1 text-muted-foreground">
            Here's a summary of your collaborations and messages.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="stat-card">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="mt-2 text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Profile info */}
        <div className="form-section">
          <h2 className="text-lg font-semibold text-foreground">Your Profile</h2>
          <div className="mt-4 space-y-4">
            <div>
              <span className="text-sm text-muted-foreground">Name</span>
              <p className="font-medium text-foreground">{profile?.name || "-"}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Primary Platform</span>
              <p className="font-medium text-foreground">{profile?.primary_platform || "-"}</p>
            </div>
          </div>
        </div>

        {/* Placeholder for future features */}
        <div className="rounded-xl border-2 border-dashed border-border p-8 text-center">
          <Sparkles className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 font-semibold text-foreground">More features coming soon</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Brand partnerships, campaign discovery, and messaging will be available in future updates.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}