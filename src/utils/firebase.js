// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "blog-lamadev-605c8.firebaseapp.com",
  projectId: "blog-lamadev-605c8",
  storageBucket: "blog-lamadev-605c8.appspot.com",
  messagingSenderId: "339933845165",
  appId: "1:339933845165:web:1ed43ac93488d09886d824",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
