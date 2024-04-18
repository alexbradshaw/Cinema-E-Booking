import { Router } from 'express';

import { account, accountWithAuth } from './account.js';
import admin from './admin.js';
import categories from './category.js';
import movies from './movie.js';
import promotions from './promotion.js';


const api = Router();

api.use('/account', account);
api.use('/account', accountWithAuth);
api.use('/admin', admin);
api.use('/categories', categories);
api.use('/movies', movies);
api.use('/promotions', promotions);


export default api;