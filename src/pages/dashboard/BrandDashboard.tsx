import { useEffect, useState } from "react";
import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { 
  Building2, 
  CheckCircle, 
  Mail, 
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BrandProfile {
  brandName: string;
  industry: string;
}

// Mock data for demonstration
const mockCollaborations = [
  { id: 1, name: "Summer Collection Campaign", collaborator: "Pure Labs Mfg.", status: "In Progress", dueDate: "2024-08-20" },
  { id: 2, name: "Influencer Partnership Q3", collaborator: "Sarah Jenkins", status: "Review", dueDate: "2024-08-01" },
  { id: 3, name: "New Product Launch", collaborator: "GreenT Formulators", status: "Completed", dueDate: "2024-07-15" },
];

const mockActivityFeed = [
  { id: 1, type: "success", message: "Campaign 'Summer Collection' approved.", time: "1 hour ago", icon: CheckCircle },
  { id: 2, type: "message", message: "New quote from Pure Labs Mfg.", time: "3 hours ago", icon: Mail },
  { id: 3, type: "request", message: "Sarah Jenkins wants to collaborate.", time: "1 day ago", icon: AlertCircle },
];

const mockTasks = [
  { id: 1, name: "Review influencer proposals", due: "Today" },
  { id: 2, name: "Finalize Q3 budget", due: "2024-08-05" },
];

export default function BrandDashboard() {
  const { user, profile: authProfile } = useFirebaseAuth();
  const [profile, setProfile] = useState<BrandProfile | null>(null);

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

  const stats = [
    { label: "Active Campaigns", value: "8", change: "+12%", changeType: "positive" },
    { label: "Unread Messages", value: "3", change: "+2%", changeType: "positive" },
    { label: "Pending Approvals", value: "5", change: "-1%", changeType: "neutral" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Progress":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">In Progress</Badge>;
      case "Completed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case "Review":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Review</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col xl:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1 space-y-8">
          {/* Welcome section */}
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Welcome back, {profile?.brandName || authProfile?.email?.split("@")[0] || "User"}!
            </h1>
            <p className="mt-1 text-muted-foreground">
              Here's a summary of your campaigns and partnerships.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">{stat.value}</span>
                  <span className={`text-sm ${stat.changeType === "positive" ? "text-success" : "text-muted-foreground"}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Ongoing Collaborations */}
          <div className="bg-card rounded-xl border shadow-sm">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Ongoing Campaigns</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Campaign Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Partner</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Due Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {mockCollaborations.map((collab) => (
                    <tr key={collab.id} className="hover:bg-secondary/50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{collab.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{collab.collaborator}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(collab.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{collab.dueDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <Button variant="link" className="text-primary p-0 h-auto">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
          {/* Activity Feed */}
          <div className="bg-card rounded-xl border shadow-sm p-6">
            <h3 className="font-semibold text-foreground mb-4">Activity Feed</h3>
            <div className="space-y-4">
              {mockActivityFeed.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex gap-3">
                    <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                      activity.type === "success" ? "bg-green-100" :
                      activity.type === "message" ? "bg-blue-100" :
                      "bg-yellow-100"
                    }`}>
                      <Icon className={`h-4 w-4 ${
                        activity.type === "success" ? "text-green-600" :
                        activity.type === "message" ? "text-blue-600" :
                        "text-yellow-600"
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="bg-card rounded-xl border shadow-sm p-6">
            <h3 className="font-semibold text-foreground mb-4">Pending Tasks</h3>
            <div className="space-y-3">
              {mockTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-foreground">{task.name}</p>
                    <p className="text-xs text-muted-foreground">Due: {task.due}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
