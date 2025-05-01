import React, { useEffect, useState, useRef } from 'react';
import './TitleCards.css';

const TitleCards = ({ title }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      // If you're using API Key with TMDb
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTIyOThmMzlkYWFkOTlkYjU5YTExMTk2YWU1OGQ3MyIsIm5iZiI6MS43NDYwMjY1MTQ1MTEwMDAyZSs5LCJzdWIiOiI2ODEyNDAxMmRlMDI4NDcyNjdhMGViMmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.wCTfAGApgNLfsltAdM_otpe4q_RDH1eEzBmER-nOVAs',
    }
  };

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/${now_playing?language=en-US&page=1&api_key=YOUR_API_KEY_HERE', options)
      .then(response => response.json())
      .then(data => setApiData(data.results))
      .catch(err => console.error("Error fetching data:", err));
  }, []); // Empty dependency array means it only runs once after the initial render

  // Function to handle mouse wheel
  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const refCurrent = cardsRef.current;
    refCurrent.addEventListener('wheel', handleWheel, { passive: false });

    // Clean up the event listener
    return () => {
      refCurrent.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="title-cards">
      <h2>{title || 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card) => (
          <div className="card" key={card.id}>
            {/* Check if backdrop_path exists before rendering the image */}
            {card.backdrop_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                alt={card.original_title}
              />
            )}
            <p>{card.original_title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
