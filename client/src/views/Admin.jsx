import { AuthContext } from '../App';
import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CSS/Admin.css'
import { checkAdmin } from '../utils/API';

const Admin = () => {
    const navigate = useNavigate();
    const { admin: { isAdmin } } = useContext(AuthContext);

    useEffect(() => { checkAdmin(navigate) }, [isAdmin]);

    return (
        <div className='adminControlPanel'>
            <div className='controlPanelGrid'>
                <h2>Admin Control Panel</h2>
                <ul>
                    <li><Link to='/admin/promotions'>Manage Promotions</Link></li>
                    <li><Link to='/admin/movies'>Manage Movies</Link></li>
                    <li><Link to='/admin/users'>Manage Users</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default Admin;