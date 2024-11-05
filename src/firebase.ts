// src/firebase.ts

// Import required functions from the SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCte-L6_MUxDfURAiuK3ZPvo3PbuscZSPI",
  authDomain: "uber-der-tellerrand.firebaseapp.com",
  projectId: "uber-der-tellerrand",
  storageBucket: "uber-der-tellerrand.appspot.com",
  messagingSenderId: "207670914592",
  appId: "1:207670914592:web:326286746c1ef481ce9645",
  measurementId: "G-898E39GZGP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Initialize and export Firestore
export default app;
