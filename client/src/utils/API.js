
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

/* Admin Routes */
    export const adminCheck = async () => {
        const response = await fetch("/api/admin", {
            headers: {
                'Authorization' : retrieveAuthToken(),
            }
        });
        
        await errorCheck(response);
        
        const admin = await response.json();

        return admin;
    }

/* Account Routes */

    /*
        {
            "id": 1,
            "isAdmin": true,
            "username": "alex",
            "email": "alex@gmail.com"
            "profile_pic": "/seeds/alex.jpg",
            "create_promotion": true,
            "permission2": false,
            "permission3": false,
            "permission4": false,
            "promotions": [
                {
                    "id": 1,
                    "title": "Promotion1",
                    "discount_value": 10
                }
            ],
            "transactions": [
                {
                    "id": 1,
                    "date": "2022-01-01T00:00:00.000Z",
                    "total": 50,
                    "tickets": [
                        {
                            "seat_number": 1,
                            "type": "Child",
                            "movie": {
                                "title": "The Avengers"
                            }
                        },
                        {
                            "seat_number": 2,
                            "type": "Standard",
                            "movie": {
                                "title": "The Avengers"
                            }
                        },
                        {
                            "seat_number": 3,
                            "type": "Senior",
                            "movie": {
                                "title": "The Avengers"
                            }
                        },
                        {
                            "seat_number": 4,
                            "type": "Child",
                            "movie": {
                                "title": "The Avengers"
                            }
                        },
                        {
                            "seat_number": 5,
                            "type": "Standard",
                            "movie": {
                                "title": "The Avengers"
                            }
                        }
                    ]
                }
            ]
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
            "id": 1,
            "isAdmin": true,
            "username": "alex",
            "profile_pic": "/seeds/alex.jpg",
            "create_promotion": true,
            "permission2": false,
            "permission3": false,
            "permission4": false,
            "promotions": [
                {
                    "id": 1,
                    "title": "Promotion1",
                    "discount_value": 10
                }
            ],
            "transactions": [
                {
                    "id": 1,
                    "date": "2022-01-01T00:00:00.000Z",
                    "total": 50,
                    "tickets": [
                        {
                            "seat_number": 1,
                            "type": "Child",
                            "movie": {
                                "title": "The Avengers"
                            }
                        },
                        {
                            "seat_number": 2,
                            "type": "Standard",
                            "movie": {
                                "title": "The Avengers"
                            }
                        },
                        {
                            "seat_number": 3,
                            "type": "Senior",
                            "movie": {
                                "title": "The Avengers"
                            }
                        },
                        {
                            "seat_number": 4,
                            "type": "Child",
                            "movie": {
                                "title": "The Avengers"
                            }
                        },
                        {
                            "seat_number": 5,
                            "type": "Standard",
                            "movie": {
                                "title": "The Avengers"
                            }
                        }
                    ]
                }
            ]
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



/* Category Routes */

        /*
            {
                name: "Comedy"
            }
        */
        export const createNewCategory = async (formData) => {
            const response = await fetch("/api/category", {
                method: "POST", 
                headers: {
                "Content-Type": "application/json",
                'Authorization' : retrieveAuthToken(),
                },
                body: JSON.stringify(formData),
            });
            
            await errorCheck(response);
    
            const { category } = await response.json();
    
            return category;
        }
    
        
        /*
            Returns an array of every category in db with associated movie info
            [
                {
                    "name": "Action",
                    "movies": [] // Returns an array of movies in Action Category
                },
                {
                    "name": "Comedy",
                    "movies": [] // Returns an array of movies in Comedy Category
                },
                {
                    "name": "Drama",
                    "movies": [] // Returns an array of movies in Drama Category
                },
                {
                    "name": "Kids",
                    "movies": [] // Returns an array of movies in Kids Category
                }
            ]
        */
        export const getAllCategories = async () => {
            const response = await fetch("/api/categories");
            
            await errorCheck(response);
            
            const categories = await response.json();
            
            return categories; 
        }
    

        /*
            [
                {
                    "id": 1,
                    "name": "Action"
                },
                {
                    "id": 3,
                    "name": "Comedy"
                },
                {
                    "id": 2,
                    "name": "Drama"
                },
                {
                    "id": 4,
                    "name": "Kids"
                }
            ]
        */
        export const getCategoriesList = async () => {
            const response = await fetch("/api/categories/list");
            
            await errorCheck(response);
            
            const categories = await response.json();
            
            return categories; 
        }
    

        /*
            Returns an array of movie objects matching query
            [
                {
                    "id": 1,
                    "title": "The Avengers",
                    "synopsis": "When Thor's evil brother, Loki (Tom Hiddleston), gains access to the unlimited power of the energy cube called the Tesseract, Nick Fury (Samuel L. Jackson), director of S.H.I.E.L.D., initiates a superhero recruitment effort to defeat the unprecedented threat to Earth. Joining Fury's \"dream team\" are Iron Man (Robert Downey Jr.), Captain America (Chris Evans), the Hulk (Mark Ruffalo), Thor (Chris Hemsworth), the Black Widow (Scarlett Johansson) and Hawkeye (Jeremy Renner).",
                    "length": 143,
                    "rating": "PG-13",
                    "poster_url": "/seeds/avengers.jpg",
                    "trailer_url": "https://www.youtube.com/watch?v=eOrNdBpGMv8",
                    "starts_showing": "2024-03-22T18:02:09.000Z",
                    "stops_showing": "2024-04-22T18:02:09.000Z",
                    "Director": {
                        "name": "Joe Russo",
                        "image_url": "/placeholder.png"
                    },
                    "Producer": {
                        "name": "Kevin Feige",
                        "image_url": "/placeholder.png"
                    },
                    "Cast": [
                        {
                            "name": "Chris Evans",
                            "played": "Captain America",
                            "image_url": "/placeholder.png"
                        },
                        {
                            "name": "Robert Downey Jr.",
                            "played": "Iron Man",
                            "image_url": "/placeholder.png"
                        },
                        {
                            "name": "Chris Hemsworth",
                            "played": "Thor",
                            "image_url": "/placeholder.png"
                        },
                        {
                            "name": "Scarlett Johansson",
                            "played": "Black Widow",
                            "image_url": "/placeholder.png"
                        },
                        {
                            "name": "Jeremy Renner",
                            "played": "Hawkeye",
                            "image_url": "/placeholder.png"
                        },
                        {
                            "name": "Samuel L. Jackson",
                            "played": "Nick Fury",
                            "image_url": "/placeholder.png"
                        },
                        {
                            "name": "Mark Ruffalo",
                            "played": "Hulk",
                            "image_url": "/placeholder.png"
                        },
                        {
                            "name": "Tom Hiddleston",
                            "played": "Loki",
                            "image_url": "/placeholder.png"
                        }
                    ],
                    "categories": [
                        {
                            "name": "Action"
                        },
                        {
                            "name": "Comedy"
                        }
                    ]
                },
                {
                    "id": 4,
                    "title": "The Fast and the Furious: Tokyo Drift",
                    "synopsis": "Sean Boswell (Lucas Black) always feels like an outsider, but he defines himself through his victories as a street racer. His hobby makes him unpopular with the authorities, so he goes to live with his father in Japan. Once there and even more alienated, he learns about an exciting, but dangerous, new style of the sport. The stakes are high when Sean takes on the local champion and falls for the man's girlfriend.",
                    "length": 120,
                    "rating": "PG-13",
                    "poster_url": "/seeds/tokyodrift.jpg",
                    "trailer_url": "https://www.youtube.com/watch?v=QPCtqe-zjw4",
                    "starts_showing": "2024-03-22T18:02:09.000Z",
                    "stops_showing": "2024-04-22T18:02:09.000Z",
                    "Director": {
                        "name": "Justin Lin",
                        "image_url": "/placeholder.png"
                    },
                    "Producer": {
                        "name": "Brian Tyler",
                        "image_url": "/placeholder.png"
                    },
                    "Cast": [
                        {
                            "name": "Lucas Black",
                            "played": "Sean Boswell",
                            "image_url": "/placeholder.png"
                        },
                        {
                            "name": "Sung Kang",
                            "played": "Han Lue",
                            "image_url": "/placeholder.png"
                        },
                        {
                            "name": "Brian Tee",
                            "played": "D. K.",
                            "image_url": "/placeholder.png"
                        },
                        {
                            "name": "Nathalie Kelley",
                            "played": "Neela",
                            "image_url": "/placeholder.png"
                        }
                    ],
                    "categories": [
                        {
                            "name": "Action"
                        },
                        {
                            "name": "Comedy"
                        }
                    ]
                }
            ]
        */
        export const searchCategories = async (category) => {
            const response = await fetch(`/api/categories/${category}`); 
    
            await errorCheck(response);
    
            const movies = await response.json();
    
            return movies; 
        }


/* Movie Routes */

    /*
        {
            "title": "The Avengers",
            "synopsis": "When Thor's evil brother, Loki (Tom Hiddleston), gains access to the unlimited power of the energy cube called the Tesseract, Nick Fury (Samuel L. Jackson), director of S.H.I.E.L.D., initiates a superhero recruitment effort to defeat the unprecedented threat to Earth. Joining Fury's \"dream team\" are Iron Man (Robert Downey Jr.), Captain America (Chris Evans), the Hulk (Mark Ruffalo), Thor (Chris Hemsworth), the Black Widow (Scarlett Johansson) and Hawkeye (Jeremy Renner).",
            "length": 143,
            "rating": "PG-13",
            "poster_url": "/seeds/avengers.jpg",
            "trailer_url": "https://www.youtube.com/watch?v=eOrNdBpGMv8",
            "category_id": [1, 3], // ID's of Categories
            "director_id": 1, // ID of Director
            "producer_id": 2, // ID of Producer
            "member_id": [3, 4, 5, 6, 7, 8, 9, 10], // ID's of Cast Members
            "seats": 100
        },
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
                "id": 1,
                "title": "The Avengers",
                "synopsis": "When Thor's evil brother, Loki (Tom Hiddleston), gains access to the unlimited power of the energy cube called the Tesseract, Nick Fury (Samuel L. Jackson), director of S.H.I.E.L.D., initiates a superhero recruitment effort to defeat the unprecedented threat to Earth. Joining Fury's \"dream team\" are Iron Man (Robert Downey Jr.), Captain America (Chris Evans), the Hulk (Mark Ruffalo), Thor (Chris Hemsworth), the Black Widow (Scarlett Johansson) and Hawkeye (Jeremy Renner).",
                "length": 143,
                "rating": "PG-13",
                "poster_url": "/seeds/avengers.jpg",
                "trailer_url": "https://www.youtube.com/watch?v=eOrNdBpGMv8",
                "starts_showing": "2024-03-22T18:13:35.000Z",
                "stops_showing": "2024-04-22T18:13:35.000Z",
                "Director": {
                    "name": "Joe Russo",
                    "image_url": "/placeholder.png"
                },
                "Producer": {
                    "name": "Kevin Feige",
                    "image_url": "/placeholder.png"
                },
                "Cast": [
                    {
                        "name": "Chris Evans",
                        "played": "Captain America",
                        "image_url": "/placeholder.png"
                    },
                    {
                        "name": "Robert Downey Jr.",
                        "played": "Iron Man",
                        "image_url": "/placeholder.png"
                    },
                    {
                        "name": "Chris Hemsworth",
                        "played": "Thor",
                        "image_url": "/placeholder.png"
                    },
                    {
                        "name": "Scarlett Johansson",
                        "played": "Black Widow",
                        "image_url": "/placeholder.png"
                    },
                    {
                        "name": "Jeremy Renner",
                        "played": "Hawkeye",
                        "image_url": "/placeholder.png"
                    },
                    {
                        "name": "Samuel L. Jackson",
                        "played": "Nick Fury",
                        "image_url": "/placeholder.png"
                    },
                    {
                        "name": "Mark Ruffalo",
                        "played": "Hulk",
                        "image_url": "/placeholder.png"
                    },
                    {
                        "name": "Tom Hiddleston",
                        "played": "Loki",
                        "image_url": "/placeholder.png"
                    }
                ],
                "categories": [
                    {
                        "name": "Action"
                    },
                    {
                        "name": "Comedy"
                    }
                ]
            },
            {
                "id": 2,
                "title": "Ratatouille",
                "synopsis": "Remy dreams of becoming a great chef, despite being a rat in a definitely rodent-phobic profession. He moves to Paris to follow his dream, and with the help of hapless garbage boy Linguini he puts his culinary skills to the test in the kitchen but he has to stay in hiding at the same time, with hilarious consequences. Remy eventually gets the chance to prove his culinary abilities to a great food critic but is the food good?",
                "length": 111,
                "rating": "G",
                "poster_url": "/seeds/ratatouille.png",
                "trailer_url": "https://www.youtube.com/watch?v=NgsQ8mVkN8w",
                "starts_showing": "2024-03-22T18:13:35.000Z",
                "stops_showing": "2024-04-22T18:13:35.000Z",
                "Director": {
                    "name": "Brad Bird",
                    "image_url": "/placeholder.png"
                },
                "Producer": {
                    "name": "Brad Lewis",
                    "image_url": "/placeholder.png"
                },
                "Cast": [
                    {
                        "name": "Will Arnett",
                        "played": "Horst",
                        "image_url": "/placeholder.png"
                    },
                    {
                        "name": "Patton Oswalt",
                        "played": "Remy",
                        "image_url": "/placeholder.png"
                    },
                    {
                        "name": "Lou Romano",
                        "played": "Alfredo Linguini",
                        "image_url": "/placeholder.png"
                    },
                    {
                        "name": "Peter O'Toole",
                        "played": "Anton Ego",
                        "image_url": "/placeholder.png"
                    }
                ],
                "categories": [
                    {
                        "name": "Kids"
                    }
                ]
            },
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
                "id": 1,
                "title": "The Avengers",
                "synopsis": "When Thor's evil brother, Loki (Tom Hiddleston), gains access to the unlimited power of the energy cube called the Tesseract, Nick Fury (Samuel L. Jackson), director of S.H.I.E.L.D., initiates a superhero recruitment effort to defeat the unprecedented threat to Earth. Joining Fury's \"dream team\" are Iron Man (Robert Downey Jr.), Captain America (Chris Evans), the Hulk (Mark Ruffalo), Thor (Chris Hemsworth), the Black Widow (Scarlett Johansson) and Hawkeye (Jeremy Renner).",
                "length": 143,
                "rating": "PG-13",
                "poster_url": "/seeds/avengers.jpg",
                "trailer_url": "https://www.youtube.com/watch?v=eOrNdBpGMv8",
                "starts_showing": "2024-03-22T18:02:09.000Z",
                "stops_showing": "2024-04-22T18:02:09.000Z",
                "Director": {
                    "name": "Joe Russo",
                    "image_url": "/placeholder.png"
                },
                "Producer": {
                    "name": "Kevin Feige",
                    "image_url": "/placeholder.png"
                },
                "Cast": [
                    {
                        "name": "Chris Evans",
                        "played": "Captain America",
                        "image_url": "/placeholder.png"
                    },
                    {
                        "name": "Robert Downey Jr.",
                        "played": "Iron Man",
                        "image_url": "/placeholder.png"
                    },
                    {
                        "name": "Chris Hemsworth",
                        "played": "Thor",
                        "image_url": "/placeholder.png"
                    },
                    {
                        "name": "Scarlett Johansson",
                        "played": "Black Widow",
                        "image_url": "/placeholder.png"
                    },
                    {
                        "name": "Jeremy Renner",
                        "played": "Hawkeye",
                        "image_url": "/placeholder.png"
                    },
                    {
                        "name": "Samuel L. Jackson",
                        "played": "Nick Fury",
                        "image_url": "/placeholder.png"
                    },
                    {
                        "name": "Mark Ruffalo",
                        "played": "Hulk",
                        "image_url": "/placeholder.png"
                    },
                    {
                        "name": "Tom Hiddleston",
                        "played": "Loki",
                        "image_url": "/placeholder.png"
                    }
                ],
                "categories": [
                    {
                        "name": "Action"
                    },
                    {
                        "name": "Comedy"
                    }
                ]
            },
            {
                "id": 4,
                "title": "The Fast and the Furious: Tokyo Drift",
                "synopsis": "Sean Boswell (Lucas Black) always feels like an outsider, but he defines himself through his victories as a street racer. His hobby makes him unpopular with the authorities, so he goes to live with his father in Japan. Once there and even more alienated, he learns about an exciting, but dangerous, new style of the sport. The stakes are high when Sean takes on the local champion and falls for the man's girlfriend.",
                "length": 120,
                "rating": "PG-13",
                "poster_url": "/seeds/tokyodrift.jpg",
                "trailer_url": "https://www.youtube.com/watch?v=QPCtqe-zjw4",
                "starts_showing": "2024-03-22T18:02:09.000Z",
                "stops_showing": "2024-04-22T18:02:09.000Z",
                "Director": {
                    "name": "Justin Lin",
                    "image_url": "/placeholder.png"
                },
                "Producer": {
                    "name": "Brian Tyler",
                    "image_url": "/placeholder.png"
                },
                "Cast": [
                    {
                        "name": "Lucas Black",
                        "played": "Sean Boswell",
                        "image_url": "/placeholder.png"
                    },
                    {
                        "name": "Sung Kang",
                        "played": "Han Lue",
                        "image_url": "/placeholder.png"
                    },
                    {
                        "name": "Brian Tee",
                        "played": "D. K.",
                        "image_url": "/placeholder.png"
                    },
                    {
                        "name": "Nathalie Kelley",
                        "played": "Neela",
                        "image_url": "/placeholder.png"
                    }
                ],
                "categories": [
                    {
                        "name": "Action"
                    },
                    {
                        "name": "Comedy"
                    }
                ]
            }
        ]
    */
    export const searchMovies = async (movie) => {
        const response = await fetch(`/api/movies/${movie}`); 

        await errorCheck(response);

        const movies = await response.json();

        return movies; 
    }
        