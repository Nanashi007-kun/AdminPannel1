// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6KZeSC1FNp2bBEkcO9QUYc-ACR7IuoYM",
  authDomain: "canteen-website-bds.firebaseapp.com",
  projectId: "canteen-website-bds",
  storageBucket: "canteen-website-bds.appspot.com",
  messagingSenderId: "475172613578",
  appId: "1:475172613578:web:8b4d76be1d437cd4f67333",
  measurementId: "G-BCD9ZBP7HC"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Export Firestore database object
export const db = getFirestore(app);