import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireRole?: boolean;
  requireProfile?: boolean;
}

export function ProtectedRoute({
  children,
  requireRole = false,
  requireProfile = false,
}: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Not logged in - redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in but no role - redirect to role selection
  if (requireRole && !profile?.role) {
    return <Navigate to="/select-role" replace />;
  }

  // Has role but profile not complete - redirect to profile creation
  if (requireProfile && profile?.role && !profile?.profile_completed) {
    return <Navigate to="/create-profile" replace />;
  }

  return <>{children}</>;
}