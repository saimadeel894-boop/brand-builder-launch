import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Factory,
  Building2,
  Users,
  MessageSquare,
  HelpCircle,
  Diamond,
  TrendingUp,
  Plus,
  Package,
  FileText,
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const getRoleIcon = () => {
    switch (profile?.role) {
      case "manufacturer":
        return Factory;
      case "brand":
        return Building2;
      case "influencer":
        return Users;
      default:
        return LayoutDashboard;
    }
  };

  const getRoleLabel = () => {
    switch (profile?.role) {
      case "manufacturer":
        return "Manufacturer";
      case "brand":
        return "Brand";
      case "influencer":
        return "Influencer";
      default:
        return "User";
    }
  };

  const getNavigation = () => {
    const baseNav = [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    ];

    switch (profile?.role) {
      case "manufacturer":
        return [
          ...baseNav,
          { name: "Products", href: "/manufacturer/products", icon: Package },
          { name: "My Profile", href: "/manufacturer/profile", icon: Factory },
          { name: "RFQs", href: "/manufacturer/rfqs", icon: FileText },
          { name: "Messages", href: "/messages", icon: MessageSquare, disabled: true },
          { name: "Analytics", href: "/analytics", icon: TrendingUp, disabled: true },
        ];
      case "brand":
        return [
          ...baseNav,
          { name: "Collaborations", href: "/collaborations", icon: Diamond, disabled: true },
          { name: "Messages", href: "/messages", icon: MessageSquare, disabled: true },
          { name: "Manufacturers", href: "/manufacturers", icon: Factory, disabled: true },
          { name: "Influencers", href: "/influencers", icon: Users, disabled: true },
          { name: "Analytics", href: "/analytics", icon: TrendingUp, disabled: true },
        ];
      case "influencer":
        return [
          ...baseNav,
          { name: "Collaborations", href: "/collaborations", icon: Diamond, disabled: true },
          { name: "Messages", href: "/messages", icon: MessageSquare, disabled: true },
          { name: "Brands", href: "/brands", icon: Building2, disabled: true },
          { name: "Analytics", href: "/analytics", icon: TrendingUp, disabled: true },
        ];
      default:
        return baseNav;
    }
  };

  const navigation = getNavigation();
  const RoleIcon = getRoleIcon();

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-sidebar border-r border-sidebar-border transition-transform duration-200 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">BC</span>
            </div>
            <span className="font-semibold text-sidebar-foreground">BeautyChain</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + "/");
              const isDisabled = (item as any).disabled === true;

              return (
                <Link
                  key={item.name}
                  to={isDisabled ? "#" : item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : isDisabled
                      ? "text-sidebar-foreground/50 cursor-not-allowed"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                  )}
                  onClick={(e) => {
                    if (isDisabled) e.preventDefault();
                    setSidebarOpen(false);
                  }}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Settings */}
          <div className="border-t border-sidebar-border px-3 py-4">
            <Link
              to="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/50 cursor-not-allowed"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </div>

          {/* User section */}
          <div className="border-t border-sidebar-border p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-accent">
                <RoleIcon className="h-5 w-5 text-sidebar-accent-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-sidebar-foreground">
                  {profile?.email?.split("@")[0] || "User"}
                </p>
                <p className="text-xs text-muted-foreground truncate">{profile?.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50"
              onClick={handleSignOut}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background px-4 sm:px-6">
          <button
            className="text-foreground lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Search */}
          <div className="flex-1">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search collaborations, messages..."
                className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <HelpCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
            </Button>
            <Button className="hidden sm:flex gap-2">
              <Plus className="h-4 w-4" />
              Start New Collaboration
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl page-transition">{children}</div>
        </main>
      </div>

      {/* Mobile close button */}
      {sidebarOpen && (
        <button
          className="fixed right-4 top-4 z-50 rounded-full bg-background p-2 shadow-lg lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}