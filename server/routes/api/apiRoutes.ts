import { Router } from 'express';
import { addMovie, authCheck, findMovies, getAuthedUser, getUserByName, login, logout, signup, search } from '../../controllers';

const router = Router();

//* Means that it is not protected 
//! Means that it is an auth protected route 

/* Account Routes */
    router.get('/account', getAuthedUser) //! GET route to get the logged in user
    router.get('/account/:username', getUserByName) //* GET to get a user based on username
    router.post('/account/auth', authCheck); //! POST route to check if user is still authenticated
    router.post('/account/signup', signup); //* POST route to sign up
    router.post('/account/login', login); //* POST route to log in
    router.post('/account/logout', logout); //! POST route to log out

/*  Movie Routes */
    router.post('/movie', addMovie); //! POST route to add a new movie
    router.get('/movies', findMovies); //* GET route to find all movies
    router.get('/movies/:title', search); //* GET route to find a list of movies matching a title

    
export default router;