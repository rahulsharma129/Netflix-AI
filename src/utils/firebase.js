// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8tHO_wW6A5kl6BJU3t6Z0w1G5b7RBVdA",
  authDomain: "netflixgpt-d65ee.firebaseapp.com",
  projectId: "netflixgpt-d65ee",
  storageBucket: "netflixgpt-d65ee.firebasestorage.app",
  messagingSenderId: "875716400292",
  appId: "1:875716400292:web:def03efea542279471c231",
  measurementId: "G-E8XT1QGWHF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();