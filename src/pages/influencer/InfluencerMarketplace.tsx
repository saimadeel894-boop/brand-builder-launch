import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useInfluencerMarketplace } from "@/hooks/useInfluencerMarketplace";
import { CampaignCard } from "@/components/influencer/CampaignCard";
import { WhiteLabelCard } from "@/components/influencer/WhiteLabelCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileText, Megaphone, Package, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function InfluencerMarketplace() {
  const {
    campaigns,
    whiteLabelOffers,
    applications,
    loading,
    applying,
    error,
    applyToOpportunity,
    hasApplied,
    getApplicationStatus,
  } = useInfluencerMarketplace();
  const { toast } = useToast();

  const handleApply = async (
    targetId: string,
    targetTitle: string,
    message?: string,
    type: "campaign" | "whiteLabelOffer" = "campaign"
  ) => {
    const result = await applyToOpportunity(targetId, type, targetTitle, message);
    if (result.error) {
      toast({
        title: "Application failed",
        description: result.error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Application submitted!",
        description: `Your application to "${targetTitle}" has been sent.`,
      });
    }
    return result;
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <h2 className="text-lg font-semibold text-foreground mb-2">Something went wrong</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Collaboration Marketplace</h1>
          <p className="mt-1 text-muted-foreground">
            Discover campaigns, white-label opportunities, and RFQs.
          </p>
        </div>

        <Tabs defaultValue="campaigns" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="campaigns" className="flex items-center gap-2">
              <Megaphone className="h-4 w-4" />
              Campaigns
              {campaigns.length > 0 && (
                <Badge variant="secondary" className="ml-1">{campaigns.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="white-label" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              White-Label
              {whiteLabelOffers.length > 0 && (
                <Badge variant="secondary" className="ml-1">{whiteLabelOffers.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="rfqs" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              RFQs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="mt-6">
            {campaigns.length === 0 ? (
              <EmptyState
                icon={Megaphone}
                title="No campaigns available"
                description="Check back later for new influencer campaigns from brands."
              />
            ) : (
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <CampaignCard
                    key={campaign.id}
                    id={campaign.id}
                    title={campaign.title}
                    brandName={campaign.brandName}
                    description={campaign.description}
                    category={campaign.category}
                    budget={campaign.budget}
                    deadline={campaign.deadline}
                    requirements={campaign.requirements}
                    hasApplied={hasApplied(campaign.id)}
                    applicationStatus={getApplicationStatus(campaign.id)}
                    onApply={(id, title, msg) => handleApply(id, title, msg, "campaign")}
                    applying={applying}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="white-label" className="mt-6">
            {whiteLabelOffers.length === 0 ? (
              <EmptyState
                icon={Package}
                title="No white-label offers available"
                description="Check back later for new white-label opportunities from manufacturers."
              />
            ) : (
              <div className="space-y-4">
                {whiteLabelOffers.map((offer) => (
                  <WhiteLabelCard
                    key={offer.id}
                    id={offer.id}
                    title={offer.title}
                    manufacturerName={offer.manufacturerName}
                    description={offer.description}
                    category={offer.category}
                    moq={offer.moq}
                    priceRange={offer.priceRange}
                    hasApplied={hasApplied(offer.id)}
                    applicationStatus={getApplicationStatus(offer.id)}
                    onApply={(id, title, msg) => handleApply(id, title, msg, "whiteLabelOffer")}
                    applying={applying}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="rfqs" className="mt-6">
            <EmptyState
              icon={FileText}
              title="RFQ visibility coming soon"
              description="You'll be able to view relevant RFQs here in a future update."
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="rounded-full bg-secondary p-4 mb-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm">{description}</p>
    </div>
  );
}
