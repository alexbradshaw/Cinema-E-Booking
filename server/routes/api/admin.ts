import { Router } from 'express';
import { addAdmin, addMovie, addCategory, addPromotion, adminCheck, deletePromotion, editAccountStanding, editAdminPermissions, editPromotion, editTicket, getAdminFields, getTicketTypes, getUsers, addTicketType } from '../../controllers/index.js';
import { checkAdmin, checkAuth } from '../../utils/auth.js';

const admin = Router();

// ? Key ?

// * Means public route * 
// ! Means auth protected route ! 
// !! Means admin protected route !! 

    admin.use(checkAuth, checkAdmin);

    // GET
    admin.get('/', adminCheck);                            // !! GET route to check if user is admin and their permissions !! 
    admin.get('/accounts', getUsers);                      // !! GET route to get all users !! 
    admin.get('/fields', getAdminFields);                  // !! GET route to get fields for the Admin Model !! 
    admin.get('/tickets', getTicketTypes);                 // !! GET route to get all current ticket types !! 

    // POST
    admin.post('/', addAdmin);                             // !! POST route to create a new admin !! 
    admin.post('/movie', addMovie);                        // !! POST route to add a new movie !! 
    admin.post('/category', addCategory);                  // !! POST route to add a new category !! 
    admin.post('/promotion', addPromotion);                // !! POST route to add a new promotion !! 
    admin.post('/ticket', addTicketType);                    // !! POST route to add a new ticket type !! 

    // PUT 
    admin.put('/standing/:id', editAccountStanding);       // !! PUT route to update account standing !! 
    admin.put('/permissions/:id', editAdminPermissions);   // !! PUT route to update admin permissions !! 
    admin.put('/promotion/:id', editPromotion);            // !! PUT route to update promotion information !! 
    admin.put('/tickets/:id', editTicket);                 // !! PUT route to update ticket type info !! 

    // DELETE
    admin.delete('/promotion/:id', deletePromotion);       // !! DELETE route for a single promotion !! 


export default admin;