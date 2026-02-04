import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useBrandRfqs } from "@/hooks/useBrandRfqs";
import { RfqStatusBadge } from "@/components/brand/RfqStatusBadge";
import { 
  Building2, 
  FileText,
  Factory,
  Plus,
  ArrowRight,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface BrandProfile {
  brandName: string;
  industry: string;
}

export default function BrandDashboard() {
  const { user, profile: authProfile } = useFirebaseAuth();
  const [profile, setProfile] = useState<BrandProfile | null>(null);
  const { rfqs, loading: rfqsLoading } = useBrandRfqs(user?.uid);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const profileDoc = await getDoc(doc(db, "brandProfiles", user.uid));
        if (profileDoc.exists()) {
          const data = profileDoc.data();
          setProfile({
            brandName: data.brandName,
            industry: data.industry,
          });
        }
      } catch (error) {
        console.error("Error fetching brand profile:", error);
      }
    };

    fetchProfile();
  }, [user]);

  // Calculate stats from real data
  const sentRfqs = rfqs.filter((r) => r.status !== "draft").length;
  const draftRfqs = rfqs.filter((r) => r.status === "draft").length;
  const respondedRfqs = rfqs.filter((r) => ["responded", "accepted", "completed"].includes(r.status)).length;

  const stats = [
    { label: "Sent RFQs", value: sentRfqs.toString(), icon: FileText },
    { label: "Drafts", value: draftRfqs.toString(), icon: FileText },
    { label: "Responses", value: respondedRfqs.toString(), icon: FileText },
  ];

  // Get recent RFQs (up to 5)
  const recentRfqs = rfqs.slice(0, 5);

  return (
    <DashboardLayout>
      <div className="flex flex-col xl:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1 space-y-8">
          {/* Welcome section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Welcome back, {profile?.brandName || authProfile?.email?.split("@")[0] || "User"}!
              </h1>
              <p className="mt-1 text-muted-foreground">
                Here's a summary of your manufacturer partnerships.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link to="/brand/manufacturers">
                  <Search className="mr-2 h-4 w-4" />
                  Find Manufacturers
                </Link>
              </Button>
              <Button asChild>
                <Link to="/brand/rfqs/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Create RFQ
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="stat-card">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent RFQs */}
          <div className="bg-card rounded-xl border shadow-sm">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Recent RFQs</h2>
              <Button variant="link" asChild className="p-0 h-auto">
                <Link to="/brand/rfqs">
                  View All
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            {rfqsLoading ? (
              <div className="p-6 text-center text-muted-foreground">
                Loading...
              </div>
            ) : recentRfqs.length === 0 ? (
              <div className="p-8 text-center">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 font-semibold text-foreground">No RFQs Yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Start by finding manufacturers and creating your first RFQ
                </p>
                <Button asChild className="mt-4">
                  <Link to="/brand/manufacturers">
                    Browse Manufacturers
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {recentRfqs.map((rfq) => (
                  <div key={rfq.id} className="flex items-center justify-between p-4 hover:bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{rfq.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {rfq.manufacturerName} • {rfq.category || "No category"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <RfqStatusBadge status={rfq.status} />
                      <Button variant="ghost" size="sm" asChild>
                        <Link to="/brand/rfqs">View</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile summary */}
          <div className="form-section">
            <h2 className="text-lg font-semibold text-foreground">Your Profile</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <span className="text-sm text-muted-foreground">Brand Name</span>
                <p className="font-medium text-foreground">{profile?.brandName || "-"}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Industry</span>
                <p className="font-medium text-foreground">{profile?.industry || "-"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-full xl:w-80 space-y-6">
          {/* Quick Actions */}
          <div className="bg-card rounded-xl border shadow-sm p-6">
            <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/brand/manufacturers">
                  <Factory className="mr-3 h-4 w-4 text-manufacturer" />
                  Browse Manufacturers
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/brand/rfqs/create">
                  <Plus className="mr-3 h-4 w-4 text-primary" />
                  Create New RFQ
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/brand/rfqs">
                  <FileText className="mr-3 h-4 w-4 text-primary" />
                  View All RFQs
                </Link>
              </Button>
            </div>
          </div>

          {/* Getting Started Guide */}
          <div className="bg-primary/5 rounded-xl border border-primary/20 p-6">
            <h3 className="font-semibold text-foreground mb-3">Getting Started</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Browse Manufacturers</p>
                  <p className="text-muted-foreground">Find the right partner for your products</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Create an RFQ</p>
                  <p className="text-muted-foreground">Specify your requirements and send requests</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Review Responses</p>
                  <p className="text-muted-foreground">Compare quotes and choose your manufacturer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
