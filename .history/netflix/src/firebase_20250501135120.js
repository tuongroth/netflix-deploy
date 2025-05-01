
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/";
import { getFirestore } from "firebase/firestore/";


const firebaseConfig = {
  apiKey: "AIzaSyAvyqgns2HeMKGF4FhjZMwVE9YifY5L1QI",
  authDomain: "netflix-a3b24.firebaseapp.com",
  projectId: "netflix-a3b24",
  storageBucket: "netflix-a3b24.firebasestorage.app",
  messagingSenderId: "420868794740",
  appId: "1:420868794740:web:603762d50f00e94fb66421",
  measurementId: "G-VJB1DNTGFK"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try  {
} catch (error)