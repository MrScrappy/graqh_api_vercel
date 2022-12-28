import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_FIREBASE_APP_APIKEY,
  authDomain: process.env.REACT_FIREBASE_APP_AUTHDOMAIN,
  projectId: process.env.REACT_FIREBASE_APP_PROJECTID,
  storageBucket: process.env.REACT_FIREBASE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_FIREBASE_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_FIREBASE_APP_APPID,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();