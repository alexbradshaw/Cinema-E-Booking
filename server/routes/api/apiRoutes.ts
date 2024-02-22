import { Router } from 'express';
import { addCategory, addMovie, authCheck, findCategories, findCategoriesList, findMovies, getAuthedUser, getUserByName, login, logout, searchCategories, searchMovies, signup }  from '../../controllers';

const router = Router();

//* Means that it is not protected 
//! Means that it is an auth protected route 

    /* Admin Routes */
        router.post('/admin/category', addCategory); //! POST route to add a new category
        router.post('/admin/movie', addMovie); //! POST route to add a new movie

    /* Account Routes */
        router.get('/account', getAuthedUser) //! GET route to get the logged in user
        router.get('/account/:username', getUserByName) //* GET to get a user based on username
        router.post('/account/auth', authCheck); //! POST route to check if user is still authenticated
        router.post('/account/signup', signup); //* POST route to sign up
        router.post('/account/login', login); //* POST route to log in
        router.post('/account/logout', logout); //! POST route to log out

    /*  Category Routes */
        router.get('/categories', findCategories); //* GET route to find all categories and associated movies
        router.get('/categories/list', findCategoriesList); //* GET route to get a list of categories without extra stuff attached 
        router.get('/categories/:category', searchCategories); //* GET route to find a list of associated movies by category title

    /*  Movie Routes */
        router.get('/movies', findMovies); //* GET route to find all movies
        router.get('/movies/:title', searchMovies); //* GET route to find a list of movies matching a title
    
export default router;