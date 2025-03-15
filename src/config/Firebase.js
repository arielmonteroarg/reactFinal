// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDe_t3-joZYFQvgS5L12iKvWfBCLvboyxg",
  authDomain: "fundasreact.firebaseapp.com",
  projectId: "fundasreact",
  storageBucket: "fundasreact.firebasestorage.app",
  messagingSenderId: "91920915401",
  appId: "1:91920915401:web:9ae2d826cc628b0e69a618"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db =getFirestore(app);
export const auth =getAuth(app);
