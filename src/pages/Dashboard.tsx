import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import ManufacturerDashboard from "./dashboard/ManufacturerDashboard";
import BrandDashboard from "./dashboard/BrandDashboard";
import InfluencerDashboard from "./dashboard/InfluencerDashboard";

export default function Dashboard() {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Redirect based on onboarding state
  if (!profile?.role) {
    return <Navigate to="/select-role" replace />;
  }

  if (!profile?.profile_completed) {
    return <Navigate to="/create-profile" replace />;
  }

  // Render role-specific dashboard
  switch (profile.role) {
    case "manufacturer":
      return <ManufacturerDashboard />;
    case "brand":
      return <BrandDashboard />;
    case "influencer":
      return <InfluencerDashboard />;
    default:
      return <Navigate to="/select-role" replace />;
  }
}