import './CSS/ManageUsers.css'; 
import React, { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { AuthContext } from '../App';
import { checkAdmin, getAllUsers } from '../utils/API';
import { useQuery } from '@tanstack/react-query';

const ManageUsers = () => {
    const navigate = useNavigate();

    const { admin: { isAdmin } } = useContext(AuthContext);

    useEffect(() => { checkAdmin(navigate) }, [isAdmin]);

    const { isPending, data: userList } = useQuery({ queryKey: ['users'], queryFn: getAllUsers })

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
                isPending || userList.users == undefined
                  ?
                    <h1>Loading...</h1>
                    :
                    userList.users.map((user) => {
                      if (user.id != userList.currentUserId) {
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
