import { Router } from 'express';
import { findPromotions } from '../../controllers/index.js';

const promotions = Router();


// GET
promotions.get('/', findPromotions);               // * GET route to find all promotions * 



export default promotions;