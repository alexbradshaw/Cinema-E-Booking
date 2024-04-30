import './CSS/ManageUsers.css'; 
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { createAdmin, editAccountStanding, editAdminPermissions, getAdminFields } from '../utils/API';
import { AuthContext } from '../App';
import { useMutation, useQuery } from '@tanstack/react-query';

const ManageUser = () => {
    const navigate = useNavigate();
    const { state: { user } } = useLocation();
    const { id, active, admin, username, promotion_enrollment, profile_pic } = user;
    const { admin: { permissions: { manage_admins } } } = useContext(AuthContext);
    
    const { isPending, data: fields } = useQuery({ queryKey: ['adminFields'], queryFn: getAdminFields })

    const [success, setSuccess] = useState(false);
    const [adminForm, setAdminForm] = useState(false);
    
    const generatePermissions = (admin) => {
        const perms = [];
        for (let permission in admin) {
            if (!permission.includes('id')) {
                let items = permission.split('_');
                let permissionName = '';
                for (let i = 0; i < items.length; i++) {
                    if (!items[i].match(/\W/)); {
                        permissionName += items[i].slice(0, 1).toUpperCase() + items[i].slice(1) + ' '
                    }
                }
                perms.push({ 
                    name: permissionName, 
                    permission: permission, 
                    value: admin[`${permission}`] 
                });
            }
        }
        return perms;
    }

    const generateFormObject = (id) => {
        let formObject = '{';

        for(let i = 0; i < form.length; i++) {
            formObject += `"${form[i].permission}": ${form[i].value ? 1 : 0}`;
            if (i < form.length - 1) {
                formObject += ', ';
            }
        }

        if (id) {
            formObject += `, "user_id": ${id}`;
        }

        formObject += '}';

        return formObject;
    }

    const [form, setForm] = useState(generatePermissions(admin));

    useEffect(()=> {
        if (!admin && !isPending) {
            const objArr = {};
            for (let i = 0; i < fields.length; i++) {
                Object.assign(objArr, JSON.parse(`{"${fields[i]}": false}`))
            }
            setForm(generatePermissions(objArr));
        }
    }, [])

    const onUpdate = ({ target: { name } }) => {
        let updated = form;
        updated[name] = { ...form[name], value: !form[name].value } 
        setForm([...updated]);
    }

    const AdminPermsConditional = () => {
        const editProfile = useMutation({ mutationFn: editAdminPermissions })

        const formHandler = async (e) => {
            e.preventDefault();
            
            const formObject = generateFormObject();
    
            const updated = await editProfile.mutateAsync({ id, permissions: formObject });
    
            if (updated[0] == 1) {
                let newUser = user;
                newUser.admin = await JSON.parse(formObject);
                navigate(`/admin/users/${id}`, {state: {'user': newUser}});
                setSuccess(true);
                setTimeout(() => setSuccess(false), 1700);
            }
        }

        return (
            admin ? 
                <form onSubmit={formHandler} id={id}>
                    {
                        form
                            .map(
                                ({ name, permission, value }, index) => {
                                    return (
                                        <div key={permission + ' input'} className='permission'>
                                            <div>
                                                <input type="checkbox" checked={value} value={form[index].value} name={index} id={permission} onChange={onUpdate}/>
                                                <div>
                                                    <label htmlFor={permission}>{name}</label>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            )
                    }
                        <div className='user-form-submit'>
                            <input type='submit' value={success ? 'Changes Submitted': 'Update Admin'} />
                            <ActiveConditional />
                        </div>
                </form>
                : 
                <NewAdminConditional/>
        );
    }

    const ActiveConditional = () => {
        const editStanding = useMutation({ mutationFn: editAccountStanding })

        const updateAccountStanding = async () => {
            const edit = await editStanding.mutateAsync({ id, active });
            if (edit[0] == 1) {
                let newUser = user;
                newUser.active = !active;
                navigate(`/admin/users/${id}`, {state: {'user': newUser}});
            }
        }

        return (
            active ? 
                <button onClick={updateAccountStanding} className='delete-button default-button'>Suspend Account</button>
                :
                <button onClick={updateAccountStanding} className='add-user-button default-button'>Reactivate Account</button>
        );
    }

    const NewAdminConditional = () => {
        const createAdminMutation = useMutation({ mutationFn: createAdmin })

        const newAdmin = async (e) => {
            e.preventDefault();
            const formObject = generateFormObject(id);
            const updated = await createAdminMutation.mutateAsync(formObject);
            if (updated[0] == 1) {
                let newUser = user;
                newUser.admin = await JSON.parse(formObject);
                navigate(`/admin/users/${id}`, {state: {'user': newUser}});
                setSuccess(true);
                setTimeout(() => setSuccess(false), 1700);
            }
        }

        return (
            adminForm ?
                <div className='new-admin'>
                    <form onSubmit={newAdmin}>
                    {
                        form
                            .map(
                                ({ name, permission, value }, index) => {
                                    return (
                                        <div key={permission + ' input'} className='permission'>
                                            <div>
                                                <input type="checkbox" checked={value} value={form[index].value} name={index} id={permission} onChange={onUpdate}/>
                                                <div>
                                                    <label htmlFor={permission}>{name}</label>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            )
                        }
                        <div className='user-form-submit'>
                            <input type='submit' value={success ? 'New Admin Submitted': 'Create Admin'} />
                            <button onClick={()=> setAdminForm(!adminForm)} className='delete-button default-button' style={{"width":"fit-content"}}>Cancel</button>
                        </div>
                    </form>
                </div>
                :
                <div className='new-admin'>
                    <button onClick={()=> setAdminForm(!adminForm)} className="success-button default-button">Upgrade to Admin</button>
                    <ActiveConditional />
                </div>
        );
    }

    return (
        <div key={id} className="user">
            <div>
                <h2>Manage User</h2>
                <div className='back-link'>
                    <Link to={'..'} relative="path">Back</Link>
                </div>
            </div>
            <div className='user-header'>
                <div>
                    <h3>ID</h3>
                    <div>{id}</div>
                </div>
                <div>
                    <h3>Username</h3>
                    <div>{username}</div>
                </div>
                <div>
                    <h3>Promotions</h3>
                    <div>{promotion_enrollment ? <span style={{'color': 'green'}}>True</span> : <span style={{'color': 'red'}}>False</span> }</div>
                </div>
                <div>
                    <h3>Account Status</h3>
                    {active ? <span style={{'color': 'green'}}>Active</span> : <span style={{'color': 'red'}}>Disabled</span>}
                </div>
            </div>
            <div className='user-column'>
                <div className='user-options'>
                    <div>
                        <div className='profile-pic'>
                            <img src={profile_pic} alt={`picture for username: ${username}`} />
                        </div>
                        {
                            manage_admins ? 
                                <AdminPermsConditional />
                                :
                                <div className='user-form-submit'>
                                    <ActiveConditional />
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageUser;