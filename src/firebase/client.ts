
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7siVG6oM8wOTGL0ZOlzqJsNsFDUF7sl0",
  authDomain: "eglife-token-1e4c5.firebaseapp.com",
  projectId: "eglife-token-1e4c5",
  storageBucket: "eglife-token-1e4c5.appspot.com",
  messagingSenderId: "321177983654",
  appId: "1:321177983654:web:fcb2a47126845d22117267",
  measurementId: "G-Y681N12MWG"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

    