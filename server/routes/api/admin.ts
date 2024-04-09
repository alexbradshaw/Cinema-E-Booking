import { Router } from 'express';
import { addAdmin, addMovie, addCategory, addPromotion, adminCheck, getUsers, getAdminFields, editAccountStanding, editAdminPermissions, editPromotion, deletePromotion } from '../../controllers/index.js';
import { checkAdmin } from './index.js';

const admin = Router();

admin.use(checkAdmin);

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


export default admin;