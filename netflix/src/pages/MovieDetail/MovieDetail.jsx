import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const imagePath = "https://image.tmdb.org/t/p/w500";

const MovieDetail = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTIyOThmMzlkYWFkOTlkYjU5YTExMTk2YWU1OGQ3MyIsIm5iZiI6MS43NDYwMjY1MTQ1MTEwMDAyZSs5LCJzdWIiOiI2ODEyNDAxMmRlMDI4NDcyNjdhMGViMmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.wCTfAGApgNLfsltAdM_otpe4q_RDH1eEzBmER-nOVAs";

        // Fetch movie details
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
          headers: { Authorization: token },
        });
        if (!response.ok) {
          setError(`Error fetching movie details: ${response.status}`);
          return;
        }
        const data = await response.json();
        setMovieDetails(data);

        // Fetch cast
        const castRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, {
          headers: { Authorization: token },
        });
        const castData = await castRes.json();
        setCast(castData.cast);

        // Fetch trailer
        const videoRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, {
          headers: { Authorization: token },
        });
        const videoData = await videoRes.json();
        const trailer = videoData.results.find(v => v.type === "Trailer" && v.site === "YouTube");
        setTrailerKey(trailer?.key || null);
      } catch (err) {
        console.error(err);
        setError("Failed to load data.");
      }
    };

    fetchMovieData();
  }, [id]);

  if (error) return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>{error}</div>;
  if (!movieDetails) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;

  return (
    <div
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '60px 0',
      }}
    >
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        display: 'flex',
        gap: '30px',
        padding: '20px',
        borderRadius: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      }}>
        <img
          src={`${imagePath}${movieDetails.poster_path}`}
          alt={movieDetails.title}
          onClick={() => setShowTrailer(prev => !prev)}
          style={{
            cursor: 'pointer',
            width: '300px',
            borderRadius: '10px',
            objectFit: 'cover',
            boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
            transition: 'transform 0.3s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '2em', marginBottom: '10px', color: '#333' }}>{movieDetails.title}</h2>
          <p style={{ color: '#666', fontStyle: 'italic' }}>
            Release Date: {movieDetails.release_date} | Rating: {movieDetails.vote_average} ⭐
          </p>
          <p style={{ margin: '10px 0', fontSize: '0.95rem', color: '#444' }}>
            <strong>Original Title:</strong> {movieDetails.original_title} <br />
            <strong>Language:</strong> {movieDetails.original_language?.toUpperCase()} <br />
            <strong>Popularity:</strong> {movieDetails.popularity?.toFixed(1)} <br />
            <strong>Vote Count:</strong> {movieDetails.vote_count}
          </p>
          <p style={{ margin: '20px 0', lineHeight: '1.6', color: '#333' }}>{movieDetails.overview}</p>
          <div style={{ color: '#444' }}>
            <strong>Genres: </strong>
            {movieDetails.genres?.map((genre, index) => (
              <span key={genre.id}>
                {genre.name}{index < movieDetails.genres.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        </div>
      </div>

      {showTrailer && trailerKey && (
        <div style={{ margin: '30px auto', maxWidth: '900px' }}>
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ borderRadius: '10px', boxShadow: '0 4px 16px rgba(0,0,0,0.4)' }}
          ></iframe>
        </div>
      )}

      <h3 style={{ fontSize: '1.5em', marginTop: '30px', color: '#fff', textAlign: 'center' }}>Cast</h3>
      <div style={{
        display: 'flex',
        gap: '15px',
        overflowX: 'scroll',
        marginTop: '10px',
        padding: '0 20px 40px',
      }}>
        {cast.length === 0 && <p>No cast found</p>}
        {cast.map((item) => (
          <div key={item.id} style={{ minWidth: '150px', textAlign: 'center' }}>
            <img
              src={`${imagePath}${item.profile_path}`}
              alt={item.name}
              style={{
                width: '100%',
                height: '225px',
                objectFit: 'cover',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              }}
            />
            <p style={{ marginTop: '10px', fontWeight: 'bold', color: '#fff' }}>{item.name}</p>
            <p style={{ fontSize: '0.85rem', color: '#ccc' }}>{item.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;
