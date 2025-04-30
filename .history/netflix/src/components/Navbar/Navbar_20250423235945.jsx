import React from 'react';
import './Navbar.css';
import logo

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" />
        {/* Add other navbar elements here */}
      </div>
      {/* You can add navbar-center and navbar-right sections if needed */}
    </div>
  );
};

export default Navbar;
