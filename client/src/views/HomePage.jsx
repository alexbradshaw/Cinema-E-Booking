import React, { memo } from 'react';
import { getAllMoviesSlim } from '../utils/API';
import MovieCard from './components/MovieCard';
import { Slide, Slider, ButtonBack, ButtonNext, CarouselProvider } from 'pure-react-carousel';
//import Slider from "./components/slider/Slider.jsx";
import { Card, CardGroup, Container, Header } from 'semantic-ui-react';
import "./CSS/HomePage.css";
//import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'semantic-ui-css/semantic.min.css';
import { useQuery } from '@tanstack/react-query';

const MovieSlider = memo(({ movies, header }) => {
    return (
      <>
        <Header size='large'>{header}</Header>
            <Slider infiniteLoop={true} showArrows={false}>
              <div className="slideContainer">
                <Slide>
                  <CardGroup itemsPerRow={5}>
                    {
                    movies.slice(0,5).map(
                        (movie) => 
                          <Card key={movie.id}>
                            <MovieCard movie={movie} key={movie.id} style={{ marginRight: '10px' }} /> 
                          </Card>
                      )
                    }
                  </CardGroup>
              </Slide>
            </div>
            </Slider>
      </>
    );
})

const Home = () => {

  const { isPending, data: movies } = useQuery({ queryKey: ['slimMovies'], queryFn: getAllMoviesSlim })

  return (
    <div className="carousel-container">
        { 
          isPending 
            ?
              <p>Loading...</p>
            :
            (
              
              <CarouselProvider orientation='horizontal' step={5} naturalSlideWidth={100} naturalSlideHeight={20} totalSlides={2}>
                
                {/*
                <ButtonBack className="carousel-button">Back</ButtonBack>
                <ButtonNext className="carousel-button">Next</ButtonNext>
                */}

                {/* Now Showing */}
                
                <MovieSlider movies={movies.filter((movie)=> new Date(movie.starts_showing).getTime() < Date.now())} header={'Now Showing'} />
            
                {/* Coming Soon */}
                
                <MovieSlider movies={movies.filter((movie)=> new Date(movie.starts_showing).getTime() > Date.now())} header={'Coming Soon'} />
              </CarouselProvider>
            )
          }
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


               {/*
          <CarouselProvider orientation='horizontal' step={5} naturalSlideWidth={100} naturalSlideHeight={20} totalSlides={2}>
            
            <ButtonBack className="carousel-button">Back</ButtonBack>
            <ButtonNext className="carousel-button">Next</ButtonNext>
            
        */}
        
            {/* Now Showing */}
            {/*
            <Header size='large'>{"Now Showing"}</Header>
            <Slider infiniteLoop={true} showArrows={false}>
              <div className="slideContainer">
                <Slide>
                  <CardGroup itemsPerRow={5}>
                    {movies.slice(0,5).map((movie) => 
                      <Card key={movie.id}>
                        <MovieCard movie={movie} key={movie.id} style={{ marginRight: '10px' }} /> 
                      </Card>
                    )}
                  </CardGroup>
                </Slide>
              </div>
            </Slider>

                    */}
            {/* Coming Soon */}
            {/*}
            </div>
            <Header size='large'>{"Coming Soon"}</Header>
            
            <Slider>
            <div className="slideContainer">
              <Slide>
                <CardGroup itemsPerRow={5}>
                  {movies.slice(0,5).map((movie) => 
                    <Card key={movie.id}>
                      <MovieCard movie={movie} key={movie.id} style={{ marginRight: '10px' }} /> 
                    </Card>
                  )}
                </CardGroup>
              </Slide>
            </div>
            </Slider>
          </CarouselProvider>
                  */}



          {/*
        {
          isPending 
            ?
              <p>Loading...</p>
            :
            (
              {/*
              <CarouselProvider orientation='horizontal' step={5} naturalSlideWidth={100} naturalSlideHeight={20} totalSlides={2}>
                
                <ButtonBack className="carousel-button">Back</ButtonBack>
                <ButtonNext className="carousel-button">Next</ButtonNext>
                
                {/* Now Showing */}
                {/*
                <MovieSlider movies={movies.filter((movie)=> new Date(movie.starts_showing).getTime() < Date.now())} header={'Now Showing'} />
            */}
                {/* Coming Soon */}
                {/*
                <MovieSlider movies={movies.filter((movie)=> new Date(movie.starts_showing).getTime() > Date.now())} header={'Coming Soon'} />
              </CarouselProvider>
            )
          */}