import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // ✅ Đảm bảo import CSS

import { auth } from './firebase';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';

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
    <>
      <ToastContainer theme="dark" /> {/* ✅ Được bọc đúng trong Fragment */}
      <Routes>
        {user ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Login />} />
        )}
        <Route path="/player" element={<Player />} />
      </Routes>
    </>
  );
};

export default App;

