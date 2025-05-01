import React from 'react';
import './Home.css';

import Navbar from '../../components/Navbar/Navbar';
import hero_banner from '../../assets/hero_banner.jpg';
import hero_title from '../../assets/hero_title.png';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';

import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer'; // ✅ Thêm dòng này

const Home = () => {
  return (
    <div className="home">
      <Navbar />

      {/* Hero Section */}
      <div className="hero">
        <img src={hero_banner} alt="Hero Banner" className="banner-img" />

        <div className="hero-caption">
          <img src={hero_title} alt="Hero Title" className="caption-img" />
          <p>
            Discovering his ties to a secret ancient order, a young man living in modern Istanbul embarks on a quest to save the city from an immortal enemy.
          </p>

          <div className="hero-btns">
            <button className="btn">
              <img src={play_icon} alt="Play Icon" /> Play
            </button>
            <button className="btn dark-btn">
              <img src={info_icon} alt="Info Icon" /> More Info
            </button>
          </div>
          <TitleCards />
        </div>
      </div>

      {/* Movie lists */}
      <div className="more-cards">
        <TitleCards title="Popular" category={"top_rated"} />
        <TitleCards title="Blockbuster Movies" category={"popular"} />
        <TitleCards title="Only on Netflix" category={"upcoming"} />
        <TitleCards title="Upcoming" category={"now_playing"}/>
      </div>

      {/* Footer */}
      <Footer /> {/* ✅ Footer đã hoạt động */}
    </div>
  );
};

export default Home;
