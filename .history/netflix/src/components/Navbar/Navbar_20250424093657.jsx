import React from 'react';
import './Navbar.css';
import logo from '../'


const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" />
        
      </div>
      
    </div>
  );
};

export default Navbar;


