// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "egli-hub",
  appId: "1:669798404623:web:c18c65f6b80de5f4e6897a",
  storageBucket: "egli-hub.firebasestorage.app",
  apiKey: "AIzaSyAQRIpGu8u0gym566nK4Xfu2LcxSih9XDU",
  authDomain: "egli-hub.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "669798404623"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
