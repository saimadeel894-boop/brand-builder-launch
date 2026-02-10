import { useState, useEffect, useCallback } from "react";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

export interface ManufacturerPublicProfile {
  id: string;
  userId: string;
  companyName: string;
  categories: string[];
  certifications: string[];
  moq: string | null;
  leadTime: string | null;
  description: string | null;
  location: string | null;
  website: string | null;
}

export interface ManufacturerProduct {
  id: string;
  name: string;
  category: string;
  description: string | null;
  moq: string | null;
  leadTime: string | null;
  priceRange: string | null;
  images: string[];
}

export function useManufacturerPublicProfile(manufacturerId: string | undefined) {
  const { toast } = useToast();
  const [profile, setProfile] = useState<ManufacturerPublicProfile | null>(null);
  const [products, setProducts] = useState<ManufacturerProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!manufacturerId) {
      setLoading(false);
      return;
    }

    try {
      // Fetch manufacturer profile
      const profileDoc = await getDoc(doc(db, "manufacturerProfiles", manufacturerId));
      
      if (profileDoc.exists()) {
        const data = profileDoc.data();
        setProfile({
          id: profileDoc.id,
          userId: data.userId || manufacturerId,
          companyName: data.companyName,
          categories: data.categories || [],
          certifications: data.certifications || [],
          moq: data.moq || null,
          leadTime: data.leadTime || null,
          description: data.description || null,
          location: data.location || null,
          website: data.website || null,
        });

        // Fetch manufacturer's products (no orderBy to avoid index requirement)
        const productsQuery = query(
          collection(db, "products"),
          where("manufacturerId", "==", manufacturerId)
        );

        const productsSnapshot = await getDocs(productsQuery);
        const productsData: ManufacturerProduct[] = productsSnapshot.docs.map((docSnap) => {
          const pData = docSnap.data();
          return {
            id: docSnap.id,
            name: pData.name,
            category: pData.category,
            description: pData.description || null,
            moq: pData.moq || null,
            leadTime: pData.leadTime || null,
            priceRange: pData.priceRange || null,
            images: pData.images || [],
          };
        });

        // Sort client-side by newest first
        productsData.sort((a, b) => (b as any).createdAt - (a as any).createdAt);
        setProducts(productsData);
      } else {
        toast({
          title: "Not Found",
          description: "Manufacturer profile not found",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error fetching manufacturer profile:", error);
      toast({
        title: "Error",
        description: "Failed to load manufacturer profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [manufacturerId, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { profile, products, loading, refetch: fetchData };
}
