import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, Users, Eye, DollarSign, ArrowUpRight, ArrowDownRight, Activity, Calendar } from "lucide-react";

export default function Analytics() {
  const metrics = [
    { label: "Profile Views", value: "1,284", change: "+18%", up: true, icon: Eye },
    { label: "Total Connections", value: "47", change: "+5", up: true, icon: Users },
    { label: "Revenue Pipeline", value: "$124K", change: "+32%", up: true, icon: DollarSign },
    { label: "Response Rate", value: "89%", change: "-2%", up: false, icon: Activity },
  ];

  const topProducts = [
    { name: "Hyaluronic Serum", views: 342, inquiries: 28, conversion: 8.2 },
    { name: "Retinol Night Cream", views: 287, inquiries: 19, conversion: 6.6 },
    { name: "Vitamin C Brightener", views: 256, inquiries: 22, conversion: 8.6 },
    { name: "Peptide Eye Cream", views: 198, inquiries: 15, conversion: 7.6 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Track your platform performance and engagement</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="h-4 w-4" />
              Last 30 Days
            </Button>
            <Button variant="outline" size="sm">Export</Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.label}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{metric.value}</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    {metric.up ? (
                      <ArrowUpRight className="h-3 w-3 text-manufacturer" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-destructive" />
                    )}
                    <span className={`text-xs font-medium ${metric.up ? "text-manufacturer" : "text-destructive"}`}>{metric.change}</span>
                    <span className="text-xs text-muted-foreground">vs last period</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Activity Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Activity Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 rounded-lg bg-secondary/30 flex items-center justify-center border border-dashed border-border">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-muted-foreground/30 mx-auto" />
                  <p className="mt-2 text-sm text-muted-foreground">Interactive charts</p>
                  <p className="text-xs text-muted-foreground">Coming in next update</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Products</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topProducts.map((product) => (
                <div key={product.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{product.name}</p>
                    <Badge variant="outline" className="text-xs">{product.conversion}% conv.</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{product.views} views</span>
                    <span>{product.inquiries} inquiries</span>
                  </div>
                  <Progress value={product.conversion * 10} className="h-1.5" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Engagement Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Engagement Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 rounded-lg bg-secondary/30 flex items-center justify-center border border-dashed border-border">
              <div className="text-center">
                <Activity className="h-12 w-12 text-muted-foreground/30 mx-auto" />
                <p className="mt-2 text-sm text-muted-foreground">Real-time engagement tracking</p>
                <p className="text-xs text-muted-foreground">Coming in next update</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
