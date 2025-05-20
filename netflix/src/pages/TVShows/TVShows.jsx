import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import rightArrow from '../../assets/right_arrow.png';
import { styled } from '@mui/material/styles';
import './TVShows.css'
function MovieDetail() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState({
    displayName: 'Anonymous',
    avatar: 'https://i.pravatar.cc/150?u=anonymous',
  });

  useEffect(() => {
    const fetchMovies = async () => {
      const url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
      const headers = {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTIyOThmMzlkYWFkOTlkYjU5YTExMTk2YWU1OGQ3MyIsIm5iZiI6MS43NDYwMjY1MTQ1MTEwMDAyZSs5LCJzdWIiOiI2ODEyNDAxMmRlMDI4NDcyNjdhMGViMmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.wCTfAGApgNLfsltAdM_otpe4q_RDH1eEzBmER-nOVAs"
      };

      const res = await fetch(url, { headers });
      const data = await res.json();
      setMovies(data.results);
      setMovie(data.results[0]);
      fetchTrailer(data.results[0].id, headers);
      fetchReviews(data.results[0].id);
      setLoading(false);
    };

    fetchMovies().catch(err => {
      console.error('Error:', err);
      setLoading(false);
    });
  }, []);

  const ArrowButton = styled(Button)(({ disabled }) => ({
    minWidth: 0,
    padding: 8,
    borderRadius: '50%',
    backgroundColor: disabled ? '#ccc' : '#ffffff',
    '&:hover': {
      backgroundColor: disabled ? '#ccc' : '#f0f0f0',
    },
  }));

  const fetchTrailer = async (movieId, headers) => {
    const vidRes = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, { headers });
    const vidData = await vidRes.json();
    const trailer = vidData.results.find(v => v.site === 'YouTube');
    setTrailerKey(trailer?.key || '');
  };

  const fetchReviews = async (movieId) => {
    const reviewsSnapshot = await getDocs(collection(db, 'Movies', movieId.toString(), 'reviews'));
    const reviewsList = reviewsSnapshot.docs.map(doc => doc.data());
    setReviews(reviewsList);
  };

  const handleSubmitReview = async () => {
    if (!reviewText.trim()) return;
    await addReview(movie.id, reviewText);
    setReviewText('');
    fetchReviews(movie.id);
  };

  const addReview = async (movieId, reviewText) => {
    const reviewsRef = doc(db, "Movies", movieId.toString(), "reviews", new Date().getTime().toString());

    try {
      await setDoc(reviewsRef, {
        reviewText: reviewText,
        user: user.displayName,
        avatar: user.avatar,
        createdAt: new Date(),
      });
      fetchReviews(movieId);
    } catch (error) {
      console.error("Error adding review: ", error);
    }
  };

  const openTrailer = () => {
    if (trailerKey) {
      window.open(`https://www.youtube.com/watch?v=${trailerKey}`, '_blank');
    }
  };

  const changeMovie = (index) => {
    if (index >= 0 && index < movies.length) {
      const selectedMovie = movies[index];
      setCurrentIndex(index);
      setMovie(selectedMovie);
      setReviewText('');
      setTrailerKey('');
      fetchReviews(selectedMovie.id);

      const headers = {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTIyOThmMzlkYWFkOTlkYjU5YTExMTk2YWU1OGQ3MyIsIm5iZiI6MS43NDYwMjY1MTQ1MTEwMDAyZSs5LCJzdWIiOiI2ODEyNDAxMmRlMDI4NDcyNjdhMGViMmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.wCTfAGApgNLfsltAdM_otpe4q_RDH1eEzBmER-nOVAs"
      };
      fetchTrailer(selectedMovie.id, headers);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie details not available.</div>;

  return (
    <Grid container className="movie-detail-container" sx={{ height: '100vh' }}>
      <Grid
        item xs={12} md={6}
        className="movie-detail-backdrop"
        sx={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          color: "white",
          padding: { xs: '10px', md: '20px' },
          height: { xs: '50vh', md: '100vh' },
          position: 'relative',
        }}
      >
        <div className="movie-info" style={{ paddingTop: '350px', maxWidth: '1000px', margin: '0 auto', wordWrap: 'break-word' }}>
          <h2 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px', color: 'red' }}>
            {movie.original_title}
          </h2>
          <div
            style={{
              position: 'absolute',
              right: 20,
              top: '55%',
              transform: 'translateY(-50%)',
              zIndex: 10
            }}
          >
            <ArrowButton
              onClick={() => changeMovie(currentIndex + 1)}
              disabled={currentIndex >= movies.length - 1}
            >
              <img
                src={rightArrow}
                alt="Next"
                style={{ width: 24, height: 24, filter: 'invert(1)' }}
                draggable={false}
              />
            </ArrowButton>
          </div>

          <h2 style={{ fontSize: '36px', fontWeight: '500', margin: '5px 0' }}>
            Language: {movie.original_language.toUpperCase()}
          </h2>

          <h2 style={{ fontSize: '36px', fontWeight: '500', margin: '5px 0' }}>
            Release Date: {movie.release_date}
          </h2>

          <h5 style={{ fontSize: '20px', margin: '20px 0', whiteSpace: 'normal', overflowWrap: 'break-word' }}>
            {movie.overview}
          </h5>

          {trailerKey && (
            <button
              onClick={openTrailer}
              style={{
                background: "rgba(255,255,255,0.2)",
                color: "white",
                padding: "10px 20px",
                border: "none",
                cursor: "pointer",
                fontSize: "18px",
                borderRadius: "4px",
                transition: "background 0.3s"
              }}
              onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.4)"}
              onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
            >
              ▶ Play Trailer
            </button>
          )}
        </div>
      </Grid>

      <Grid
        item xs={12} md={6}
        className="review-section"
        sx={{
          backgroundColor: "black",
          height: { xs: 'auto', md: '100vh' },
          padding: { xs: '10px', md: '20px' }
        }}
      >
        <Grid container spacing={2} direction="column">
          <Grid item>
            <h5 style={{ color: "#A4A4A4", fontWeight: "100", marginBottom: "16px" }}>ADD REVIEW</h5>
            <TextField
              onChange={(e) => setReviewText(e.target.value)}
              size="small"
              label="Review"
              variant="outlined"
              fullWidth
              sx={{ backgroundColor: "white", borderRadius: "5px" }}
              value={reviewText}
            />
            <Button
              onClick={handleSubmitReview}
              sx={{ mt: 1, bgcolor: "red", color: "white" }}
              variant="contained"
              fullWidth
            >
              Submit
            </Button>
          </Grid>

          <Grid item>
            <h5 style={{ color: "#A4A4A4", fontWeight: "100", marginTop: "40px" }}>SHOW REVIEW</h5>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <Stack
                  key={index}
                  direction="row"
                  spacing={2}
                  sx={{ marginTop: "10px", borderBottom: "1px solid #333", paddingBottom: "10px" }}
                >
                  <Avatar alt={review.user} src={review.avatar} />
                  <div>
                    <p style={{ margin: 0, fontWeight: 'bold', color: 'white' }}>{review.user}</p>
                    <p style={{ margin: 0, color: 'white' }}>{review.reviewText}</p>
                  </div>
                </Stack>
              ))
            ) : (
              <p style={{ color: '#888' }}>No reviews yet.</p>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MovieDetail;
