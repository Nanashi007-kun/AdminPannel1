import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken } from "@firebase/messaging";

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

const messaging = getMessaging(app);

export const generateToken = async () => {
  const Permission = await Notification.requestPermission();
  console.log(Permission);
  if (Permission === "geanted") {
    const token = await getToken(messaging, {
      vapidKey: "BFSk21y-sNxTR2VsGx08LugpiSPvenIxUWV44vUvmthl4UrMrpBMb2AFq2KIrlnDyKxb00xKY3kDYKCTixK-L68"
    });
    console.log(token);
  }
};
