import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

const App = () => {
  useEffect(() => {
     onAuthStateChanged(auth, async (user)=>
    {
      if (user) {
        console.log("Logged In");
        setUser(user);
      } else {
        console.log("Logged out");
        setUser(null);
      }
    
    
    }), []);
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
      </Routes>
    </div>
  );
};

export default App;
