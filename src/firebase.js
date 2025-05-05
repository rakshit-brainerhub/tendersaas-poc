import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOmoZdd3557TmyD3eAMyIYZDc6apT5wp4",
  authDomain: "tender-management-1669b.firebaseapp.com",
  projectId: "tender-management-1669b",
  storageBucket: "tender-management-1669b.firebasestorage.app",
  messagingSenderId: "92989253717",
  appId: "1:92989253717:web:0d1cc4956bcf8ddbb6ccdc"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)