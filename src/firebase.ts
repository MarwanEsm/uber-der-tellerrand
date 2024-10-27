// Import the necessary functions from the Modular Firebase SDK
// eslint-disable-next-line import/no-extraneous-dependencies
import { getAnalytics } from "firebase/analytics";
// eslint-disable-next-line import/no-extraneous-dependencies
import { initializeApp } from "firebase/app";
// eslint-disable-next-line import/no-extraneous-dependencies
import { getAuth } from "firebase/auth";
// eslint-disable-next-line import/no-extraneous-dependencies
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
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

// Initialize Firebase services using modular imports
export const auth = getAuth(app);
export const firestore = getFirestore(app);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(app);

export default app;
