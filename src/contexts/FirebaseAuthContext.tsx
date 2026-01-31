import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

type UserRole = "manufacturer" | "brand" | "influencer" | null;

interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  profileCompleted: boolean;
  createdAt?: Date;
}

interface FirebaseAuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: Error | null; profile?: UserProfile | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<UserProfile | null>;
  updateRole: (role: UserRole) => Promise<{ error: Error | null; profile?: UserProfile | null }>;
  setProfileCompleted: () => Promise<{ error: Error | null }>;
}

const FirebaseAuthContext = createContext<FirebaseAuthContextType | undefined>(undefined);

export function FirebaseAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      console.log("Fetching profile for user:", userId);
      
      // Add a timeout to prevent hanging
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("Profile fetch timeout")), 10000);
      });
      
      const fetchPromise = getDoc(doc(db, "users", userId));
      const userDoc = await Promise.race([fetchPromise, timeoutPromise]);
      
      console.log("User doc exists:", userDoc.exists());
      if (userDoc.exists()) {
        const data = userDoc.data();
        return {
          id: userId,
          email: data.email,
          role: data.role || null,
          profileCompleted: data.profileCompleted || false,
          createdAt: data.createdAt?.toDate(),
        };
      }
      console.log("No user document found, returning null");
      return null;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  };

  const refreshProfile = async (): Promise<UserProfile | null> => {
    if (user) {
      const profileData = await fetchProfile(user.uid);
      setProfile(profileData);
      return profileData;
    }
    return null;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const profileData = await fetchProfile(firebaseUser.uid);
          setProfile(profileData);
        } catch (error) {
          console.error("Error in auth state change:", error);
          setProfile(null);
        }
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string): Promise<{ error: Error | null; profile?: UserProfile | null }> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      // Create user document in Firestore
      await setDoc(doc(db, "users", newUser.uid), {
        email: newUser.email,
        role: null,
        profileCompleted: false,
        createdAt: serverTimestamp(),
      });

      // Set the user state immediately
      setUser(newUser);
      
      // Fetch and set profile immediately
      const profileData = await fetchProfile(newUser.uid);
      setProfile(profileData);

      return { error: null, profile: profileData };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    setProfile(null);
  };

  const updateRole = async (role: UserRole): Promise<{ error: Error | null; profile?: UserProfile | null }> => {
    if (!user) return { error: new Error("No user logged in") };

    try {
      console.log("Updating role to:", role);
      
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("Update role timeout")), 10000);
      });
      
      // Use setDoc with merge to create document if it doesn't exist
      const updatePromise = setDoc(doc(db, "users", user.uid), { 
        role,
        email: user.email,
      }, { merge: true });
      
      await Promise.race([updatePromise, timeoutPromise]);
      console.log("Role updated successfully");
      
      const updatedProfile = await refreshProfile();
      return { error: null, profile: updatedProfile };
    } catch (error) {
      console.error("Error updating role:", error);
      return { error: error as Error };
    }
  };

  const setProfileCompleted = async () => {
    if (!user) return { error: new Error("No user logged in") };

    try {
      await updateDoc(doc(db, "users", user.uid), { profileCompleted: true });
      await refreshProfile();
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    refreshProfile,
    updateRole,
    setProfileCompleted,
  };

  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
}

export function useFirebaseAuth() {
  const context = useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error("useFirebaseAuth must be used within a FirebaseAuthProvider");
  }
  return context;
}
