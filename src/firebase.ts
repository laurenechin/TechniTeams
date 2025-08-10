import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPjR1bbXAvM-zLV4yDxlBSYa4_orPhjpo",
  authDomain: "techniteams.firebaseapp.com",
  projectId: "techniteams",
  storageBucket: "techniteams.firebasestorage.app",
  messagingSenderId: "978927475886",
  appId: "1:978927475886:web:a04d3a918f0215257d213f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
