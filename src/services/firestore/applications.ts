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

export type ApplicationType = "campaign" | "whiteLabelOffer";
export type ApplicationStatus = "pending" | "accepted" | "rejected";

export interface Application {
  id: string;
  influencerId: string;
  targetId: string; // campaign or white-label offer ID
  targetType: ApplicationType;
  targetTitle: string;
  status: ApplicationStatus;
  message?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export async function createApplication(
  data: Omit<Application, "id" | "createdAt" | "updatedAt">
): Promise<{ id: string; error: Error | null }> {
  try {
    // Check for duplicate
    const existing = await getDocs(
      query(
        collection(db, "applications"),
        where("influencerId", "==", data.influencerId),
        where("targetId", "==", data.targetId)
      )
    );

    if (!existing.empty) {
      return { id: "", error: new Error("You have already applied to this opportunity.") };
    }

    const docRef = doc(collection(db, "applications"));
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

export async function getApplicationsByInfluencer(
  influencerId: string
): Promise<Application[]> {
  try {
    const snapshot = await getDocs(
      query(
        collection(db, "applications"),
        where("influencerId", "==", influencerId)
      )
    );
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        influencerId: data.influencerId,
        targetId: data.targetId,
        targetType: data.targetType,
        targetTitle: data.targetTitle,
        status: data.status,
        message: data.message,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      };
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return [];
  }
}

export async function getApplicationsForTarget(
  targetId: string
): Promise<Application[]> {
  try {
    const snapshot = await getDocs(
      query(
        collection(db, "applications"),
        where("targetId", "==", targetId)
      )
    );
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        influencerId: data.influencerId,
        targetId: data.targetId,
        targetType: data.targetType,
        targetTitle: data.targetTitle,
        status: data.status,
        message: data.message,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      };
    });
  } catch (error) {
    console.error("Error fetching target applications:", error);
    return [];
  }
}
