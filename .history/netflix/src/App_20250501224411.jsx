import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Home from './pages/Home/Home';

import Player from './pages/Player/Player';
import OneLogin from 'next-auth/providers/onelogin';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Logged In");
        setUser(user);
      } else {
        console.log("Logged out");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Routes>
      {user ? (
        <Route path="/" element={<Home />} />
      ) : (
        <Route path="/Login" element={<OneLogin/>} />
      )}
      <Route path="/player" element={<Player />} />
    </Routes>
  );
};

export default App;
