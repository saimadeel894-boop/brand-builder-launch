import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useManufacturerProfile } from "@/hooks/useManufacturerProfile";
import { useProducts } from "@/hooks/useProducts";
import { useRfqs } from "@/hooks/useRfqs";
import { 
  Package, 
  FileText, 
  CheckCircle, 
  Mail, 
  AlertCircle,
  ArrowRight,
  Plus,
  Edit,
  Eye
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ManufacturerDashboard() {
  const { profile: authProfile } = useFirebaseAuth();
  const { profile, loading: profileLoading } = useManufacturerProfile();
  const { products, loading: productsLoading } = useProducts(profile?.id);
  const { rfqs, loading: rfqsLoading } = useRfqs(profile?.id);

  const pendingRfqs = rfqs.filter(r => r.status === "pending" || r.status === "in_review");

  const stats = [
    { 
      label: "Products", 
      value: products.length.toString(), 
      icon: Package,
      href: "/manufacturer/products",
      color: "text-blue-600 bg-blue-100"
    },
    { 
      label: "Pending RFQs", 
      value: pendingRfqs.length.toString(), 
      icon: FileText,
      href: "/manufacturer/rfqs",
      color: "text-yellow-600 bg-yellow-100"
    },
    { 
      label: "Total RFQs", 
      value: rfqs.length.toString(), 
      icon: Mail,
      href: "/manufacturer/rfqs",
      color: "text-green-600 bg-green-100"
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case "in_review":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">In Review</Badge>;
      case "accepted":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Accepted</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
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
              Welcome back, {profile?.companyName || authProfile?.email?.split("@")[0] || "User"}!
            </h1>
            <p className="mt-1 text-muted-foreground">
              Here's a summary of your products and incoming requests.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Link key={stat.label} to={stat.href}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${stat.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                          <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Recent RFQs */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent RFQs</CardTitle>
              <Link to="/manufacturer/rfqs">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {rfqsLoading ? (
                <p className="text-muted-foreground">Loading...</p>
              ) : rfqs.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">No RFQs received yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Title</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Brand</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {rfqs.slice(0, 5).map((rfq) => (
                        <tr key={rfq.id} className="hover:bg-secondary/50">
                          <td className="px-4 py-3 text-sm font-medium text-foreground">{rfq.title}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{rfq.brandName}</td>
                          <td className="px-4 py-3">{getStatusBadge(rfq.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Products */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Products</CardTitle>
              <Link to="/manufacturer/products">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {productsLoading ? (
                <p className="text-muted-foreground">Loading...</p>
              ) : products.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">No products added yet</p>
                  <Link to="/manufacturer/products">
                    <Button className="mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Your First Product
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {products.slice(0, 6).map((product) => (
                    <div key={product.id} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                      <div className="h-12 w-12 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
                        {product.images.length > 0 ? (
                          <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <Package className="h-6 w-6 text-muted-foreground/50" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right sidebar */}
        <div className="w-full xl:w-80 space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/manufacturer/products" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Product
                </Button>
              </Link>
              <Link to="/manufacturer/profile" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </Link>
              <Link to="/manufacturer/rfqs" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="mr-2 h-4 w-4" />
                  View RFQs
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Profile Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profile Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-sm text-muted-foreground">Company Name</span>
                <p className="font-medium text-foreground">{profile?.companyName || "-"}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">MOQ</span>
                <p className="font-medium text-foreground">{profile?.moq || "Not set"}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Lead Time</span>
                <p className="font-medium text-foreground">{profile?.leadTime || "Not set"}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Categories</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {profile?.categories?.length ? (
                    profile.categories.slice(0, 3).map((cat, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">{cat}</Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground text-sm">None added</span>
                  )}
                  {(profile?.categories?.length || 0) > 3 && (
                    <Badge variant="secondary" className="text-xs">+{profile!.categories.length - 3}</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
