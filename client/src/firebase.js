// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-app-2288a.firebaseapp.com",
  projectId: "real-estate-app-2288a",
  storageBucket: "real-estate-app-2288a.appspot.com",
  messagingSenderId: "975280652078",
  appId: "1:975280652078:web:8d405adc4337beb2d184bf",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
