import { collection, doc, addDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

export interface CreateRfqData {
  brandId: string;
  manufacturerId: string;
  title: string;
  description?: string;
  category?: string;
  quantity?: string;
  budget?: string;
  deadline?: string;
  certifications?: string[];
  notes?: string;
  status: "draft" | "sent";
}

export async function createRfq(data: CreateRfqData): Promise<string> {
  const rfqRef = await addDoc(collection(db, "rfqs"), {
    ...data,
    attachments: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return rfqRef.id;
}

export async function updateRfq(rfqId: string, data: Partial<CreateRfqData>): Promise<void> {
  await updateDoc(doc(db, "rfqs", rfqId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function uploadRfqAttachment(
  brandId: string,
  rfqId: string,
  file: File
): Promise<string> {
  try {
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const path = `rfq-attachments/${brandId}/${rfqId}/${timestamp}_${safeName}`;
    
    console.log("Uploading file to path:", path);
    
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    console.log("Upload successful:", snapshot.metadata.fullPath);
    
    const downloadUrl = await getDownloadURL(storageRef);
    console.log("Download URL obtained:", downloadUrl);
    
    return downloadUrl;
  } catch (error: any) {
    console.error("Firebase Storage upload error:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    throw new Error(`Failed to upload file: ${error.message || 'Unknown error'}`);
  }
}

export async function addAttachmentsToRfq(rfqId: string, attachmentUrls: string[]): Promise<void> {
  await updateDoc(doc(db, "rfqs", rfqId), {
    attachments: attachmentUrls,
    updatedAt: serverTimestamp(),
  });
}

export async function sendRfq(rfqId: string): Promise<void> {
  await updateDoc(doc(db, "rfqs", rfqId), {
    status: "sent",
    updatedAt: serverTimestamp(),
  });
}
