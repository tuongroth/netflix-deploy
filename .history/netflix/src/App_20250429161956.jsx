import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<L />} />
    </Routes>
  );
};

export default App;
