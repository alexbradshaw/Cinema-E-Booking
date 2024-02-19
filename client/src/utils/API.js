
const errorCheck = async (res) => {
    if (!res.ok) {
        if ([400, 401, 404].includes(res.status)) {
            localStorage.removeItem('auth');
            location.assign('/login');
        }
        const error = await res.json();
        throw new Error(error.message);
    }
}

const retrieveAuthToken = () => {
    return localStorage.getItem('auth');
}

/* Account Routes */

    /*
        {
            isAdmin: bool,
            username: string,
            email: string,
            profile_pic: string
        }
    */
    export const getLoggedInUser = async () => {
        const response = await fetch("/api/account", {
            headers: {
                'Authorization' : retrieveAuthToken(),
            }
        });
        
        await errorCheck(response);
        
        const user = await response.json();

        return user;
    }
    

    /*
        {
            isAdmin: bool,
            username: string,
            email: string,
            profile_pic: string
        }
    */
    export const getUserByUsername = async (username) => {
        if (!username) {
            return;
        }
        
        const response = await fetch(`/api/account/${username}`);

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
            'Authorization' : retrieveAuthToken(),
            },
        });

        await errorCheck(response);

        const status = await response.json();

        return status;
    }


    /*
        Returns bool for if user is an admin
    */
    export const signup = async({ isAdmin, username, email, password }) => {
        const response = await fetch("/api/account/signup", {
            method: "POST", 
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                isAdmin,
                username,
                email,
                password
            }), 
        });

        await errorCheck(response);

        const { token } = await response.json();

        localStorage.setItem('auth', token);

        return isAdmin;
    }


    /*
        Returns bool for if user is an admin
    */
    export const login = async({ userOrEmail, password }) => {
        const response = await fetch("/api/account/login", {
            method: "POST", 
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'username': userOrEmail, // accepts username or
                'email': userOrEmail, // email
                password
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
    export const logout = async() => {
        const response = await fetch("/api/account/logout", {
            method: "POST", 
            headers: {
                'Authorization' : retrieveAuthToken(),
            }
        });

        await errorCheck(response);

        return response;
    }


/* Movie Routes */

    /*
        {
            title: string,
            length: int, // length of movie in minutes
            rating: string,
            poster_url: string,
            trailer_url: string,
            coming_soon: bool
        }
    */
    export const createNewMovie = async (formData) => {
        const response = await fetch("/api/movie", {
            method: "POST", 
            headers: {
            "Content-Type": "application/json",
            'Authorization' : retrieveAuthToken(),
            },
            body: JSON.stringify(formData),
        });
        
        await errorCheck(response);

        const { movie } = await response.json();

        return movie;
    }

    
    /*
        Returns an array of every movie in db
        [   
            {
                title: string,
                length: int, // length of movie in minutes
                rating: string,
                poster_url: string,
                trailer_url: string,
                coming_soon: bool
            },
            {
                title: string,
                length: int, 
                rating: string,
                poster_url: string,
                trailer_url: string,
                coming_soon: bool
            }
        ]
    */
    export const getAllMovies = async () => {
        const response = await fetch("/api/movies");
        
        await errorCheck(response);
        
        const movies = await response.json();
        
        return movies; 
    }


    /*
        Returns an array of movie objects matching query
        [   
            {
                title: string,
                length: int, // length of movie in minutes
                rating: string,
                poster_url: string,
                trailer_url: string,
                coming_soon: bool
            },
            {
                title: string,
                length: int, 
                rating: string,
                poster_url: string,
                trailer_url: string,
                coming_soon: bool
            }
        ]
    */
    export const search = async (movie) => {
        const response = await fetch(`/api/movies/${movie}`); 

        await errorCheck(response);

        const movies = await response.json();

        return movies; 
    }
        