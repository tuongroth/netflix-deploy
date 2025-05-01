import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate } from 'react-router-dom';

const Player = () => {
  const navigate = useNavigate();
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTIyOThmMzlkYWFkOTlkYjU5YTExMTk2YWU1OGQ3MyIsIm5iZiI6MS43NDYwMjY1MTQ1MTEwMDAyZSs5LCJzdWIiOiI2ODEyNDAxMmRlMDI4NDcyNjdhMGViMmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.wCTfAGApgNLfsltAdM_otpe4q_RDH1eEzBmER-nOVAs'
  }
};

fetch('https://api.themoviedb.org/3/movie/movie_id/videos?language=en-US', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));

  return (
    <div className='player'>
      <img 
        src={back_arrow_icon} 
        alt="Back" 
        className="back-button"
        onClick={() => navigate(-1)} 
      />

      <iframe 
        width='90%' 
        height='90%' 
        src='https://www.youtube.com/embed/hkHHwA-vEyQ'
        title='trailer' 
        frameBorder='0' 
        allowFullScreen
      ></iframe>

      <div className="player-info">
        <p>ap</p>
        <p>Name</p>
        <p>Type</p>
      </div>
    </div>
  );
};

export default Player;
