import { AuthContext } from '../App';
import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CSS/Admin.css'
import { checkAdmin } from '../utils/API';

const Admin = () => {
    const navigate = useNavigate();
    const { admin: { isAdmin, permissions } } = useContext(AuthContext);

    useEffect(() => { checkAdmin(navigate) }, [isAdmin]);

    const routes = [
        {
            'route': 'movies',
            'name': 'Manage Movies',
            'permission': 'manage_movies'
        },
        {
            'route': 'promotions',
            'name': 'Manage Promotions',
            'permission': 'manage_promotions'
        },
        {
            'route': 'tickets',
            'name': 'Manage Ticket Prices',
            'permission': 'manage_movies'
        },
        {
            'route': 'users',
            'name': 'Manage Users',
            'permission': 'manage_accounts'
        }
    ]

    return (
        <div className='adminControlPanel'>
            <div className='controlPanelGrid'>
                <h2>Admin Control Panel</h2>
                <ul>
                    {
                        routes
                            .map(
                                ({route, name, permission}, index) => {
                                    if (permissions[permission]) {
                                        return (
                                            <li key={index}>
                                                <Link to={`/admin/${route}`}>{name}</Link>
                                            </li>
                                        );
                                    }
                                }
                            )
                    }
                </ul>
            </div>
        </div>
    );
}

export default Admin;