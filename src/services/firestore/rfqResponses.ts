import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface RfqResponse {
  rfqId: string;
  manufacturerId: string;
  quotedPrice: string;
  estimatedLeadTime: string;
  message: string;
  status: "draft" | "submitted";
  createdAt?: Date;
  updatedAt?: Date;
}

export async function createRfqResponse(
  rfqId: string,
  manufacturerId: string,
  data: Omit<RfqResponse, "rfqId" | "manufacturerId" | "createdAt" | "updatedAt">
): Promise<{ error: Error | null }> {
  try {
    // Use rfqId as the document ID for one response per RFQ
    await setDoc(doc(db, "rfqResponses", rfqId), {
      rfqId,
      manufacturerId,
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
}

export async function getRfqResponse(rfqId: string): Promise<RfqResponse | null> {
  try {
    const docSnap = await getDoc(doc(db, "rfqResponses", rfqId));
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        rfqId: data.rfqId,
        manufacturerId: data.manufacturerId,
        quotedPrice: data.quotedPrice,
        estimatedLeadTime: data.estimatedLeadTime,
        message: data.message,
        status: data.status,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching RFQ response:", error);
    return null;
  }
}

export async function updateRfqResponse(
  rfqId: string,
  data: Partial<RfqResponse>
): Promise<{ error: Error | null }> {
  try {
    await updateDoc(doc(db, "rfqResponses", rfqId), {
      ...data,
      updatedAt: serverTimestamp(),
    });
    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
}
