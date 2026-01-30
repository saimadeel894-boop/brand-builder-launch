import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAb1RS-mLEMdmkjklwOyg6aDXor9xVv4mM",
  authDomain: "beautychain-ee044.firebaseapp.com",
  projectId: "beautychain-ee044",
  storageBucket: "beautychain-ee044.firebasestorage.app",
  messagingSenderId: "615836312427",
  appId: "1:615836312427:web:1bd823fa042e92c378a22e",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
