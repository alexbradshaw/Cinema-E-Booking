import { NextFunction, Request, Response, Router } from 'express';
import { addAdmin, addCard, addCategory, addPromotion, addMovie, adminCheck, authCheck, changePassword, deleteCard, deletePromotion, editAccountStanding, editAdminPermissions, editPromotion, findCategories, findCategoriesList, findPromotions, findMovies, getAdminFields, getAuthedUser, getUserByNameOrID, getUsers, login, logout, resetPassword, searchCategories, searchMovies, signup, updateCard, updateUser, verifyAccount } from '../../controllers/index.js';

const router = Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
    console.log('Time: ', Date.now())
    next();
}


const account = Router();
const admin = Router(); 
const categories = Router();
const movies = Router();
const promotions = Router();

router.use('/account', account);
router.use('/admin', admin);
router.use('/categories', categories);
router.use('/movies', movies);
router.use('/promotions', promotions);


// ? Key ?

// * Means public route * 
// ! Means auth protected route ! 
// !! Means admin protected route !! 


// //? ** Admin Routes **

        admin.use(timeLog);

        // GET
        admin.get('/', adminCheck);                            // !! GET route to check if user is admin and their permissions !! 
        admin.get('/accounts', getUsers);                      // !! GET route to get all users !! 
        admin.get('/fields', getAdminFields);                  // !! GET route to get fields for the Admin Model !! 
        
        // POST
        admin.post('/', addAdmin);                             // !! POST route to create a new admin !! 
        admin.post('/movie', addMovie);                        // !! POST route to add a new movie !! 
        admin.post('/category', addCategory);                  // !! POST route to add a new category !! 
        admin.post('/promotion', addPromotion);                // !! POST route to add a new promotion !! 

        // PUT 
        admin.put('/standing/:id', editAccountStanding);       // !! PUT route to update account standing
        admin.put('/permissions/:id', editAdminPermissions);   // !! PUT route to update admin permissions
        admin.put('/promotion/:id', editPromotion);            // !! PUT route to update promotion information

        // DELETE
        admin.delete('/promotion/:id', deletePromotion);       // !! DELETE route for a single promotion


        
//? ** Account Routes **

        // GET
        account.get('/', getAuthedUser)                   // ! GET route to get the logged in user ! 
        account.get('/:usernameOrID', getUserByNameOrID)  // * GET to get a user based on username or id * 
        
        // POST
        account.post('/signup', signup);                  // * POST route to sign up * 
        account.post('/login', login);                    // * POST route to log in * 
        account.post('/logout', logout);                  // ! POST route to log out ! 
        account.post('/card', addCard);                   // ! POST route to add a new card !
        account.post('/reset', resetPassword);            // ! POST route to send a reset password email ! 
        account.post('/auth', authCheck);                 // ! POST route to check if user is still authenticated ! 
        
        // PUT
        account.put('/', updateUser);                     // ! PUT route to update user ! 
        account.put('/card/:cardId', updateCard);         // ! PUT route for a payment method !
        account.put('/reset/:token', changePassword);     // ! PUT route for changing password from reset ! 
        account.put('/verify/:token', verifyAccount);     // ! PUT route for verifying an account from a confirmation email !
        
        // DELETE
        account.delete('/card/:cardId', deleteCard);      // ! DELETE route for a payment method !
        


//? ** Category Routes **

        // GET
        categories.get('/', findCategories);               // * GET route for all categories/associated movies * 
        categories.get('/list', findCategoriesList);       // * GET route to get a slim list of categories * 
        categories.get('/:category', searchCategories);    // * GET route to find a list of associated movies by cat title * 



//? ** Promotion Routes **

        // GET
        promotions.get('/', findPromotions);               // * GET route to find all promotions * 



//? **  Movie Routes **

        // GET
        movies.get('/', findMovies);                       // * GET route to find all movies * 
        movies.get('/:title', searchMovies);               // * GET route to find a list of movies matching a title * 




export default router;