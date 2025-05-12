import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Dùng useNavigate để chuyển hướng
import './MyList.css';

const imagePath = "https://image.tmdb.org/t/p/w500";
const baseUrl = "https://api.themoviedb.org/3";

const fetchTrending = async (timeWindow = "day") => {
  try {
    const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTIyOThmMzlkYWFkOTlkYjU5YTExMTk2YWU1OGQ3MyIsIm5iZiI6MS43NDYwMjY1MTQ1MTEwMDAyZSs5LCJzdWIiOiI2ODEyNDAxMmRlMDI4NDcyNjdhMGViMmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.wCTfAGApgNLfsltAdM_otpe4q_RDH1eEzBmER-nOVAs";  // Đảm bảo dùng token hợp lệ
    const response = await fetch(`${baseUrl}/trending/all/${timeWindow}?language=en-US`, {
      headers: { "Authorization": token },
    });
    const data = await response.json();
    return data?.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
  }
};

const MyList = () => {
  const [movies, setMovies] = useState([]);
  const [timeWindow, setTimeWindow] = useState("day");
  const navigate = useNavigate();  // Để chuyển hướng khi người dùng nhấp vào một bộ phim

  useEffect(() => {
    const fetchMovies = async () => {
      const fetchedMovies = await fetchTrending(timeWindow);
      if (fetchedMovies) setMovies(fetchedMovies);
    };
    fetchMovies();
  }, [timeWindow]);

  const handleMovieClick = (movieId) => {
    // Điều hướng đến trang chi tiết của bộ phim
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="container" style={{ margin: '20px' }}>
      <div className="trendingHeader" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
      }}>
        <h2 className="trending-title">Trending</h2>
        <div className="timeWindowButtons">
          {["day", "week"].map((type) => (
            <button
              key={type}
              onClick={() => setTimeWindow(type)}
              className={`time-button ${timeWindow === type ? 'active' : ''}`}
            >
              {type === "day" ? "Today" : "This Week"}
            </button>
          ))}
        </div>
      </div>

      <div className="movieGrid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '20px'
      }}>
        {movies?.map(item => {
          const posterUrl = item?.poster_path
            ? `${imagePath}${item.poster_path}`
            : "https://via.placeholder.com/150";
          const rating = item?.vote_average?.toFixed(1) || "N/A";

          return (
            <div key={item?.id} className="movie-box" style={{
              textAlign: 'center',
              cursor: 'pointer',
              borderRadius: '10px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease-in-out',
            }} onClick={() => handleMovieClick(item.id)}>
              <img
                src={posterUrl}
                alt={item?.title || item?.name}
                onError={(e) => e.target.src = "https://via.placeholder.com/150"}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                }}
              />
              {/* Rating badge */}
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: '#fff',
                padding: '4px 8px',
                borderRadius: '5px',
                fontSize: '0.9rem',
              }}>
                {rating} ⭐
              </div>

              {/* Title overlay */}
              <div className="movie-title" style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: '#fff',
                padding: '8px',
                fontWeight: '600',
                fontSize: '1rem',
                textAlign: 'center',
              }}>
                {item?.title || item?.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyList;
