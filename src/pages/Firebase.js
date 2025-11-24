import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA6t4Q2WLlgdt8z9ZZIaVH79ughaVQW2ZI",
  authDomain: "ecommerce-a6a30.firebaseapp.com",
  projectId: "ecommerce-a6a30",
  storageBucket: "ecommerce-a6a30.firebasestorage.app",
  messagingSenderId: "250687059020",
  appId: "1:250687059020:web:85d8b9230f68c3585eb0e9",
  measurementId: "G-LKDZRPLMPD"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

