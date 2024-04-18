import { Router } from 'express';
import { findPromotions } from '../../controllers/index.js';

const promotions = Router();

// ? Key ?

// * Means public route * 
// ! Means auth protected route ! 
// !! Means admin protected route !! 

    // GET
    promotions.get('/', findPromotions);               // * GET route to find all promotions * 

export default promotions;