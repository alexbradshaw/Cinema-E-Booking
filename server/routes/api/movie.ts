import { Router } from 'express';
import { findMovies, searchMovies } from '../../controllers/index.js';

const movies = Router();

// GET
movies.get('/', findMovies);                       // * GET route to find all movies * 
movies.get('/:title', searchMovies);               // * GET route to find a list of movies matching a title * 

export default movies;