import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Campaign {
  id: string;
  brandId: string;
  brandName?: string;
  title: string;
  description: string;
  category: string;
  requirements: string;
  budget?: string;
  deadline?: string;
  status: "active" | "closed";
  createdAt?: Date;
  updatedAt?: Date;
}

export async function createCampaign(
  data: Omit<Campaign, "id" | "createdAt" | "updatedAt">
): Promise<{ id: string; error: Error | null }> {
  try {
    const docRef = doc(collection(db, "campaigns"));
    await setDoc(docRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { id: docRef.id, error: null };
  } catch (error) {
    return { id: "", error: error as Error };
  }
}

export async function getCampaigns(): Promise<Campaign[]> {
  try {
    const snapshot = await getDocs(
      query(collection(db, "campaigns"), where("status", "==", "active"))
    );
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        brandId: data.brandId,
        brandName: data.brandName,
        title: data.title,
        description: data.description,
        category: data.category,
        requirements: data.requirements,
        budget: data.budget,
        deadline: data.deadline,
        status: data.status,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      };
    });
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return [];
  }
}

export async function getCampaignsByBrand(brandId: string): Promise<Campaign[]> {
  try {
    const snapshot = await getDocs(
      query(collection(db, "campaigns"), where("brandId", "==", brandId))
    );
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        brandId: data.brandId,
        brandName: data.brandName,
        title: data.title,
        description: data.description,
        category: data.category,
        requirements: data.requirements,
        budget: data.budget,
        deadline: data.deadline,
        status: data.status,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      };
    });
  } catch (error) {
    console.error("Error fetching brand campaigns:", error);
    return [];
  }
}
