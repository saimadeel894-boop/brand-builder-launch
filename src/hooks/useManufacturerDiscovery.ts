import { useState, useEffect, useCallback } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

export interface ManufacturerProfile {
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
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ManufacturerFilters {
  search: string;
  categories: string[];
  certifications: string[];
  moqRange: string;
  leadTime: string;
  location: string;
}

const defaultFilters: ManufacturerFilters = {
  search: "",
  categories: [],
  certifications: [],
  moqRange: "",
  leadTime: "",
  location: "",
};

export function useManufacturerDiscovery() {
  const { toast } = useToast();
  const [manufacturers, setManufacturers] = useState<ManufacturerProfile[]>([]);
  const [filteredManufacturers, setFilteredManufacturers] = useState<ManufacturerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ManufacturerFilters>(defaultFilters);

  const fetchManufacturers = useCallback(async () => {
    try {
      const q = query(
        collection(db, "manufacturerProfiles"),
        orderBy("companyName", "asc")
      );

      const querySnapshot = await getDocs(q);
      const mfgData: ManufacturerProfile[] = [];

      querySnapshot.docs.forEach((docSnap) => {
        const data = docSnap.data();
        mfgData.push({
          id: docSnap.id,
          userId: data.userId || docSnap.id,
          companyName: data.companyName,
          categories: data.categories || [],
          certifications: data.certifications || [],
          moq: data.moq || null,
          leadTime: data.leadTime || null,
          description: data.description || null,
          location: data.location || null,
          website: data.website || null,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
        });
      });

      setManufacturers(mfgData);
      setFilteredManufacturers(mfgData);
    } catch (error: any) {
      console.error("Error fetching manufacturers:", error);
      toast({
        title: "Error",
        description:
          error?.code === "permission-denied"
            ? "Manufacturers are blocked by Firestore permissions. Please verify Firestore rules for the 'manufacturerProfiles' collection."
            : "Failed to load manufacturers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Apply filters whenever manufacturers or filters change
  useEffect(() => {
    let result = [...manufacturers];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (m) =>
          m.companyName.toLowerCase().includes(searchLower) ||
          m.description?.toLowerCase().includes(searchLower) ||
          m.location?.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter((m) =>
        filters.categories.some((cat) => m.categories.includes(cat))
      );
    }

    // Certification filter
    if (filters.certifications.length > 0) {
      result = result.filter((m) =>
        filters.certifications.some((cert) => m.certifications.includes(cert))
      );
    }

    // Location filter
    if (filters.location) {
      result = result.filter((m) =>
        m.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setFilteredManufacturers(result);
  }, [manufacturers, filters]);

  useEffect(() => {
    fetchManufacturers();
  }, [fetchManufacturers]);

  const updateFilters = (newFilters: Partial<ManufacturerFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  // Get unique values for filter options
  const availableCategories = [...new Set(manufacturers.flatMap((m) => m.categories))].sort();
  const availableCertifications = [...new Set(manufacturers.flatMap((m) => m.certifications))].sort();
  const availableLocations = [...new Set(manufacturers.map((m) => m.location).filter(Boolean))] as string[];

  return {
    manufacturers: filteredManufacturers,
    allManufacturers: manufacturers,
    loading,
    filters,
    updateFilters,
    resetFilters,
    refetch: fetchManufacturers,
    availableCategories,
    availableCertifications,
    availableLocations,
  };
}
