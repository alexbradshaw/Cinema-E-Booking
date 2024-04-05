import { Router } from 'express';
import { addAdmin, addCard, addCategory, addPromotion, addMovie, adminCheck, authCheck, changePassword, deleteCard, deletePromotion, editAccountStanding, editAdminPermissions, editPromotion, findCategories, findCategoriesList, findPromotions, findMovies, getAdminFields, getAuthedUser, getUserByNameOrID, getUsers, login, logout, resetPassword, searchCategories, searchMovies, signup, updateCard, updateUser, verifyAccount } from '../../controllers/index.js';

const router = Router();
// ? Key ?

// * Means public route * 
// ! Means auth protected route ! 
// !! Means admin protected route !! 


//? ** Admin Routes **

        // GET
        router.get('/admin', adminCheck);                             // !! GET route to check if user is admin and their permissions !! 
        router.get('/admin/accounts', getUsers);                      // !! GET route to get all users !! 
        router.get('/admin/fields', getAdminFields);                      // !! GET route to get fields for the Admin Model !! 
        
        // POST
        router.post('/admin', addAdmin);                    // !! POST route to create a new admin !! 
        router.post('/admin/movie', addMovie);                        // !! POST route to add a new movie !! 
        router.post('/admin/category', addCategory);                  // !! POST route to add a new category !! 
        router.post('/admin/promotion', addPromotion);                // !! POST route to add a new promotion !! 

        // PUT 
        router.put('/admin/standing/:id', editAccountStanding);     // !! PUT route to update account standing
        router.put('/admin/permissions/:id', editAdminPermissions); // !! PUT route to update admin permissions
        router.put('/admin/promotion/:id', editPromotion);            // !! PUT route to update promotion information

        // DELETE
        router.delete('/admin/promotion/:id', deletePromotion);       // !! DELETE route for a single promotion


//? ** Account Routes **

        // GET
        router.get('/account', getAuthedUser)                    // ! GET route to get the logged in user ! 
        router.get('/account/:usernameOrID', getUserByNameOrID)  // * GET to get a user based on username or id * 
        
        // POST
        router.post('/account/signup', signup);                  // * POST route to sign up * 
        router.post('/account/login', login);                    // * POST route to log in * 
        router.post('/account/logout', logout);                  // ! POST route to log out ! 
        router.post('/account/card', addCard);                   // ! POST route to add a new card !
        router.post('/account/reset', resetPassword);            // ! POST route to send a reset password email ! 
        router.post('/account/auth', authCheck);                 // ! POST route to check if user is still authenticated ! 
        
        // PUT
        router.put('/account', updateUser);                      // ! PUT route to update user ! 
        router.put('/account/card/:cardId', updateCard);         // ! PUT route for a payment method !
        router.put('/account/reset/:token', changePassword);     // ! PUT route for changing password from reset ! 
        router.put('/account/verify/:token', verifyAccount);     // ! PUT route for verifying an account from a confirmation email !
        
        // DELETE
        router.delete('/account/card/:cardId', deleteCard);      // ! DELETE route for a payment method !


//? ** Category Routes **

        // GET
        router.get('/categories', findCategories);               // * GET route for all categories/associated movies * 
        router.get('/categories/list', findCategoriesList);      // * GET route to get a slim list of categories * 
        router.get('/categories/:category', searchCategories);   // * GET route to find a list of associated movies by cat title * 


//? ** Promotion Routes **

        // GET
        router.get('/promotions', findPromotions);               // * GET route to find all promotions * 


//? **  Movie Routes **

        // GET
        router.get('/movies', findMovies);                       // * GET route to find all movies * 
        router.get('/movies/:title', searchMovies);              // * GET route to find a list of movies matching a title * 
    

export default router;