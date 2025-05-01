
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth/web-extension";
import { getFirestore } from "firebase/firestore/";
import { addDoc } from "firebase/firestore/";


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
    try  { const res=await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{uid:user.uid, name, authProvider:"local", email,})

} catch (error) {console.log(error);alert(error);}}


const login = async (email, password)=>{try{}catch(error){}}