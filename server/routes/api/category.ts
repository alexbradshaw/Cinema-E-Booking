import { Router } from 'express';
import { findCategories, findCategoriesList, searchCategories } from '../../controllers/index.js';

const categories = Router();

// GET
categories.get('/', findCategories);               // * GET route for all categories/associated movies * 
categories.get('/list', findCategoriesList);       // * GET route to get a slim list of categories * 
categories.get('/:category', searchCategories);    // * GET route to find a list of associated movies by cat title * 

export default categories;