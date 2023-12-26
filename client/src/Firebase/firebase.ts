// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mern-ecommerce-a9a0d.firebaseapp.com",
  projectId: "mern-ecommerce-a9a0d",
  storageBucket: "mern-ecommerce-a9a0d.appspot.com",
  messagingSenderId: "470087572956",
  appId: "1:470087572956:web:98784db02a925e640e0319",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
