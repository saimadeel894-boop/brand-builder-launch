import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import Landing from "./Landing";

export default function Index() {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Not logged in - show landing page
  if (!user) {
    return <Landing />;
  }

  // Logged in but no role - redirect to role selection
  if (!profile?.role) {
    return <Navigate to="/select-role" replace />;
  }

  // Has role but profile not complete - redirect to profile creation
  if (!profile?.profile_completed) {
    return <Navigate to="/create-profile" replace />;
  }

  // Profile complete - redirect to dashboard
  return <Navigate to="/dashboard" replace />;
}