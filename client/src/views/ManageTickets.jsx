import './CSS/ManageTickets.css'; 
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { formatPrice } from '../utils/utils';
import { useContext, useEffect, useState } from 'react';
import { checkAdmin, createTicket, editTicket, getAllTicketTypes } from '../utils/API';
import { useMutation, useQuery } from '@tanstack/react-query';
import Confirm from './components/Confirm';

const ManageTickets = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [showAdd, setAdd] = useState(false);
    const [newType, setNewType] = useState("");
    const [newPrice, setNewPrice] = useState();

    const { admin: { isAdmin } } = useContext(AuthContext);

    useEffect(() => { checkAdmin(navigate) }, [isAdmin]);

    const { isPending, data: tickets } = useQuery({ queryKey: ['ticketTypes'], queryFn: getAllTicketTypes })

    const addTicket = useMutation({ 
        mutationFn: createTicket, 
        onSuccess: async (data, variables) => {
            navigate(0);
        },
        onError: (error, variables, context) => {
            setError(error);
        }
    });

    const handleNewTicket = (e) => {
        e.preventDefault();
        addTicket.mutate({ name: newType, price: newPrice});
    }

    const handleInput = (e) => {
        if (/\.[\d]{3,}$/.test(e.target.value)) {
            return e.target.setCustomValidity('Too many decimal numbers!');
        } 
        return e.target.setCustomValidity('');
    }

    const TicketRow = ({ ticket: { id, name, price } }) => {
        const [showEdit, setEdit] = useState(false);
        const [ticket, setTicket] = useState({ name, price });
    
        const TicketEdit = ({ ticket: {name, price }}) => {
            const [nameVal, setName] = useState(name);
            const [priceVal, setPrice] = useState(price);

            const updateTicket = useMutation({ 
                mutationFn: editTicket, 
                onMutate: () => {
                    return { name: name, price: price };
                },
                onSuccess: async (data, variables) => {
                    if (data[0] == 1) {
                        setError(false);
                        setTicket({ name: variables.name, price: variables.price });
                        setEdit(false);
                    }
                },
                onError: (error, variables, context) => {
                    setError(error);
                    setTicket({ name: context.name, price: context.price });
                }
            });

            const handleUpdateTicket = (e) => {
                e.preventDefault();
                if (/^[\d]*\.?[\d]{0,2}$/.test(priceVal)) {
                    if (priceVal != price || nameVal != name) {
                        updateTicket.mutate({ id, name: nameVal, price: priceVal });
                    } else {
                        setEdit(false);
                    }
                }
            }

            return (
                <form onSubmit={handleUpdateTicket} className='ticket-row'>
                    <div>
                        <h3>{id}</h3>
                    </div>
                    <div>
                        <input type='text' id={'ticketName' + id} value={nameVal} onChange={e => setName(e.target.value)} required/>
                    </div>
                    <div>
                        <input id={ticket.name + ' price ' + id} type="number" value={priceVal} min={0} step={.01} onChange={e => setPrice(e.target.value)} required onInput={handleInput}/>
                    </div>
                    <div>
                        {
                            updateTicket.isPending
                                ?
                                    <Confirm disabled/>
                                    :
                                    <Confirm type={'submit'} no={() => setEdit(!showEdit)}/>
                        }
                    </div>
                </form>
            );
        }
    
        return (
            <>
                {
                    showEdit 
                        ?
                            <TicketEdit ticket={ticket} />
                            :
                            <div className='ticket-row'>
                                <div>
                                    <h3>{id}</h3>
                                </div>
                                <div>
                                    <h3>{ticket.name}</h3>
                                </div>
                                <div>
                                    <h3>${formatPrice(ticket.price)}</h3>
                                </div>
                                <div>
                                    <button onClick={() => setEdit(!showEdit)} className='edit-button manage-ticket'>Modify</button>
                                </div>
                            </div>
                }
            </>
        );
    }

    return (
        <div className='manage-tickets-container'>
            <div className='manage-tickets-header'>
                {
                    error
                        ?
                            <h2>{error}</h2>
                            :
                            <h2 style={{"fontSize":"3rem"}}>Manage Ticket Prices</h2>
                }
            </div>
            <div className='manage-tickets-body'>
                <div className='ticket-row'>
                    <div>
                        <h3>ID</h3>
                    </div>
                    <div>
                        <h3>Type</h3>
                    </div>
                    <div>
                        <h3>Price</h3>
                    </div>
                    <div>
                        <h3>Manage</h3>
                    </div>
                </div>
                {
                    isPending || tickets == undefined
                        ?
                            <div className='loading'>
                                <h1>Loading...</h1>
                            </div>
                            :
                            tickets.map((ticket, index) => {
                                return (
                                    <TicketRow ticket={ticket} key={"ticket row for id" + index}/>
                                );
                            })
                }
                <div className='add-ticket-row'>
                    {
                        showAdd 
                            ?
                                <form onSubmit={handleNewTicket} className='new-ticket-form'>
                                    <div>
                                        <div>
                                            <label htmlFor="new-ticket-type">Type: </label>
                                            <input id='new-ticket-type' type="text" value={newType} placeholder='Holiday Event' onChange={e => setNewType(e.target.value)} required/>
                                        </div>
                                        <div>
                                            <label htmlFor="new-ticket-price">Price: </label>
                                            <input id='new-ticket-price' type="number" value={newPrice} onChange={e => setNewPrice(e.target.value)} onInput={handleInput} min={0} step={.01} placeholder='50.00' required/>
                                        </div>
                                        <div className='ticket-form-buttons'>
                                            <button type='submit' className="add-ticket-button">Submit</button>
                                            <button onClick={() => setAdd(!showAdd)} className="delete-button ticket-cancel">Cancel</button>
                                        </div>
                                    </div>
                                </form>
                                :
                                <button className="add-ticket-button" onClick={() => {setAdd(!showAdd)}}>Add Ticket Type</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default ManageTickets;