import React, { useEffect, useState, useRef } from 'react';
import './TitleCards.css';

const TitleCards = ({ title }) => {
  const [apiData, setApiData] = useState([
    {
      "id": 950387,
      "original_language": "en",
      "original_title": "A Minecraft Movie",
      "overview": "Four misfits find themselves struggling with ordinary problems when they are suddenly pulled through a mysterious portal into the Overworld...",
      "popularity": 408.6823,
      "poster_path": "/iPPTGh2OXuIv6d7cwuoPkw8govp.jpg",
      "release_date": "2025-03-31",
      "title": "A Minecraft Movie",
      "vote_average": 6.176,
      "vote_count": 761
    },
    {
      "id": 1471014,
      "original_language": "en",
      "original_title": "Van Gogh by Vincent",
      "overview": "In a career that lasted only ten years, Vincent Van Gogh painted one subject more than any other: himself...",
      "popularity": 389.5467,
      "poster_path": "/z73X4WKZghBh5fri31o8P6vBEB2.jpg",
      "release_date": "2025-03-26",
      "title": "Van Gogh by Vincent",
      "vote_average": 6.125,
      "vote_count": 4
    },
    {
      "id": 1276073,
      "original_language": "ja",
      "original_title": "新幹線大爆破",
      "overview": "When panic erupts on a Tokyo-bound bullet train that will explode if it slows below 100 kph, authorities race against time to save everyone on board...",
      "popularity": 326.4027,
      "poster_path": "/qkTKtOHK9JEEOHgPQZ0dFtzs5ML.jpg",
      "release_date": "2025-04-23",
      "title": "Bullet Train Explosion",
      "vote_average": 6.707,
      "vote_count": 99
    },
    {
      "id": 324544,
      "original_language": "en",
      "original_title": "In the Lost Lands",
      "overview": "A queen sends the powerful and feared sorceress Gray Alys to the ghostly wilderness of the Lost Lands in search of a magical power...",
      "popularity": 288.7711,
      "poster_path": "/dDlfjR7gllmr8HTeN6rfrYhTdwX.jpg",
      "release_date": "2025-02-27",
      "title": "In the Lost Lands",
      "vote_average": 6.317,
      "vote_count": 300
    },
    {
      "id": 1225915,
      "original_language": "hi",
      "original_title": "ज्वेल थीफ: द हीस्ट बिगिन्स",
      "overview": "In this high-octane battle of wits and wills, ingenious con artist Rehan devises a diamond heist while trying to outsmart Rajan...",
      "popularity": 271.0703,
      "poster_path": "/eujLbO0kf1eqWC8XpHUJdtAVW2J.jpg",
      "release_date": "2025-04-25",
      "title": "Jewel Thief: The Heist Begins",
      "vote_average": 6.8,
      "vote_count": 16
    },
    {
      "id": 1233413,
      "original_language": "en",
      "original_title": "Sinners",
      "overview": "Trying to leave their troubled lives behind, twin brothers return to their hometown to start again, only to discover that an even greater evil is waiting...",
      "popularity": 229.0284,
      "poster_path": "/jYfMTSiFFK7ffbY2lay4zyvTkEk.jpg",
      "release_date": "2025-04-16",
      "title": "Sinners",
      "vote_average": 7.6,
      "vote_count": 458
    },
    {
      "id": 1124620,
      "original_language": "en",
      "original_title": "The Monkey",
      "overview": "When twin brothers find a mysterious wind-up monkey, a series of outrageous deaths tear their family apart...",
      "popularity": 208.1398,
      "poster_path": "/yYa8Onk9ow7ukcnfp2QWVvjWYel.jpg",
      "release_date": "2025-02-14",
      "title": "The Monkey",
      "vote_average": 5.9,
      "vote_count": 534
    },
    {
      "id": 1231413,
      "original_language": "en",
      "original_title": "Another Movie Example",
      "overview": "A gripping tale of love, loss, and redemption set against the backdrop of a post-apocalyptic world...",
      "popularity": 200.0,
      "poster_path": "/examplePoster.jpg",
      "release_date": "2025-05-01",
      "title": "Another Movie",
      "vote_average": 7.5,
      "vote_count": 700
    }
  ]);
  
  const cardsRef = useRef();

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
      <h2>{title || 'Upcoming Movies'}</h2>
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
            {/* Fallback to poster_path if backdrop_path is not available */}
            {!card.backdrop_path && card.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${card.poster_path}`}
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
