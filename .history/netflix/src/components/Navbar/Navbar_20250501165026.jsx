import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false); // 👉 Thêm state điều khiển dropdown

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>

      <div className="navbar-right">
        <img src={search_icon} alt="Search" />
        <img src={bell_icon} alt="Notifications" />
        <div className="navbar-profile" onClick={() => setShowMenu(!showMenu)}>
          <img src={profile_img} alt="Profile" className="profile-img" />
          <img src={caret_icon} alt="Caret" className="caret-icon" />
        </div>

        {showMenu && (
          <div className="dropdown-menu">
           
              <p oncl>Sign out</p>
          
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
