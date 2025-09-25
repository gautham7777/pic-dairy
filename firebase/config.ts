import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// --- IMPORTANT ---
// Your app's Firebase project configuration is now set up.
const firebaseConfig = {
  apiKey: "AIzaSyCVT2YuAJqoHE2m5nznwHhK0_jgMBQJzk0",
  authDomain: "math-fest-display.firebaseapp.com",
  projectId: "math-fest-display",
  storageBucket: "math-fest-display.firebasestorage.app",
  messagingSenderId: "252365377355",
  appId: "1:252365377355:web:e6469d667723bfb0594e2ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service and storage service
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
