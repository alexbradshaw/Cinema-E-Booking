import { Router } from 'express';
import { addMovie, authCheck, login, logout, signup, search } from '../../controllers';

const router = Router();

//! * Means that it's an auth protected route 

router.post('/auth', authCheck); // POST* route to check if user is still authenticated

router.post('/signup', signup); // POST route to sign up
router.post('/login', login); // POST route to log in
router.post('/logout', logout); // POST* route to log out

router.get('/movie/:title', search); // GET route to find a list of movies matching a title
router.post('/movie', addMovie); // POST* route to add a new movie

export default router;