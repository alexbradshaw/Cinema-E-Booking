import React, { useEffect, useState } from 'react';
import { getAllMovies } from '../utils/API';
import Navbar from './components/Navbar';
import MovieCard from './components/MovieCard';
import { Slide, Slider, ButtonBack, ButtonNext, CarouselProvider } from 'pure-react-carousel';
import { Card, CardGroup } from 'semantic-ui-react';
import "./CSS/HomePage.css";
//import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'semantic-ui-css/semantic.min.css';

const Home = () => {

  let i = 0;
  const [movies, setMovies] = useState([]);

  {/*
  const genresAry = ["Action", "Adventure", "Animation", "Comedy", 
                    "Crime", "Documentary", "Drama", "Family", "Fantasy", 
                    "History", "Horror", "Music", "Mystery", "Romance", "Science Fiction", 
                    "TV Movie", "Thriller", "War", "Western"];
  let index = 0

  genreFilter = (genreSearch) => {
    const movies = this.state.movies.slice(0)
    return movies.filter(movie => movie.genres.includes(genreSearch))
  }
*/}

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
    <div className="carousel-container">
        {movies.length > 0 ? (
          <CarouselProvider orientation='horizontal' step={5} naturalSlideWidth={100} naturalSlideHeight={20} totalSlides={1}>
            <ButtonBack className="carousel-button">Back</ButtonBack>
            <ButtonNext className="carousel-button">Next</ButtonNext>
            <CardGroup>
              {movies.map((movie) => 
                <Card key={movie.id}>
                  <MovieCard movie={movie} key={movie.id} style={{ marginRight: '10px' }} /> 
                </Card>
              )}
            </CardGroup>

            {/*
            <Slider className="carousel-slider" style={{ display: 'flex', flexdirection: 'row' }}>
              {movies.map((movie) => 
                <Slide index={i++} key={movie.id}>
                  <MovieCard movie={movie} key={movie.id} style={{ marginRight: '10px' }} />
                </Slide>
            )}
            </Slider>
            */}
          </CarouselProvider>
        ) : (
          <p>Loading...</p>
        )}

    </div>
  );
};

export default Home;


     {/*
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
                    <span>{(new Date(movie.starts_showing)).getTime() > Date.now() ? 'Coming Soon' : 'Currently Running'}</span>
                  </div>
                  <div className="trailerLinkBar">
                    <iframe width="560" height="315" src={"https://www.youtube.com/embed/" + movie.trailer_url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        ) : (
        <p>Loading...</p>
      )}
      
      /*}

      {/*
      <MovieRow
        key={uuidv4()}
        title="Now in Theaters"
        movies={movies}
      />
      */}