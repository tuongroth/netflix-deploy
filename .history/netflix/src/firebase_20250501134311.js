// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvyqgns2HeMKGF4FhjZMwVE9YifY5L1QI",
  authDomain: "netflix-a3b24.firebaseapp.com",
  projectId: "netflix-a3b24",
  storageBucket: "netflix-a3b24.firebasestorage.app",
  messagingSenderId: "420868794740",
  appId: "1:420868794740:web:603762d50f00e94fb66421",
  measurementId: "G-VJB1DNTGFK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= get