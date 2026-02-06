import { useState, useEffect, useCallback } from "react";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";
import { useToast } from "@/hooks/use-toast";

export interface ManufacturerProfileData {
  id: string;
  userId: string;
  companyName: string;
  firstName?: string | null;
  lastName?: string | null;
  categories: string[];
  certifications: string[];
  moq?: number | null;
  moqUnit?: string | null;
  leadTime?: number | null;
  leadTimeUnit?: "days" | "weeks" | "months" | null;
  price?: number | null;
  currency?: "USD" | "EUR" | "JPY" | "CNY" | "KRW" | null;
  description: string | null;
  location: string | null;
  website: string | null;
  companyId?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export function useManufacturerProfile() {
  const { user } = useFirebaseAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<ManufacturerProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const docSnap = await getDoc(doc(db, "manufacturerProfiles", user.uid));
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfile({
          id: user.uid,
          userId: data.userId,
          companyName: data.companyName,
          firstName: data.firstName || null,
          lastName: data.lastName || null,
          categories: data.categories || [],
          certifications: data.certifications || [],
          moq: data.moq ?? null,
          moqUnit: data.moqUnit || null,
          leadTime: data.leadTime ?? null,
          leadTimeUnit: data.leadTimeUnit || null,
          price: data.price ?? null,
          currency: data.currency || null,
          description: data.description || null,
          location: data.location || null,
          website: data.website || null,
          companyId: data.companyId || null,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
        });
      }
    } catch (error: any) {
      console.error("Error fetching manufacturer profile:", error);
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async (updates: Partial<ManufacturerProfileData>) => {
    if (!profile || !user) return false;

    try {
      await updateDoc(doc(db, "manufacturerProfiles", user.uid), {
        ...updates,
        updatedAt: serverTimestamp(),
      });

      setProfile({ ...profile, ...updates });
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      return true;
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
      return false;
    }
  };

  return { profile, loading, updateProfile, refetch: fetchProfile };
}
