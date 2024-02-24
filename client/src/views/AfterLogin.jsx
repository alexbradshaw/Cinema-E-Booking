import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "./CSS/AfterLogin.css";
import { getAllMovies } from '../utils/API';
import Navbar from './components/NavBarLogged';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useHistory

const AfterLogin = () => {
  const containerStyle = {
    backgroundColor: 'blue',
    // Add other styles as needed
  };

  const carouselStyle = {
    maxWidth: '800px', // Adjust the maximum width as needed
    margin: 'auto',    // Center the carousel
  };

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getAllMovies();
        setMovies(moviesData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const navigate = useNavigate();
  const handleBooking = (movieId) => {
    // Redirect to the booking page
    navigate('/booking');
  };

  return (
    <div className="screenBody">
        <h1>Cinema E-Booking</h1>

        <Navbar />
        
        {movies.length > 0 ? (
          <Carousel className="carouselStyle" axis="horizontal" showArrows={false} showIndicators={false}>
            {movies.map((movie) => (
              <div key={movie.id} className="movieContainer">
                <h2>{movie.title}</h2>
                <img src={movie.poster_url} alt={movie.title} />
                <div className="movieDetails">
                  <div className="ratingBar">
                    <span>Rating: {movie.rating}</span>
                  </div>
                  <div className="comingSoonBar">
                    <span>{movie.coming_soon ? 'Coming Soon' : 'Currently Running'}</span>
                  </div>
                  <div className="trailerLinkBar">
                    <a href={movie.trailer_url} target="_blank" rel="noopener noreferrer">
                      Watch Trailer
                    </a>
                  </div>
                  <button className="bookingButton" onClick={() => handleBooking(movie.id) }>
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </Carousel>
        ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AfterLogin;
