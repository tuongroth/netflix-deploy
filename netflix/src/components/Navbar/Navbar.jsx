import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [genres, setGenres] = useState([]);
  const [showGenresDropdown, setShowGenresDropdown] = useState(false);
  const navigate = useNavigate();

  const fetchGenres = () => {
    // Toggle dropdown khi click Movies
    if (!showGenresDropdown) {
      fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTIyOThmMzlkYWFkOTlkYjU5YTExMTk2YWU1OGQ3MyIsIm5iZiI6MS43NDYwMjY1MTQ1MTEwMDAyZSs5LCJzdWIiOiI2ODEyNDAxMmRlMDI4NDcyNjdhMGViMmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.wCTfAGApgNLfsltAdM_otpe4q_RDH1eEzBmER-nOVAs'
        }
      })
        .then(res => res.json())
        .then(res => {
          setGenres(res.genres || []);
          setShowGenresDropdown(true);
        })
        .catch(err => console.error(err));
    } else {
      setShowGenresDropdown(false);
    }
  };

  const handleGenreChange = (e) => {
    const genreId = e.target.value;
    setShowGenresDropdown(false);
    navigate(`/movies?genre=${genreId}`);
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" />
        <ul>
          <li onClick={() => navigate('/')}>Home</li>
          <li onClick={() => navigate('/TVshows')}>TV Shows</li>
          <li onClick={fetchGenres}>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>

        {showGenresDropdown && (
          <select className="genre-dropdown" onChange={handleGenreChange}>
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        )}
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
            <p onClick={() => logout()}>Sign out</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
