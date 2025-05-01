import React, { useEffect, useState } from 'react'; // Importing useEffect and useState
import { Routes, Route } from 'react-router-dom'; // Importing routing components
import { onAuthStateChanged } from 'firebase/auth'; // Firebase auth
import { auth } from './firebase'; // Your firebase config
import Home from './pages/Home/Home'; // Home page component

import Player from './pages/Player/Player'; // Player page component

const App = () => {
  const [user, setUser] = useState(null); // Local state to hold the user object

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Logged In");
        setUser(user); // Store user data if logged in
      } else {
        console.log("Logged out");
        setUser(null); // Clear user data if logged out
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  return (
    
    <Routes>
      {/* Conditionally render routes based on the user's login status */}
      {user ? (
        <Route path="/" element={<Home />} /> // Show home page if logged in
      ) : (
        <Route path="/Login" element={< />} /> // Show login page if not logged in
      )}
      <Route path="/player" element={<Player />} /> {/* Player page route */}
    </Routes>
  );
};

export default App;
