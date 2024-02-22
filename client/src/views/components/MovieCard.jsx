import React from "react";
import { Link } from "react-router-dom";
import "../CSS/MovieCard.css";
//import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";

const IMAGE_BASE_URL = "http://image.tmdb.org/t/p/";
const POSTER_SIZE = "w342";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card-wrapper" data-testid="movie-card">
      {movie.poster_path ? (
        <Link to={`/movie/${movie?.id || movie?._id}`}>
          <figure className="movie-card">
            {movie.name}
            <img
              src={`${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_url}`}
              alt={`${movie.title} poster`}
            />
            <figcaption>{movie.title}</figcaption>
          </figure>
        </Link>
      ) : (
        <p>no poster</p>
      )}
    </div>
  );
};

export default MovieCard;