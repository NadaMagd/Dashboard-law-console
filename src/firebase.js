
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBulAQp0y1jBD4nqMVwitTXJmktOE2An1Q",
  authDomain: "law-counsel.firebaseapp.com",
  projectId: "law-counsel",
  storageBucket: "law-counsel.appspot.com",
  messagingSenderId: "883846931977",
  appId: "1:883846931977:web:8130626f2da34895427ad8",
  measurementId: "G-YKE6TN1672"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
