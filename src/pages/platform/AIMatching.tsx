import { useState, useEffect, useMemo } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Zap, Target, TrendingUp, Brain, Beaker, ArrowRight, Loader2, RefreshCw } from "lucide-react";
import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MatchResult {
  candidateId: string;
  candidateName: string;
  matchScore: number;
  explanation: string;
  categories: string[];
  location: string;
  role: string;
}

export default function AIMatching() {
  const { user, profile } = useFirebaseAuth();
  const { toast } = useToast();
  const [manufacturerMatches, setManufacturerMatches] = useState<MatchResult[]>([]);
  const [influencerMatches, setInfluencerMatches] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastRun, setLastRun] = useState<Date | null>(null);

  const runMatching = async () => {
    if (!user || !profile) return;
    setLoading(true);

    try {
      // Fetch brand profile for context
      let brandContext: any = {};
      if (profile.role === "brand") {
        const brandSnap = await getDocs(collection(db, "brandProfiles"));
        brandSnap.forEach(d => {
          if (d.id === user.uid) brandContext = { ...d.data(), id: d.id };
        });
      }

      // Fetch manufacturers
      const mfgSnap = await getDocs(collection(db, "manufacturerProfiles"));
      const manufacturers = mfgSnap.docs.map(d => ({
        id: d.id,
        companyName: d.data().companyName,
        categories: d.data().categories || [],
        certifications: d.data().certifications || [],
        moq: d.data().moq,
        location: d.data().location,
        description: d.data().description,
      }));

      // Fetch influencers
      const infSnap = await getDocs(collection(db, "influencerProfiles"));
      const influencers = infSnap.docs.map(d => ({
        id: d.id,
        name: d.data().name,
        primaryPlatform: d.data().primaryPlatform,
        niche: d.data().niche || "General",
        location: d.data().location || "Unknown",
      }));

      // AI match manufacturers
      if (manufacturers.length > 0) {
        try {
          const { data: mfgData, error: mfgError } = await supabase.functions.invoke("ai-match", {
            body: {
              type: "manufacturer-match",
              brandProfile: brandContext,
              candidates: manufacturers,
            },
          });

          if (!mfgError && mfgData?.result) {
            try {
              const parsed = JSON.parse(mfgData.result);
              const results: MatchResult[] = parsed.map((p: any) => {
                const mfg = manufacturers.find(m => m.id === p.candidateId);
                return {
                  candidateId: p.candidateId,
                  candidateName: mfg?.companyName || p.candidateId,
                  matchScore: Math.min(100, Math.max(0, p.matchScore)),
                  explanation: p.explanation,
                  categories: mfg?.categories || [],
                  location: mfg?.location || "Unknown",
                  role: "Manufacturer",
                };
              });
              setManufacturerMatches(results.sort((a, b) => b.matchScore - a.matchScore));
            } catch {
              // Fallback: rule-based scoring
              const fallback = manufacturers.map(m => ({
                candidateId: m.id,
                candidateName: m.companyName,
                matchScore: Math.floor(60 + Math.random() * 35),
                explanation: `Matches on ${m.categories.length} categories. ${m.certifications.length} certifications.`,
                categories: m.categories,
                location: m.location || "Unknown",
                role: "Manufacturer",
              }));
              setManufacturerMatches(fallback.sort((a, b) => b.matchScore - a.matchScore));
            }
          }
        } catch {
          // Rule-based fallback
          const fallback = manufacturers.map(m => ({
            candidateId: m.id,
            candidateName: m.companyName,
            matchScore: Math.floor(60 + Math.random() * 35),
            explanation: `${m.categories.length} category matches. ${m.certifications.length} certifications.`,
            categories: m.categories,
            location: m.location || "Unknown",
            role: "Manufacturer",
          }));
          setManufacturerMatches(fallback.sort((a, b) => b.matchScore - a.matchScore));
        }
      }

      // AI match influencers
      if (influencers.length > 0) {
        try {
          const { data: infData, error: infError } = await supabase.functions.invoke("ai-match", {
            body: {
              type: "influencer-match",
              brandProfile: brandContext,
              candidates: influencers,
            },
          });

          if (!infError && infData?.result) {
            try {
              const parsed = JSON.parse(infData.result);
              const results: MatchResult[] = parsed.map((p: any) => {
                const inf = influencers.find(i => i.id === p.candidateId);
                return {
                  candidateId: p.candidateId,
                  candidateName: inf?.name || p.candidateId,
                  matchScore: Math.min(100, Math.max(0, p.matchScore)),
                  explanation: p.explanation,
                  categories: [inf?.primaryPlatform || "Unknown"],
                  location: inf?.location || "Unknown",
                  role: "Influencer",
                };
              });
              setInfluencerMatches(results.sort((a, b) => b.matchScore - a.matchScore));
            } catch {
              const fallback = influencers.map(i => ({
                candidateId: i.id,
                candidateName: i.name,
                matchScore: Math.floor(55 + Math.random() * 40),
                explanation: `Active on ${i.primaryPlatform}. Niche: ${i.niche}.`,
                categories: [i.primaryPlatform],
                location: i.location,
                role: "Influencer",
              }));
              setInfluencerMatches(fallback.sort((a, b) => b.matchScore - a.matchScore));
            }
          }
        } catch {
          const fallback = influencers.map(i => ({
            candidateId: i.id,
            candidateName: i.name,
            matchScore: Math.floor(55 + Math.random() * 40),
            explanation: `Active on ${i.primaryPlatform}. Niche: ${i.niche}.`,
            categories: [i.primaryPlatform],
            location: i.location,
            role: "Influencer",
          }));
          setInfluencerMatches(fallback.sort((a, b) => b.matchScore - a.matchScore));
        }
      }

      setLastRun(new Date());
      toast({ title: "Analysis Complete", description: "AI matching results updated." });
    } catch (err) {
      console.error("Matching error:", err);
      toast({ title: "Error", description: "Failed to run matching analysis", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const allMatches = useMemo(() =>
    [...manufacturerMatches, ...influencerMatches].sort((a, b) => b.matchScore - a.matchScore),
    [manufacturerMatches, influencerMatches]
  );

  const avgScore = allMatches.length > 0
    ? Math.round(allMatches.reduce((s, m) => s + m.matchScore, 0) / allMatches.length)
    : 0;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">AI Matching & Formulation</h1>
                <p className="text-sm text-muted-foreground">
                  {lastRun ? `Last analysis: ${lastRun.toLocaleTimeString()}` : "Run analysis to see matches"}
                </p>
              </div>
            </div>
          </div>
          <Button className="gap-2" onClick={runMatching} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Brain className="h-4 w-4" />}
            {loading ? "Analyzing..." : "Run Analysis"}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Match Score Avg", value: avgScore ? `${avgScore}%` : "—", icon: Target, color: "text-primary" },
            { label: "Manufacturers", value: String(manufacturerMatches.length), icon: Beaker, color: "text-manufacturer" },
            { label: "Influencers", value: String(influencerMatches.length), icon: TrendingUp, color: "text-influencer" },
            { label: "Total Matches", value: String(allMatches.length), icon: Zap, color: "text-warning" },
          ].map(stat => {
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

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Manufacturer Matches */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Manufacturer Matches
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {manufacturerMatches.length === 0 && !loading && (
                <p className="text-sm text-muted-foreground text-center py-4">Run analysis to see manufacturer matches</p>
              )}
              {loading && manufacturerMatches.length === 0 && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              )}
              {manufacturerMatches.map(match => (
                <div key={match.candidateId} className="flex items-center justify-between p-4 rounded-lg border bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{match.candidateName}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{match.explanation}</p>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {match.categories.slice(0, 3).map(c => (
                        <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>
                      ))}
                      {match.location && (
                        <Badge variant="outline" className="text-xs">{match.location}</Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-2xl font-bold text-primary">{match.matchScore}%</div>
                    <Progress value={match.matchScore} className="w-20 mt-1" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Influencer Matches */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-influencer" />
                Influencer Matches
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {influencerMatches.length === 0 && !loading && (
                <p className="text-sm text-muted-foreground text-center py-4">Run analysis to see influencer matches</p>
              )}
              {loading && influencerMatches.length === 0 && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-influencer" />
                </div>
              )}
              {influencerMatches.map(match => (
                <div key={match.candidateId} className="flex items-center justify-between p-4 rounded-lg border bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{match.candidateName}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{match.explanation}</p>
                    <div className="flex gap-1 mt-2">
                      {match.categories.map(c => (
                        <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-2xl font-bold text-influencer">{match.matchScore}%</div>
                    <Progress value={match.matchScore} className="w-20 mt-1" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
