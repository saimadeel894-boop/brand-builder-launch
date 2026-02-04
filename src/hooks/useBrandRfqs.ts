import { useState, useEffect, useCallback } from "react";
import { collection, getDocs, query, where, orderBy, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

export interface BrandRfq {
  id: string;
  brandId: string;
  manufacturerId: string;
  title: string;
  description: string | null;
  category: string | null;
  quantity: string | null;
  budget: string | null;
  deadline: string | null;
  status: string;
  attachments?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  manufacturerName?: string;
}

export function useBrandRfqs(brandId: string | undefined) {
  const { toast } = useToast();
  const [rfqs, setRfqs] = useState<BrandRfq[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRfqs = useCallback(async () => {
    if (!brandId) {
      setLoading(false);
      return;
    }

    try {
      const q = query(
        collection(db, "rfqs"),
        where("brandId", "==", brandId),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const rfqsData: BrandRfq[] = [];

      for (const docSnap of querySnapshot.docs) {
        const data = docSnap.data();
        
        // Fetch manufacturer name
        let manufacturerName = "Unknown Manufacturer";
        if (data.manufacturerId) {
          const mfgDoc = await getDoc(doc(db, "manufacturerProfiles", data.manufacturerId));
          if (mfgDoc.exists()) {
            manufacturerName = mfgDoc.data().companyName || "Unknown Manufacturer";
          }
        }

        rfqsData.push({
          id: docSnap.id,
          brandId: data.brandId,
          manufacturerId: data.manufacturerId,
          title: data.title,
          description: data.description || null,
          category: data.category || null,
          quantity: data.quantity || null,
          budget: data.budget || null,
          deadline: data.deadline || null,
          status: data.status || "draft",
          attachments: data.attachments || [],
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
          manufacturerName,
        });
      }

      setRfqs(rfqsData);
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
  }, [brandId, toast]);

  useEffect(() => {
    fetchRfqs();
  }, [fetchRfqs]);

  return { rfqs, loading, refetch: fetchRfqs };
}
