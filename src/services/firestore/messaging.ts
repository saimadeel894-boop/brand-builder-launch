import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  arrayUnion,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Conversation {
  id: string;
  participants: string[];
  participantNames: Record<string, string>;
  participantRoles: Record<string, string>;
  referenceType?: "rfq" | "campaign" | "collaboration";
  referenceId?: string;
  referenceTitle?: string;
  lastMessage?: string;
  lastMessageAt?: Date;
  lastMessageSender?: string;
  unreadCounts: Record<string, number>;
  createdAt?: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  text: string;
  fileUrl?: string;
  fileName?: string;
  fileType?: "image" | "pdf";
  createdAt?: Date;
}

// Create a new conversation
export async function createConversation(data: {
  participants: string[];
  participantNames: Record<string, string>;
  participantRoles: Record<string, string>;
  referenceType?: "rfq" | "campaign" | "collaboration";
  referenceId?: string;
  referenceTitle?: string;
}): Promise<{ id: string; error: Error | null }> {
  try {
    // Check if conversation already exists between these participants for same reference
    if (data.referenceId) {
      const existing = await findConversation(data.participants, data.referenceId);
      if (existing) return { id: existing.id, error: null };
    }

    const docRef = doc(collection(db, "conversations"));
    const unreadCounts: Record<string, number> = {};
    data.participants.forEach(p => (unreadCounts[p] = 0));

    await setDoc(docRef, {
      ...data,
      unreadCounts,
      lastMessage: "",
      lastMessageAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, error: null };
  } catch (error) {
    return { id: "", error: error as Error };
  }
}

// Find existing conversation
async function findConversation(participants: string[], referenceId: string): Promise<Conversation | null> {
  try {
    const q = query(
      collection(db, "conversations"),
      where("referenceId", "==", referenceId)
    );
    const snapshot = await getDocs(q);
    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();
      const convParticipants = data.participants as string[];
      if (participants.every(p => convParticipants.includes(p))) {
        return mapConversation(docSnap.id, data);
      }
    }
    return null;
  } catch {
    return null;
  }
}

function mapConversation(id: string, data: any): Conversation {
  return {
    id,
    participants: data.participants || [],
    participantNames: data.participantNames || {},
    participantRoles: data.participantRoles || {},
    referenceType: data.referenceType,
    referenceId: data.referenceId,
    referenceTitle: data.referenceTitle,
    lastMessage: data.lastMessage || "",
    lastMessageAt: data.lastMessageAt instanceof Timestamp ? data.lastMessageAt.toDate() : undefined,
    lastMessageSender: data.lastMessageSender,
    unreadCounts: data.unreadCounts || {},
    createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : undefined,
  };
}

// Get all conversations for a user
export async function getConversations(userId: string): Promise<Conversation[]> {
  try {
    const q = query(
      collection(db, "conversations"),
      where("participants", "array-contains", userId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs
      .map(d => mapConversation(d.id, d.data()))
      .sort((a, b) => (b.lastMessageAt?.getTime() || 0) - (a.lastMessageAt?.getTime() || 0));
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return [];
  }
}

// Subscribe to conversations in real-time
export function subscribeToConversations(
  userId: string,
  callback: (conversations: Conversation[]) => void
) {
  const q = query(
    collection(db, "conversations"),
    where("participants", "array-contains", userId)
  );
  return onSnapshot(q, (snapshot) => {
    const convs = snapshot.docs
      .map(d => mapConversation(d.id, d.data()))
      .sort((a, b) => (b.lastMessageAt?.getTime() || 0) - (a.lastMessageAt?.getTime() || 0));
    callback(convs);
  });
}

// Send a message
export async function sendMessage(data: {
  conversationId: string;
  senderId: string;
  senderName: string;
  text: string;
  fileUrl?: string;
  fileName?: string;
  fileType?: "image" | "pdf";
  otherParticipants: string[];
}): Promise<{ error: Error | null }> {
  try {
    const msgRef = doc(collection(db, "conversations", data.conversationId, "messages"));
    await setDoc(msgRef, {
      senderId: data.senderId,
      senderName: data.senderName,
      text: data.text,
      fileUrl: data.fileUrl || null,
      fileName: data.fileName || null,
      fileType: data.fileType || null,
      createdAt: serverTimestamp(),
    });

    // Update conversation's last message and unread counts
    const unreadUpdates: Record<string, any> = {};
    data.otherParticipants.forEach(p => {
      unreadUpdates[`unreadCounts.${p}`] = (unreadUpdates[`unreadCounts.${p}`] || 0) + 1;
    });

    // We need to read current unread counts and increment
    const convRef = doc(db, "conversations", data.conversationId);
    const convSnap = await getDoc(convRef);
    if (convSnap.exists()) {
      const convData = convSnap.data();
      const currentUnread = convData.unreadCounts || {};
      data.otherParticipants.forEach(p => {
        currentUnread[p] = (currentUnread[p] || 0) + 1;
      });
      currentUnread[data.senderId] = 0;

      await updateDoc(convRef, {
        lastMessage: data.text || (data.fileName ? `📎 ${data.fileName}` : "Attachment"),
        lastMessageAt: serverTimestamp(),
        lastMessageSender: data.senderId,
        unreadCounts: currentUnread,
      });
    }

    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
}

// Subscribe to messages in a conversation
export function subscribeToMessages(
  conversationId: string,
  callback: (messages: Message[]) => void
) {
  const q = collection(db, "conversations", conversationId, "messages");
  return onSnapshot(q, (snapshot) => {
    const msgs = snapshot.docs
      .map(d => {
        const data = d.data();
        return {
          id: d.id,
          conversationId,
          senderId: data.senderId,
          senderName: data.senderName,
          text: data.text || "",
          fileUrl: data.fileUrl,
          fileName: data.fileName,
          fileType: data.fileType,
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : undefined,
        } as Message;
      })
      .sort((a, b) => (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0));
    callback(msgs);
  });
}

// Mark conversation as read for a user
export async function markConversationRead(conversationId: string, userId: string) {
  try {
    const convRef = doc(db, "conversations", conversationId);
    await updateDoc(convRef, {
      [`unreadCounts.${userId}`]: 0,
    });
  } catch (error) {
    console.error("Error marking conversation read:", error);
  }
}
