import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login/Login';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );
};

export default App;
