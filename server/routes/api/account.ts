import { Router } from 'express';
import { getAuthedUser, getUserByNameOrID, signup, login, logout, addCard, resetPassword, authCheck, updateUser, updateCard, changePassword, verifyAccount, deleteCard } from '../../controllers/index.js';
import { verifyToken } from '../../utils/auth.js';



const account = Router();

// GET
account.get('/', getAuthedUser);                   // ! GET route to get the logged in user ! 
account.get('/:usernameOrID', getUserByNameOrID);  // * GET to get a user based on username or id * 

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

export default account;