import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQRIpGu8u0gym566nK4Xfu2LcxSih9XDU",
  authDomain: "egli-hub.firebaseapp.com",
  projectId: "egli-hub",
  storageBucket: "egli-hub.firebasestorage.app",
  messagingSenderId: "669798404623",
  appId: "1:669798404623:web:a92835d0a1a36ea6e6897a"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
