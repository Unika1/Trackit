// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCp3PL0UYwtCZSFjc0Qo9KLhYUYP3eHu_w",
  authDomain: "trackit-59c6d.firebaseapp.com",
  projectId: "trackit-59c6d",
  storageBucket: "trackit-59c6d.firebasestorage.app",
  messagingSenderId: "668075613646",
  appId: "1:668075613646:web:9cc995f2cb1318106c1f9f",
  measurementId: "G-6CC4FK1ZXY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);