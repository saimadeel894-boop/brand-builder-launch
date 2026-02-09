import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Manufacturer Profile
export interface ManufacturerProfile {
  userId: string;
  companyName: string;
  firstName?: string;
  lastName?: string;
  categories: string[];
  certifications: string[];
  moq?: number;
  moqUnit?: string; // "units" (for display, always units)
  leadTime?: number;
  leadTimeUnit?: "days" | "weeks" | "months";
  price?: number;
  currency?: "USD" | "EUR" | "JPY" | "CNY" | "KRW";
  description?: string;
  location?: string;
  website?: string;
  companyId?: string; // For future multi-user company support
  createdAt?: Date;
  updatedAt?: Date;
}

export async function createManufacturerProfile(
  userId: string,
  data: Omit<ManufacturerProfile, "userId" | "createdAt" | "updatedAt">
): Promise<{ error: Error | null }> {
  try {
    await setDoc(doc(db, "manufacturerProfiles", userId), {
      userId,
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
}

export async function getManufacturerProfile(userId: string): Promise<ManufacturerProfile | null> {
  try {
    const docSnap = await getDoc(doc(db, "manufacturerProfiles", userId));
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        userId: data.userId,
        companyName: data.companyName,
        firstName: data.firstName,
        lastName: data.lastName,
        categories: data.categories || [],
        certifications: data.certifications || [],
        moq: data.moq,
        moqUnit: data.moqUnit,
        leadTime: data.leadTime,
        leadTimeUnit: data.leadTimeUnit,
        price: data.price,
        currency: data.currency,
        description: data.description,
        location: data.location,
        website: data.website,
        companyId: data.companyId,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching manufacturer profile:", error);
    return null;
  }
}

export async function updateManufacturerProfile(
  userId: string,
  data: Partial<ManufacturerProfile>
): Promise<{ error: Error | null }> {
  try {
    await updateDoc(doc(db, "manufacturerProfiles", userId), {
      ...data,
      updatedAt: serverTimestamp(),
    });
    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
}

// Brand Profile
export interface BrandProfile {
  userId: string;
  brandName: string;
  firstName?: string;
  lastName?: string;
  industry: string;
  companyId?: string; // For future multi-user company support
  createdAt?: Date;
  updatedAt?: Date;
}

export async function createBrandProfile(
  userId: string,
  data: Omit<BrandProfile, "userId" | "createdAt" | "updatedAt">
): Promise<{ error: Error | null }> {
  try {
    await setDoc(doc(db, "brandProfiles", userId), {
      userId,
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
}

export async function getBrandProfile(userId: string): Promise<BrandProfile | null> {
  try {
    const docSnap = await getDoc(doc(db, "brandProfiles", userId));
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        userId: data.userId,
        brandName: data.brandName,
        firstName: data.firstName,
        lastName: data.lastName,
        industry: data.industry,
        companyId: data.companyId,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching brand profile:", error);
    return null;
  }
}

// Influencer Profile
export interface InfluencerProfile {
  userId: string;
  name: string;
  firstName?: string;
  lastName?: string;
  primaryPlatform: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export async function createInfluencerProfile(
  userId: string,
  data: Omit<InfluencerProfile, "userId" | "createdAt" | "updatedAt">
): Promise<{ error: Error | null }> {
  try {
    await setDoc(doc(db, "influencerProfiles", userId), {
      userId,
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
}

export async function getInfluencerProfile(userId: string): Promise<InfluencerProfile | null> {
  try {
    const docSnap = await getDoc(doc(db, "influencerProfiles", userId));
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        userId: data.userId,
        name: data.name,
        firstName: data.firstName,
        lastName: data.lastName,
        primaryPlatform: data.primaryPlatform,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching influencer profile:", error);
    return null;
  }
}
