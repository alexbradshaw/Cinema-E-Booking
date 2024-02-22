import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
//import { Carousel } from 'react-elastic-carousel';
import "./CSS/HomePage.css";
import { getAllMovies } from '../utils/API';
import Navbar from './components/Navbar';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import MovieRow from './components/MovieRow';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
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
                </div>
              </div>
            ))}
          </Carousel>
        ) : (
        <p>Loading...</p>
      )}
      
      {/*
      <MovieRow
        key={uuidv4()}
        title="Now in Theaters"
        movies={movies}
      />
      */}
    </div>
  );
};

export default Home;
