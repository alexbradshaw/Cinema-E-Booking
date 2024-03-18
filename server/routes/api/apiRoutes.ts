import { Router } from 'express';
import { addCategory, addMovie, addPromotion, adminCheck, authCheck, changePassword, findCategories, findCategoriesList, findMovies, findPromotions, getAuthedUser, getUserByNameOrID, getUsers, login, logout, resetPassword, searchCategories, searchMovies, signup, updateUser, verifyAccount }  from '../../controllers';

const router = Router();

//* Means that it is not protected 
//! Means that it is an auth protected route 
//!! Means that it is an admin protected route 

    /* Admin Routes */
        router.get('/admin', adminCheck); //!! GET route to check if user is admin and their permissions
        router.get('/admin/accounts', getUsers); //!! GET route to get all users
        router.post('/admin/category', addCategory); //!! POST route to add a new category
        router.post('/admin/promotion', addPromotion); //!! POST route to add a new promotion
        router.post('/admin/movie', addMovie); //!! POST route to add a new movie

    /* Account Routes */
        router.get('/account', getAuthedUser) //! GET route to get the logged in user
        router.put('/account', updateUser); //! PUT route to update user
        router.get('/account/:usernameOrID', getUserByNameOrID) //* GET to get a user based on username or id
        router.post('/account/auth', authCheck); //! POST route to check if user is still authenticated
        router.post('/account/signup', signup); //* POST route to sign up
        router.post('/account/login', login); //* POST route to log in
        router.post('/account/logout', logout); //! POST route to log out
        router.post('/account/reset', resetPassword); //! POST route to send a reset password email 
        router.put('/account/reset/:token', changePassword); //! PUT route for changing password from reset
        router.put('/account/verify/:token', verifyAccount); //! PUT route for verifying an account from a confirmation email

    /* Category Routes */
        router.get('/categories', findCategories); //* GET route to find all categories and associated movies
        router.get('/categories/list', findCategoriesList); //* GET route to get a list of categories without extra stuff attached 
        router.get('/categories/:category', searchCategories); //* GET route to find a list of associated movies by category title

    /* Promotion Routes */
        router.get('/promotions', findPromotions); //* GET route to find all promotions

    /*  Movie Routes */
        router.get('/movies', findMovies); //* GET route to find all movies
        router.get('/movies/:title', searchMovies); //* GET route to find a list of movies matching a title
    
export default router;