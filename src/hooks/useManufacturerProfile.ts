import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export interface ManufacturerProfileData {
  id: string;
  user_id: string;
  company_name: string;
  categories: string[];
  certifications: string[];
  moq: string | null;
  lead_time: string | null;
  description: string | null;
  location: string | null;
  website: string | null;
  created_at: string;
  updated_at: string;
}

export function useManufacturerProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<ManufacturerProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("manufacturer_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      setProfile(data);
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
    if (!profile) return false;

    try {
      const { error } = await supabase
        .from("manufacturer_profiles")
        .update(updates)
        .eq("id", profile.id);

      if (error) throw error;

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
