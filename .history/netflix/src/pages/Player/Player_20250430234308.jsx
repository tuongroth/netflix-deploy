import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Player = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [apiData, setApiData] = useState(null); // Ban đầu null để xác định trạng thái chưa có dữ liệu
  const [loading, setLoading] = useState(true);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTIyOThmMzlkYWFkOTlkYjU5YTExMTk2YWU1OGQ3MyIsIm5iZiI6MS43NDYwMjY1MTQ1MTEwMDAyZSs5LCJzdWIiOiI2ODEyNDAxMmRlMDI4NDcyNjdhMGViMmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.wCTfAGApgNLfsltAdM_otpe4q_RDH1eEzBmER-nOVAs'
    }
  };

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(response => response.json())
      .then(data => {
        const trailer = data.results?.find(
          video => video.type === 'Trailer' && video.site === 'YouTube'
        );
        setApiData(trailer || null);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className='player'>
      <img
        src={back_arrow_icon} onbord={}
        alt="Back"
        className="back-button"
        onClick={() => navigate(-1)}
      />

      {loading ? (
        <p className="loading">Loading trailer...</p>
      ) : apiData ? (
        <>
          <iframe
            width="90%"
            height="90%"
            src={`https://www.youtube.com/embed/${apiData.key}`}
            title="trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>

          <div className="player-info">
            <p>Published: {new Date(apiData.published_at).toLocaleDateString()}</p>
            <p>Name: {apiData.name}</p>
            <p>Type: {apiData.type}</p>
          </div>
        </>
      ) : (
        <p className="no-trailer">No trailer available for this movie.</p>
      )}
    </div>
  );
};

export default Player;
