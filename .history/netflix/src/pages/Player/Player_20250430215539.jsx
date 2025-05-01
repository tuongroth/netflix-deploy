import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Player = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 👈 Grabs the movie ID from the route like /player/:id

  const [apiData, setApiData] = useState({
    name: '',
    key: '',
    published_at: '',
    type: ''
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTIyOThmMzlkYWFkOTlkYjU5YTExMTk2YWU1OGQ3MyIsIm5iZiI6MS43NDYwMjY1MTQ1MTEwMDAyZSs5LCJzdWIiOiI2ODEyNDAxMmRlMDI4NDcyNjdhMGViMmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.wCTfAGApgNLfsltAdM_otpe4q_RDH1eEzBmER-nOVAs' // 👈 Replace with your TMDB Bearer token
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          const video = data.results[0]; // You could filter by type === 'Trailer'
          setApiData({
            name: video.name,
            key: video.key,
            published_at: video.published_at || 'Unknown',
            type: video.type
          });
        }
      })
      .catch(err => console.error('Error fetching data:', err));
  }, [id]);

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
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title={apiData.name}
        frameBorder='0' 
        allowFullScreen
      ></iframe>

      <div className="player-info">
        <p>Published: {apiData.published_at}</p>
        <p>Name: {apiData.name}</p>
        <p>Type: {apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
