// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBp-1FJ7Dve_uOD8D0d5shoC3UN9fHcxeM",
  authDomain: "chat-5380b.firebaseapp.com",
  projectId: "chat-5380b",
  storageBucket: "chat-5380b.appspot.com",
  messagingSenderId: "813025883247",
  appId: "1:813025883247:web:19edd4836c0441b4b2099a",
  measurementId: "G-V9929DMSMQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();