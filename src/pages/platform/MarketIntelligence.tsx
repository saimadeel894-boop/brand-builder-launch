import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, TrendingUp, BarChart3, MapPin, Zap, ArrowUpRight, Newspaper } from "lucide-react";

const trends = [
  { name: "Clean Beauty", growth: "+28%", region: "Global", status: "Rising" },
  { name: "K-Beauty Innovation", growth: "+42%", region: "Asia Pacific", status: "Surging" },
  { name: "Waterless Formulations", growth: "+35%", region: "Europe", status: "Rising" },
  { name: "Microbiome Skincare", growth: "+52%", region: "North America", status: "Surging" },
  { name: "Sustainable Packaging", growth: "+31%", region: "Global", status: "Rising" },
  { name: "Personalized Beauty", growth: "+44%", region: "North America", status: "Surging" },
];

const marketNews = [
  { title: "Global beauty market projected to reach $580B by 2027", source: "McKinsey", time: "2h ago" },
  { title: "Clean beauty segment sees 30% YoY growth in APAC", source: "Euromonitor", time: "5h ago" },
  { title: "New EU regulations on cosmetic ingredient transparency", source: "EU Commission", time: "1d ago" },
  { title: "Rise of AI-driven personalization in skincare", source: "Vogue Business", time: "2d ago" },
];

const regions = [
  { name: "North America", marketSize: "$98B", growth: "+5.2%", topCategory: "Skincare" },
  { name: "Asia Pacific", marketSize: "$145B", growth: "+8.7%", topCategory: "K-Beauty" },
  { name: "Europe", marketSize: "$102B", growth: "+4.1%", topCategory: "Organic" },
  { name: "Middle East", marketSize: "$32B", growth: "+11.3%", topCategory: "Fragrance" },
];

export default function MarketIntelligence() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Market Intelligence & Global Trends</h1>
          <p className="text-muted-foreground">Stay ahead with real-time beauty industry insights</p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Global Market Size", value: "$430B", icon: Globe },
            { label: "YoY Growth", value: "6.8%", icon: TrendingUp },
            { label: "Active Trends", value: "24", icon: Zap },
            { label: "Markets Tracked", value: "42", icon: MapPin },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Trending Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Trending Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {trends.map((trend) => (
                <div key={trend.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <div>
                    <p className="font-medium text-foreground text-sm">{trend.name}</p>
                    <p className="text-xs text-muted-foreground">{trend.region}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={trend.status === "Surging" ? "default" : "secondary"}>{trend.status}</Badge>
                    <span className="text-sm font-semibold text-manufacturer flex items-center">
                      {trend.growth} <ArrowUpRight className="h-3 w-3 ml-0.5" />
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Industry News */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Newspaper className="h-5 w-5 text-primary" />
                Industry News
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {marketNews.map((news) => (
                <div key={news.title} className="p-3 rounded-lg border hover:bg-secondary/30 transition-colors cursor-pointer">
                  <p className="text-sm font-medium text-foreground">{news.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">{news.source}</Badge>
                    <span className="text-xs text-muted-foreground">{news.time}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Regional Markets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Regional Market Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {regions.map((region) => (
                <div key={region.name} className="p-4 rounded-lg border bg-secondary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold text-foreground text-sm">{region.name}</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Market Size</span>
                      <span className="font-medium text-foreground">{region.marketSize}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Growth</span>
                      <span className="font-medium text-manufacturer">{region.growth}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Top Category</span>
                      <Badge variant="secondary" className="text-xs">{region.topCategory}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
