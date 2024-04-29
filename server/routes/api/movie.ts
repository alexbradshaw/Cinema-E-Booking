import { Router } from 'express';
import { findMovies, findMoviesSlim, searchMovies } from '../../controllers/index.js';

const movies = Router();

// ? Key ?

// * Means public route * 
// ! Means auth protected route ! 
// !! Means admin protected route !! 

    // GET
    movies.get('/', findMovies);                       // * GET route to find all movies * 
    movies.get('/slim', findMoviesSlim);                       // * GET route to find all movies * 
    movies.get('/:title', searchMovies);               // * GET route to find a list of movies matching a title * 

export default movies;