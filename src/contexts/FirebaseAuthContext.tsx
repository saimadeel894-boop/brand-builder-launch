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

  const fetchProfile = async (userId: string, retries = 2): Promise<UserProfile | null> => {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        console.log(`Fetching profile for user: ${userId} (attempt ${attempt + 1})`);
        
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
        console.log("No user document found");
        return null;
      } catch (error) {
        console.error(`Error fetching profile (attempt ${attempt + 1}):`, error);
        if (attempt < retries) {
          // Wait before retrying
          await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
        }
      }
    }
    return null;
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
    let isMounted = true;
    let isInitialLoad = true;

    // 1. Handle INITIAL load: wait for auth to fully restore, then fetch profile
    const initializeAuth = async () => {
      try {
        // authStateReady() resolves once Firebase restores session from persistence
        await auth.authStateReady();
        if (!isMounted) return;

        const currentUser = auth.currentUser;
        setUser(currentUser);

        if (currentUser) {
          // Force token refresh to ensure valid Firestore credentials
          await currentUser.getIdToken(true);
          if (!isMounted) return;

          const profileData = await fetchProfile(currentUser.uid);
          if (isMounted) setProfile(profileData);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
          isInitialLoad = false;
        }
      }
    };

    initializeAuth();

    // 2. Listen for SUBSEQUENT auth changes (sign-in, sign-out after initial load)
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (isInitialLoad) return; // Skip — handled by initializeAuth above
      if (!isMounted) return;

      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const profileData = await fetchProfile(firebaseUser.uid);
          if (isMounted) setProfile(profileData);
        } catch (error) {
          console.error("Error in auth state change:", error);
          if (isMounted) setProfile(null);
        }
      } else {
        setProfile(null);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
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
