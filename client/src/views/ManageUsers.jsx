import './CSS/ManageUsers.css'; 
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { AuthContext } from '../App';
import { checkAdmin, getAllUsers } from '../utils/API';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState([]);
    const navigate = useNavigate();

    const { admin: { isAdmin } } = useContext(AuthContext);

    useEffect(() => { checkAdmin(navigate) }, [isAdmin]);

    useEffect(() => {
      const fetchMovies = async () => {
        try {
          const { users, currentUserId } = await getAllUsers();
          setUsers(users);
          setUserId(currentUserId);
        } catch (error) {
          console.error("Error fetching accounts:", error);
        }
      };

      fetchMovies();
    }, []);

    return (
        <div className="manager-users-container">
          <div className='header'>
            <div>
              <h2 style={{"fontSize":"3rem"}}>Current Users</h2>
            </div>
          </div>
          <div className="users-list">
            <div className='rows'>
              <div key={'header'} className="user-row">
                <div>
                  <h3>ID</h3>
                </div>
                <div>
                  <h3>Username</h3>
                </div>
                <div>
                  <h3>Active</h3>
                </div>
                <div>
                  <h3>Admin</h3>
                </div>
                <div>
                  <h3>Promotions</h3>
                </div>
                <div>
                  <h3>Manage</h3>
                </div>
              </div>
              {
                users.map((user) => {
                  if (user.id != userId) {
                    return (
                      <div key={user.id} className="user-row">
                        <div>
                          <h4>{user.id}</h4>
                        </div>
                        <div>
                          <h4>{user.username}</h4>
                        </div>
                        <div>
                          <h4>{user.active ? <span style={{"color":"green"}}>true</span> : <span style={{"color":"red"}}>false</span>}</h4>
                        </div>
                        <div>
                          <h4>{user.admin ? <span style={{"color":"green"}}>true</span> : <span style={{"color":"red"}}>false</span>}</h4>
                        </div>
                        <div>
                          <h4>{user.promotion_enrollment ? <span style={{"color":"green"}}>true</span> : <span style={{"color":"red"}}>false</span>}</h4>
                        </div>
                        <div>
                          <Link className='edit-button manage-user' state={{'user' : user}} to={`${user.id}`}>Modify User</Link>
                        </div>
                      </div>
                    );
                  }
                })
              }
            </div>
          </div>
        </div>
    );
};

export default ManageUsers;
