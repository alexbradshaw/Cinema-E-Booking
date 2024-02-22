import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import { getLoggedInUser } from '../utils/API'; // Adjust the path based on your file structure

const EditProfile  = () => { 
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await getLoggedInUser();
                setUsername(user.username);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            } catch (error) {
                console.error('Error getting logged in user:', error);
                // Handle error
            }
        };
        fetchUserData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            navigate('/loggedin')
        } catch (error) {
            console.error('Error updating profile:', error);
            // display an error message to the user
        }
    };

    return (
        <div>
            {/* title of page */}
            <h1>Manage Profile</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />

                <label htmlFor="email">Email:</label>
                <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />

                {/* You may have a checkbox for admin registration */}
                <label>
                <input
                    type="checkbox"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                />
                Admin
                </label>

                <button type="submit">Save Changes</button>
            </form>

            <p><Link to="/loggedin">Back</Link></p>
        </div>
    );
};

export default EditProfile;