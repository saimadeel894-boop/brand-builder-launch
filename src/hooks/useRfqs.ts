import { useState, useEffect, useCallback } from "react";
import { collection, getDocs, query, where, orderBy, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

export interface Rfq {
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
  createdAt?: Date;
  updatedAt?: Date;
  brandName?: string;
}

export function useRfqs(manufacturerId: string | undefined) {
  const { toast } = useToast();
  const [rfqs, setRfqs] = useState<Rfq[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRfqs = useCallback(async () => {
    if (!manufacturerId) {
      setLoading(false);
      return;
    }

    try {
      // Query without orderBy to avoid requiring a composite index
      // We'll sort client-side instead
      const q = query(
        collection(db, "rfqs"),
        where("manufacturerId", "==", manufacturerId)
      );

      const querySnapshot = await getDocs(q);
      const rfqsData: Rfq[] = [];

      for (const docSnap of querySnapshot.docs) {
        const data = docSnap.data();
        
        // Fetch brand name (best-effort; don't fail RFQ list if brandProfiles rules block reads)
        let brandName = "Unknown Brand";
        if (data.brandId) {
          try {
            const brandDoc = await getDoc(doc(db, "brandProfiles", data.brandId));
            if (brandDoc.exists()) {
              brandName = brandDoc.data().brandName || "Unknown Brand";
            }
          } catch (e) {
            console.warn("Unable to fetch brand profile for RFQ:", docSnap.id, e);
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
          status: data.status || "pending",
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
          brandName,
        });
      }

      // Sort by createdAt descending (client-side to avoid index requirement)
      rfqsData.sort((a, b) => {
        const dateA = a.createdAt?.getTime() || 0;
        const dateB = b.createdAt?.getTime() || 0;
        return dateB - dateA;
      });

      setRfqs(rfqsData);
    } catch (error: any) {
      console.error("Error fetching RFQs:", error);
      toast({
        title: "Error",
        description:
          error?.code === "permission-denied"
            ? "RFQs are blocked by Firestore permissions. Please verify Firestore rules for the 'rfqs' collection."
            : "Failed to load RFQs",
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
