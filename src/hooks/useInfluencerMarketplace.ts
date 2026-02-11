import { useState, useEffect } from "react";
import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";
import { getCampaigns, Campaign } from "@/services/firestore/campaigns";
import { getWhiteLabelOffers, WhiteLabelOffer } from "@/services/firestore/whiteLabelOffers";
import {
  getApplicationsByInfluencer,
  createApplication,
  Application,
  ApplicationType,
} from "@/services/firestore/applications";

export function useInfluencerMarketplace() {
  const { user } = useFirebaseAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [whiteLabelOffers, setWhiteLabelOffers] = useState<WhiteLabelOffer[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      const [campaignData, offerData, appData] = await Promise.all([
        getCampaigns(),
        getWhiteLabelOffers(),
        getApplicationsByInfluencer(user.uid),
      ]);

      setCampaigns(campaignData.sort((a, b) =>
        (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
      ));
      setWhiteLabelOffers(offerData.sort((a, b) =>
        (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
      ));
      setApplications(appData.sort((a, b) =>
        (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
      ));
    } catch (err) {
      console.error("Error fetching marketplace data:", err);
      setError("Failed to load marketplace data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const applyToOpportunity = async (
    targetId: string,
    targetType: ApplicationType,
    targetTitle: string,
    message?: string
  ) => {
    if (!user) return { error: new Error("Not authenticated") };

    setApplying(true);
    try {
      const result = await createApplication({
        influencerId: user.uid,
        targetId,
        targetType,
        targetTitle,
        status: "pending",
        message,
      });

      if (!result.error) {
        await fetchData(); // Refresh applications list
      }

      return result;
    } finally {
      setApplying(false);
    }
  };

  const hasApplied = (targetId: string) => {
    return applications.some((app) => app.targetId === targetId);
  };

  const getApplicationStatus = (targetId: string) => {
    return applications.find((app) => app.targetId === targetId)?.status;
  };

  return {
    campaigns,
    whiteLabelOffers,
    applications,
    loading,
    applying,
    error,
    applyToOpportunity,
    hasApplied,
    getApplicationStatus,
    refresh: fetchData,
  };
}
