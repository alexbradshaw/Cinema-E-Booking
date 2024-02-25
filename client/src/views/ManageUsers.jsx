import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import Link for navigation
import { AuthContext } from '../App';
// import { getAllUsers } from '../utils/API'; // Import function to fetch promotions
import { checkAdmin } from '../utils/API';


const ManageUsers = () => {
    const navigate = useNavigate();
    const { admin: { isAdmin } } = useContext(AuthContext);

    useEffect(() => { checkAdmin(navigate) }, [isAdmin]);

    return (
        <div className="manage-promotions-container">
          <h2>Manage Users</h2>
          <div className="promotions-list">
                User
          </div>
        </div>
    );
};

export default ManageUsers;
