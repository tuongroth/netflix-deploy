import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";

// Firebase configuration
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
const auth = getAuth(app);
const db = getFirestore(app);

// Signup function
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

// Login function
const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    // handle success (e.g., redirect user, update UI, etc.)
    console.log(res.user); // For example, logging the user
  } catch (error) {
    console.log(error);
   toast(error.message);
  }
};

// Logout function
const logout = () => {
  signOut(auth).then(() => {
    // Handle successful logout (e.g., redirect user, update UI, etc.)
  }).catch((error) => {
    console.log(error);
    alert(error.message);
  });
};

export { auth, db, login, signup, logout };
