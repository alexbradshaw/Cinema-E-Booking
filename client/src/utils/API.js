
const errorCheck = async (res) => {
    const status = res.status;
    if (!res.ok) {
        const response = await res.json();
        console.log(response);
        if (response.errors) {
            for (const { message, type } of response.errors) {
                throw new Error(type, { cause: message });
            }
        } else {
            throw new Error(status, { cause: response });
        }
    }
}

const retrieveAuthToken = () => {
    return localStorage.getItem('auth');
}

export const checkAdmin = async (navigate) => {
    if (!localStorage.getItem('admin') || !(await adminCheck()).isAdmin) {
        navigate('/')
    }
}

/* Admin Routes */

    /*
        Checks admin status of current user, returns isAdmin and admin permissions
    */
    export const adminCheck = async () => {
        const response = await fetch('/api/admin', {
            headers: {
                'Authorization' : `Bearer ${retrieveAuthToken()}`,
            }
        });
        
        await errorCheck(response);
        
        const admin = await response.json();

        return admin;
    }

    /*
        Creates a new category based on form data, returns new admin object
    */
        export const createAdmin = async (formData) => {
            const response = await fetch('/api/admin', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${retrieveAuthToken()}`,
                },
                body: formData,
            });
            
            await errorCheck(response);
    
            const updated = await response.json();
    
            return updated;
        }

    /*
        Creates a new category based on form data, returns new category object
    */
        export const createCategory = async (formData) => {
            const response = await fetch('/api/admin/category', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${retrieveAuthToken()}`,
                },
                body: JSON.stringify(formData),
            });
            
            await errorCheck(response);
    
            const newCategory = await response.json();
    
            return newCategory;
        }

    /*
        Creates a new movie based on form data, returns new movie object
    */
        export const createMovie = async (formData) => {
            const response = await fetch('/api/admin/movie', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${retrieveAuthToken()}`,
                },
                body: JSON.stringify(formData),
            });
            
            await errorCheck(response);

            const newMovie = await response.json();

            return newMovie;
        }

    /*
        Creates a new promotion based on form data, returns new promotion object
    */
        export const createPromotion = async (formData) => {
            const response = await fetch('/api/admin/promotion', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${retrieveAuthToken()}`,
                },
                body: JSON.stringify(formData),
            });
            
            await errorCheck(response);
    
            const newPromotion = await response.json();
    
            return newPromotion;
        }

    /*
        Delete a Promotion by ID
        Returns true if successful
    */
        export const deletePromotion = async (id) => {
            const response = await fetch(`/api/admin/promotion/${id}`, {
                headers: {
                    'Authorization' : `Bearer ${retrieveAuthToken()}`,
                },
                method: 'DELETE',
            });
            
            await errorCheck(response);
            
            const deleted = await response.json();

            return deleted;
        }

    /*
        Disable/Enable accounts by ID
    */
        export const editAccountStanding = async (id, active) => {
            const response = await fetch(`/api/admin/standing/${id}`, {
                headers: {
                    'Authorization' : `Bearer ${retrieveAuthToken()}`,
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({ active: !active })
            });
            
            await errorCheck(response);
            
            const updatedRows = await response.json();

            return updatedRows;
        }

    /*
        Change Admin Permissions of a User by ID
    */
        export const editAdminPermissions = async (id, permissions) => {
            const response = await fetch(`/api/admin/permissions/${id}`, {
                headers: {
                    'Authorization' : `Bearer ${retrieveAuthToken()}`,
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: permissions
            });
            
            await errorCheck(response);
            
            const updatedRows = await response.json();

            return updatedRows;
        }

    /*
        Change Admin Permissions of a User by ID
    */
        export const editPromotion = async (id, permissions) => {
            const response = await fetch(`/api/admin/permissions/${id}`, {
                headers: {
                    'Authorization' : `Bearer ${retrieveAuthToken()}`,
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({ ...permissions })
            });
            
            await errorCheck(response);
            
            const updatedRows = await response.json();

            return updatedRows;
        }
    
    /*
        Returns an object full of admin fields
    */
        export const getAdminFields = async () => {
            const response = await fetch("/api/admin/fields", {
                headers: {
                    'Authorization' : `Bearer ${retrieveAuthToken()}`,
                }
            });
            
            await errorCheck(response);
            
            const fields = await response.json();

            return fields;
        }

    /*
        Returns an object array of users with admin perms if applicable
    */
        export const getAllUsers = async () => {
            const response = await fetch("/api/admin/accounts", {
                headers: {
                    'Authorization' : `Bearer ${retrieveAuthToken()}`,
                }
            });
            
            await errorCheck(response);
            
            const { users, currentUserId } = await response.json();

            return { users: users, currentUserId: currentUserId };
        }

/* Account Routes */

    /*
        Accepts username or email to send a password reset email
    */
        export const sendResetEmail = async (userOrEmail) => {
            console.log(userOrEmail);
            const response = await fetch('/api/account/reset', {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify({
                    'userOrEmail': userOrEmail
                })
            });
            
            await errorCheck(response);
        }

    /*
        Changes the password using the email provided token
    */
        export const changePassword = async (token, password) => {
            const response = await fetch(`/api/account/reset/${token}`, 
            { 
                headers: { 'Content-Type': 'application/json' },
                method: 'PUT',
                body: JSON.stringify({ 'password': password })
            });
            
            await errorCheck(response);
        }

    /*
        Confirms the account using the email provided token
    */
        export const confirmAccount = async (token) => {
            const response = await fetch(`/api/account/verify/${token}`, { method: 'PUT' });
            
            await errorCheck(response);

            return await response.json();
        }

    /*
       Returns a user object with associated transactions, promotions, as well as admin permissions for the current authenticated user
    */
        export const getLoggedInUser = async () => {
            const response = await fetch("/api/account", {
                headers: {
                    'Authorization' : `Bearer ${retrieveAuthToken()}`,
                }
            });
            
            await errorCheck(response);
            
            const user = await response.json();

            return user;
        }
    

    /*
        Returns a user object with associated transactions, promotions, as well as admin permissions based on a username or user id
    */
        export const getUserByUsernameOrId = async (usernameOrId) => {
            if (!usernameOrId) {
                return;
            }
            
            const response = await fetch(`/api/account/${usernameOrId}`);

            await errorCheck(response);
            
            const user = await response.json();

            return user;
        }


    /*
        Returns bool for if user is authed
    */
        export const authCheck = async () => {
            const response = await fetch("/api/account/auth", {
                method: "POST", 
                headers: {
                    'Authorization' : `Bearer ${retrieveAuthToken()}`,
                },
            });

            await errorCheck(response);

            const status = await response.json();

            return status;
        }


    /*
        Allows a user to sign up
    */
        export const signup = async ({ promotion_enrollment, username, email, password }) => {
            const response = await fetch('/api/account/signup', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    promotion_enrollment,
                    username,
                    email,
                    password
                }), 
            });

            await errorCheck(response);

            const { token } = await response.json();

            localStorage.setItem('auth', token);
        }


    /*
        Returns bool for if user is an admin
    */
        export const login = async ({ userOrEmail, password, rememberMe }) => {
            const response = await fetch('/api/account/login', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'username': userOrEmail, // accepts username or
                    'email': userOrEmail, // email
                    password,
                    rememberMe
                }), 
            });

            await errorCheck(response);

            const { isAdmin, token } = await response.json();

            localStorage.setItem('auth', token);

            return isAdmin;
        }


    /*
        Returns a success message or throws an error (if something went wrong or user isn't authed)
    */
        export const logout = async () => {
            const response = await fetch('/api/account/logout', {
                method: 'POST', 
                headers: {
                    'Authorization' : `Bearer ${retrieveAuthToken()}`,
                }
            });

            await errorCheck(response);

            return response;
        }

    /*
        Adds a new payment method to a user
    */
        export const addCard = async (cardData) => {
            const response = await fetch('/api/account/card', {
                method: 'POST', 
                headers: {
                    'Authorization' : `Bearer ${retrieveAuthToken()}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cardData)
            });
    
            await errorCheck(response);
    
            return await response.json();
        }

    /*
        Updates Payment Method Address
    */
        export const updateCard = async (address, card_id) => {
            const response = await fetch(`/api/account/card/${card_id}`, {
                method: 'PUT', 
                headers: {
                    'Authorization' : `Bearer ${retrieveAuthToken()}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ address })
            });
    
            await errorCheck(response);
    
            return response;
        }

    /*
        Deletes Payment Method by id
    */
        export const deleteCard = async (card_id) => {
            const response = await fetch(`/api/account/card/${card_id}`, {
                method: 'DELETE', 
                headers: {
                    'Authorization' : `Bearer ${retrieveAuthToken()}`,
                },
            });
    
            await errorCheck(response);
    
            return response;
        }


    /*
        Returns updated user object, takes an updated user object as the parameter
    */
        export const updateUser = async (updatedUser) => {
            const response = await fetch('/api/account', {
                method: 'PUT', 
                headers: {
                    'Authorization' : `Bearer ${retrieveAuthToken()}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser)
            });
    
            await errorCheck(response);
    
            return response;
        }


/* Category Routes */
        
    /*
        Returns an array of every category in db with associated movie info
    */
        export const getAllCategories = async () => {
            const response = await fetch('/api/categories');
            
            await errorCheck(response);
            
            const categories = await response.json();
            
            return categories; 
        }
    

    /*
        Returns an array of every categories without associated data
    */
        export const getCategoriesList = async () => {
            const response = await fetch('/api/categories/list');
            
            await errorCheck(response);
            
            const categories = await response.json();
            
            return categories; 
        }
    

    /*
        Returns an array of movie objects matching query (handles partial queries)
    */
        export const searchCategories = async (category) => {
            const response = await fetch(`/api/categories/${category}`); 
    
            await errorCheck(response);
    
            const movies = await response.json();
    
            return movies; 
        }

/* Promotion Routes */
        
    /*
        Returns an array of every promotion in db
    */
        export const getAllPromotions = async () => {
            const response = await fetch('/api/promotions');
            
            await errorCheck(response);
            
            const promotions = await response.json();
            
            return promotions; 
        }


/* Movie Routes */

    /*
        Returns an array of every movie in db with associated info (actors, directors, etc)
    */
        export const getAllMovies = async () => {
            const response = await fetch('/api/movies');

            await errorCheck(response);
            
            const movies = await response.json();
            
            return movies; 
        }


    /*
        Returns an array of movie objects matching query
    */
        export const searchMovies = async (movie) => {
            const response = await fetch(`/api/movies/${movie}`); 

            await errorCheck(response);

            const movies = await response.json();

            return movies; 
        }
        