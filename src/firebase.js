import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken } from "@firebase/messaging";
import { getStorage } from "firebase/storage";
import { onSnapshot } from "firebase/firestore";
import { getDoc } from "firebase/firestore";

// Import `child` directly from `firebase/storage` (no need for re-export)
import { child } from "firebase/storage";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB6KZeSC1FNp2bBEkcO9QUYc-ACR7IuoYM",
  authDomain: "canteen-website-bds.firebaseapp.com",
  projectId: "canteen-website-bds",
  storageBucket: "canteen-website-bds.appspot.com",
  messagingSenderId: "475172613578",
  appId: "1:475172613578:web:8b4d76be1d437cd4f67333",
  measurementId: "G-BCD9ZBP7HC",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);
export const firestore = getFirestore(app);

export { ref };
// export { child };

export const generateToken = async () => {
  // Check if the browser supports notifications
  if (!("Notification" in window)) {
    console.error("This browser does not support desktop notification");
    return;
  }

  // Request permission for notifications
  const permission = await Notification.requestPermission();
  console.log(permission);

  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BFSk21y-sNxTR2VsGx08LugpiSPvenIxUWV44vUvmthl4UrMrpBMb2AFq2KIrlnDyKxb00xKY3kDYKCTixK-L68",
    });
    console.log(token);
  } else {
    console.error("Permission for notifications denied");
  }
};
