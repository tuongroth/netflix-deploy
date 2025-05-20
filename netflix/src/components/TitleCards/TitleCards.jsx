import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './TitleCards.css';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]); // Dữ liệu phim
  const [genres, setGenres] = useState([]);   // Dữ liệu thể loại
  const cardsRef = useRef();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedGenre = queryParams.get('genre') || '';

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTIyOThmMzlkYWFkOTlkYjU5YTExMTk2YWU1OGQ3MyIsIm5iZiI6MS43NDYwMjY1MTQ1MTEwMDAyZSs5LCJzdWIiOiI2ODEyNDAxMmRlMDI4NDcyNjdhMGViMmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.wCTfAGApgNLfsltAdM_otpe4q_RDH1eEzBmER-nOVAs',
    },
  };

  // Fetch danh sách thể loại
  useEffect(() => {
    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
      .then((res) => res.json())
      .then((res) => setGenres(res.genres || []))
      .catch((err) => console.error('Error fetching genres:', err));
  }, []);

  // Fetch phim theo thể loại hoặc theo category
  useEffect(() => {
    let url = '';

    if (selectedGenre) {
      url = `https://api.themoviedb.org/3/discover/movie?with_genres=${selectedGenre}&language=en-US&page=1`;
    } else {
      url = `https://api.themoviedb.org/3/movie/${category || 'now_playing'}?language=en-US&page=1`;
    }

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => setApiData(data.results || []))
      .catch((err) => console.error('Error fetching data:', err));
  }, [category, selectedGenre]);

  // Xử lý sự kiện cuộn ngang
  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const refCurrent = cardsRef.current;
    if (refCurrent) {
      refCurrent.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (refCurrent) {
        refCurrent.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className="title-cards">
      <h2>{title || 'Popular Movies'}</h2>

      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} key={index} className="card">
            {card.backdrop_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                alt={card.original_title}
              />
            )}
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
