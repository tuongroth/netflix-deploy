import React, { useState } from 'react'; // Thêm useState
// ... import khác giữ nguyên

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false); // 👉 Tạo state toggle menu

  return (
    <div className="navbar">
      <div className="navbar-left">
        {/* giữ nguyên */}
      </div>

      <div className="navbar-right">
        <img src={search_icon} alt="Search" />
        <img src={bell_icon} alt="Notifications" />
        
        <div className="navbar-profile" onClick={() => setShowMenu(!showMenu)}>
          <img src={profile_img} alt="Profile" className="profile-img" />
          <img src={caret_icon} alt="Caret" className="caret-icon" />
        </div>

        {/* 👇 Hiện menu nếu showMenu = true */}
        {showMenu && (
          <div className="dropdown-menu">
            <ul>
              <li>Sign In</li> {/* hoặc Sign Out nếu đang đăng nhập */}
              <li>Account</li>
              <li>Settings</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
