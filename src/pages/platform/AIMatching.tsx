import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Zap, Target, TrendingUp, Brain, Beaker, ArrowRight } from "lucide-react";

const matchSuggestions = [
  { name: "LuxeFormula Labs", match: 96, categories: ["Skincare", "Anti-Aging"], location: "Seoul, South Korea", highlight: "Peptide specialist" },
  { name: "GreenLeaf Cosmetics", match: 91, categories: ["Organic", "Body Care"], location: "Portland, OR", highlight: "USDA Organic certified" },
  { name: "Crystal Beauty MFG", match: 88, categories: ["Makeup", "Sun Care"], location: "Shenzhen, China", highlight: "Large-scale production" },
  { name: "Nordic Naturals Lab", match: 85, categories: ["Haircare", "Fragrance"], location: "Stockholm, Sweden", highlight: "Clean beauty focus" },
];

const trendingIngredients = [
  { name: "Bakuchiol", trend: "+340%", category: "Anti-Aging" },
  { name: "Niacinamide", trend: "+180%", category: "Brightening" },
  { name: "Centella Asiatica", trend: "+220%", category: "Soothing" },
  { name: "Squalane", trend: "+150%", category: "Moisturizing" },
];

export default function AIMatching() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">AI Matching & Formulation</h1>
                <p className="text-sm text-muted-foreground">Powered by BeautyChain AI Lab</p>
              </div>
            </div>
          </div>
          <Button className="gap-2">
            <Brain className="h-4 w-4" />
            Run New Analysis
          </Button>
        </div>

        {/* AI Insights Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Match Score Avg", value: "92%", icon: Target, color: "text-primary" },
            { label: "Formulations Analyzed", value: "1,247", icon: Beaker, color: "text-manufacturer" },
            { label: "Trend Predictions", value: "38", icon: TrendingUp, color: "text-influencer" },
            { label: "Active Matches", value: "12", icon: Zap, color: "text-warning" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </div>
                  <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* AI Match Suggestions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI-Recommended Matches
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {matchSuggestions.map((match) => (
                  <div key={match.name} className="flex items-center justify-between p-4 rounded-lg border bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold text-foreground">{match.name}</h4>
                        <Badge variant="outline" className="text-xs">{match.highlight}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{match.location}</p>
                      <div className="flex gap-1 mt-2">
                        {match.categories.map((c) => (
                          <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-2xl font-bold text-primary">{match.match}%</div>
                      <Progress value={match.match} className="w-20 mt-1" />
                      <Button variant="ghost" size="sm" className="mt-2">
                        View <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Trending Ingredients */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-manufacturer" />
                Trending Ingredients
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {trendingIngredients.map((ingredient) => (
                <div key={ingredient.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <div>
                    <p className="font-medium text-foreground text-sm">{ingredient.name}</p>
                    <p className="text-xs text-muted-foreground">{ingredient.category}</p>
                  </div>
                  <Badge className="bg-manufacturer/10 text-manufacturer border-manufacturer/20">{ingredient.trend}</Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2" size="sm">
                View All Trends
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Formulation Canvas CTA */}
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Beaker className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Formulation Canvas</h3>
                  <p className="text-sm text-muted-foreground">Design custom product formulations with AI-assisted ingredient selection</p>
                </div>
              </div>
              <Button>
                Open Canvas <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
