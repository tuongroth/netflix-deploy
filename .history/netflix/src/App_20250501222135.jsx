import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { ToastContainer } from 'react-toastify'; // 👉 Thêm dòng này


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
      <ToastContainer theme="dark" /> {/* ✅ Sửa lại đây */}
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

