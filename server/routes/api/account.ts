import { Router } from 'express';
import { getAuthedUser, getUserByNameOrID, signup, login, logout, addCard, resetPassword, authCheck, updateUser, updateCard, changePassword, verifyAccount, deleteCard } from '../../controllers/index.js';
import { checkAuth } from '../../utils/auth.js';

export const account = Router();
export const accountWithAuth = Router();

// ? Key ?

// * Means public route * 
// ! Means auth protected route ! 
// !! Means admin protected route !! 

    accountWithAuth.use(checkAuth);

    // GET
    account.get('/:usernameOrID', getUserByNameOrID);         // * GET to get a user based on username or id * 
    accountWithAuth.get('/', getAuthedUser);                  // ! GET route to get the logged in user ! 

    // POST
    account.post('/signup', signup);                          // * POST route to sign up * 
    account.post('/login', login);                            // * POST route to log in * 
    accountWithAuth.post('/logout', logout);                  // ! POST route to log out ! 
    accountWithAuth.post('/card', addCard);                   // ! POST route to add a new card !
    accountWithAuth.post('/reset', resetPassword);            // ! POST route to send a reset password email ! 
    accountWithAuth.post('/auth', authCheck);                 // ! POST route to check if user is still authenticated ! 

    // PUT
    accountWithAuth.put('/', updateUser);                     // ! PUT route to update user ! 
    accountWithAuth.put('/card/:cardId', updateCard);         // ! PUT route for a payment method !
    accountWithAuth.put('/reset/:token', changePassword);     // ! PUT route for changing password from reset ! 
    accountWithAuth.put('/verify/:token', verifyAccount);     // ! PUT route for verifying an account from a confirmation email !

    // DELETE
    accountWithAuth.delete('/card/:cardId', deleteCard);      // ! DELETE route for a payment method !