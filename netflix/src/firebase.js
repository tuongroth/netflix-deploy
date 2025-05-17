import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  doc,
  setDoc,
  query,
  onSnapshot
} from "firebase/firestore";
import { toast } from "react-toastify";

// ✅ Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvyqgns2HeMKGF4FhjZMwVE9YifY5L1QI",
  authDomain: "netflix-a3b24.firebaseapp.com",
  projectId: "netflix-a3b24",
  storageBucket: "netflix-a3b24.appspot.com",
  messagingSenderId: "420868794740",
  appId: "1:420868794740:web:603762d50f00e94fb66421",
  measurementId: "G-VJB1DNTGFK"
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 📝 Signup
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
    toast.success("Signup successful!");
  } catch (error) {
    console.error(error);
    toast.error(error.message || "Signup failed");
  }
};

// 🔐 Login
const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log("Logged in user:", res.user);
    toast.success("Login successful!");
  } catch (error) {
    console.error(error);
    toast.error(error.message || "Login failed");
  }
};

// 🚪 Logout
const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Logged out");
  } catch (error) {
    console.error(error);
    toast.error("Logout failed");
  }
};

// 🎬 Add movie
const addMovie = async (movie) => {
  const movieRef = doc(db, "Movies", `${movie.id}`); // Dùng ID movie để tránh duplicate

  try {
    await setDoc(movieRef, {
      movieName: movie.original_title,
      overview: movie.overview,
      language: movie.original_language,
      releaseDate: movie.release_date,
      backdropPath: movie.backdrop_path
    });
    console.log("✅ Movie added successfully");
  } catch (err) {
    console.error("❌ Error adding movie:", err);
    toast.error("Error adding movie");
  }
};

// ✍️ Add review
const addReview = async (movieId, content) => {
  try {
    const reviewRef = collection(db, "Movies", movieId.toString(), "reviews");
    await addDoc(reviewRef, {
      content,
      createdAt: new Date()
    });
    toast.success("Review added!");
  } catch (error) {
    console.error("Error adding review:", error);
    toast.error("Failed to add review");
  }
};

// ✅ Get reviews for a movie (real-time listener)
const getReviews = (movieId, setReviews) => {
  const reviewsRef = collection(db, "Movies", movieId.toString(), "reviews");
  const q = query(reviewsRef);

  onSnapshot(q, (snapshot) => {
    const reviews = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setReviews(reviews);
  });
};

// ✅ Export đầy đủ
export {
  auth,
  db,
  login,
  signup,
  logout,
  addMovie,
  addReview,
  getReviews // ❗ Quan trọng: đừng quên dòng này
};
