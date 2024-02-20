import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "./CSS/HomePage.css";
import { getAllMovies } from '../utils/API';
import Navbar from './components/Navbar';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Home = () => {
  const containerStyle = {
    backgroundColor: 'white',
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
    <div>
    <h1>Movie Gallery</h1>

    <Navbar />
    {movies.length > 0 ? (
      <Carousel axis="horizontal">
        {movies.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <img src={movie.poster_url} alt={movie.title} />
            {/* Add other movie details as needed */}
          </div>
        ))}
      </Carousel>
      ) : (
      <p>Loading...</p>
    )}
  </div>
  );
};

export default Home;
