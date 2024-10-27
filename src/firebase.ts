// src/firebase.ts or src/firebase.js

// Import required functions from the SDK
// eslint-disable-next-line import/no-extraneous-dependencies
import { initializeApp } from "firebase/app";
// eslint-disable-next-line import/no-extraneous-dependencies
import { getAuth } from "firebase/auth";

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

// Export initialized auth instance
export const auth = getAuth(app); // Make sure you export this
export default app;
