// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUbpdV6UsQmSqPo6nbWC9quu7ur9wr2U8",
  authDomain: "portfolio-68f04.firebaseapp.com",
  projectId: "portfolio-68f04",
  storageBucket: "portfolio-68f04.appspot.com",
  messagingSenderId: "911390567047",
  appId: "1:911390567047:web:aa158fe03e3bb379a4a622",
  measurementId: "G-GEWV51Y678"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);