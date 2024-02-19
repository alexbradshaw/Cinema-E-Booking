
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

    export const getUserByUsername = async (username) => {
        if (!username) {
            return;
        }
        
        const response = await fetch(`/api/account/${username}`);

        await errorCheck(response);
        
        const user = await response.json();

        return user;
    }

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

    export const getAllMovies = async () => {
        const response = await fetch("/api/movies");
        
        await errorCheck(response);
        
        const movies = await response.json();
        
        return movies; 
    }

    export const search = async (movie) => {
        const response = await fetch(`/api/movies/${movie}`); 

        await errorCheck(response);

        const movies = await response.json();

        return movies; 
    }
        