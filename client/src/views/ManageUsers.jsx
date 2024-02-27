import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import Link for navigation
import { AuthContext } from '../App';
import { checkAdmin, getAllUsers } from '../utils/API'; // Import function to fetch users


const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const { admin: { isAdmin } } = useContext(AuthContext);

    useEffect(() => { checkAdmin(navigate) }, [isAdmin]);

    useEffect(() => {
      const fetchMovies = async () => {
        try {
          const usersData = await getAllUsers();
          setUsers(usersData);
        } catch (error) {
          console.error("Error fetching accounts:", error);
        }
      };

      fetchMovies();
    }, []);

    return (
        <div className="manage-promotions-container">
          <h2>Manage Users</h2>
          <div className="promotions-list">
              {
                users.map((user) => (
                  <div key={user.id} className="promotion-item">
                    <h3>User: {user.username}</h3>
                    <p>Admin: {`${user.isAdmin}`}</p>
                    <div className="promotion-actions">
                        <button className="edit-button" disabled>Edit</button>
                        <button className="delete-button" disabled>Delete</button>
                        <button className="view-button" disabled>View</button>
                    </div>
                  </div>
                ))
              }
          </div>
        </div>
    );
};

export default ManageUsers;
