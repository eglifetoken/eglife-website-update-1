
// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQRIpGu8u0gym566nK4Xfu2LcxSih9XDU",
  authDomain: "egli-hub.firebaseapp.com",
  projectId: "egli-hub",
  storageBucket: "egli-hub.firebasestorage.app",
  messagingSenderId: "669798404623",
  appId: "1:669798404623:web:a92835d0a1a36ea6e6897a"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
