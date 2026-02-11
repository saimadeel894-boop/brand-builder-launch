import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface WhiteLabelOffer {
  id: string;
  manufacturerId: string;
  manufacturerName?: string;
  title: string;
  description: string;
  category: string;
  moq?: string;
  priceRange?: string;
  status: "active" | "closed";
  createdAt?: Date;
  updatedAt?: Date;
}

export async function createWhiteLabelOffer(
  data: Omit<WhiteLabelOffer, "id" | "createdAt" | "updatedAt">
): Promise<{ id: string; error: Error | null }> {
  try {
    const docRef = doc(collection(db, "whiteLabelOffers"));
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

export async function getWhiteLabelOffers(): Promise<WhiteLabelOffer[]> {
  try {
    const snapshot = await getDocs(
      query(collection(db, "whiteLabelOffers"), where("status", "==", "active"))
    );
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        manufacturerId: data.manufacturerId,
        manufacturerName: data.manufacturerName,
        title: data.title,
        description: data.description,
        category: data.category,
        moq: data.moq,
        priceRange: data.priceRange,
        status: data.status,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      };
    });
  } catch (error) {
    console.error("Error fetching white-label offers:", error);
    return [];
  }
}
