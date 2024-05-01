import { Router } from 'express';
import { confirmBooking, findMovies, findMoviesSlim, findShowtimesAndSeats, searchMovies } from '../../controllers/index.js';
import { checkAuth } from '../../utils/auth.js';

export const movies = Router();
export const moviesWithAuth = Router();

// ? Key ?

// * Means public route * 
// ! Means auth protected route ! 
// !! Means admin protected route !! 

    moviesWithAuth.use(checkAuth);

    // GET
    movies.get('/', findMovies);                       // * GET route to find all movies * 
    movies.get('/slim', findMoviesSlim);               // * GET route to find all movies * 
    movies.get('/showtimes', findShowtimesAndSeats);   // * GET route to find a list of showtimes * 
    movies.get('/:title', searchMovies);               // * GET route to find a list of movies matching a title * 

    // POST
    moviesWithAuth.post('/booking', confirmBooking);   // ! POST route to add a new booking !