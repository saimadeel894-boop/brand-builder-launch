import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Rfq {
  id: string;
  brand_id: string;
  manufacturer_id: string;
  title: string;
  description: string | null;
  category: string | null;
  quantity: string | null;
  budget: string | null;
  deadline: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  brand_name?: string;
}

export function useRfqs(manufacturerId: string | undefined) {
  const { toast } = useToast();
  const [rfqs, setRfqs] = useState<Rfq[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRfqs = useCallback(async () => {
    if (!manufacturerId) return;

    try {
      const { data, error } = await supabase
        .from("rfqs")
        .select(`
          *,
          brand_profiles (
            brand_name
          )
        `)
        .eq("manufacturer_id", manufacturerId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const rfqsWithBrandName = (data || []).map((rfq: any) => ({
        ...rfq,
        brand_name: rfq.brand_profiles?.brand_name || "Unknown Brand",
      }));

      setRfqs(rfqsWithBrandName);
    } catch (error: any) {
      console.error("Error fetching RFQs:", error);
      toast({
        title: "Error",
        description: "Failed to load RFQs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [manufacturerId, toast]);

  useEffect(() => {
    fetchRfqs();
  }, [fetchRfqs]);

  return { rfqs, loading, refetch: fetchRfqs };
}
