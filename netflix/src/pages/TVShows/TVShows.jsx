import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import './TVShows.css';

function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      const url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
      const headers = {
        accept: "application/json",
        Authorization: "Bearer YOUR_TOKEN_HERE"
      };
      const resp = await fetch(url, { headers });
      const data = await resp.json();
      setMovie(data.results[0]);
      setLoading(false);

      // tiếp tục fetch trailer
      const vidUrl = `https://api.themoviedb.org/3/movie/${data.results[0].id}/videos?language=en-US`;
      const vidResp = await fetch(vidUrl, { headers });
      const vidData = await vidResp.json();
      // lấy trailer đầu tiên có site = "YouTube"
      const youtubeTrailer = vidData.results.find(v => v.site === 'YouTube');
      setTrailerKey(youtubeTrailer?.key || '');
    };

    fetchMovie().catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie details not available.</div>;

  const openTrailer = () => {
    if (trailerKey) {
      window.open(`https://www.youtube.com/watch?v=${trailerKey}`, '_blank');
    }
  };

  return (
    <Grid container spacing={2}>
      {/* Poster & Info */}
      <Grid item sm={4}>
        <div
          className="movie-container"
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
        >
          <div className="movie-info">
            <h2 className="movie-title">{movie.original_title}</h2>
            <h2 className="movie-subtitle">Language: {movie.original_language.toUpperCase()}</h2>
            <h2 className="movie-subtitle">Release Date: {movie.release_date}</h2>
            <h5 className="movie-overview">{movie.overview}</h5>
            {trailerKey && (
              <button className="play-trailer" onClick={openTrailer}>
                ▶ Play Trailer
              </button>
            )}
          </div>
        </div>
      </Grid>

      {/* Add Review */}
      <Grid item sm={4}><div>
        <div>
          <h2>Add Review</h2>
        </div>
      
        <div>
          <h2>Show Review</h2>
          {/* danh sách review */}
        </div></div>
      </Grid>
    </Grid>
  );
}

export default MovieDetail;
