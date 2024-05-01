import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import Link for navigation
import { AuthContext } from '../App';
import { createPromotion, editPromotion, getAllPromotions } from '../utils/API'; // Import function to fetch promotions
import { checkAdmin } from '../utils/API';
import './CSS/ManagePromotions.css'; // Import CSS for ManagePromotions view
import { formatDate, formatDateForInput, formatPrice } from '../utils/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import Confirm from './components/Confirm';


const ManagePromotions = () => {
    const navigate = useNavigate();
    const { admin: { isAdmin } } = useContext(AuthContext);
    const [error, setError] = useState(false);
    const [showAdd, setAdd] = useState(false);

    const [newDiscount, setNewDiscount] = useState();
    const [newCondition, setNewCondition] = useState();
    const [newExpiration, setNewExpiration] = useState(new Date().getTime());

    useEffect(() => { checkAdmin(navigate) }, [isAdmin]);

    const { isPending, data: promotions } = useQuery({ queryKey: ['promotions'], queryFn: getAllPromotions })

    const addPromotion = useMutation({ 
        mutationFn: createPromotion, 
        onSuccess: async (data, variables) => {
            navigate(0);
        },
        onError: (error, variables, context) => {
            setError(error);
        }
    });

    const handleNewTicket = (e) => {
        e.preventDefault();
        addPromotion.mutate({ discount_value: newDiscount , condition: newCondition , expiration: newExpiration });
    }

    const handleInput = (e) => {
        if (/\.[\d]{3,}$/.test(e.target.value)) {
            return e.target.setCustomValidity('Too many decimal numbers!');
        } else if (e.target.name == 'date' && new Date(e.target.value).getTime() < new Date().getTime()) {
            return e.target.setCustomValidity('Selected date must be later than today!');
        } else if ((e.target.name == 'newCondition' || e.target.name == 'newDiscount') && newCondition < newDiscount) {
            return e.target.setCustomValidity('Discount can\'t be bigger than min price!');
        }
        return e.target.setCustomValidity('');
    }

    // Function to render each promotion item
    const PromotionRow = ({ promotion: { id,  title, discount_value, condition, expiration }}) => {
        const [showEdit, setEdit] = useState(false);

        const PromotionEdit = () => {
            const [discountVal, setDiscount] = useState(discount_value);
            const [conditionVal, setCondition] = useState(condition);
            const [validity, setValidity] = useState(expiration);

            const updatePromotion = useMutation({ 
                mutationFn: editPromotion, 
                onSuccess: async (data) => {
                    if (data[0] == 1) {
                        navigate(0);
                    }
                },
                onError: (error) => {
                    setError(error);
                }
            });

            const handleUpdateTicket = (e) => {
                e.preventDefault();
                if (/^[\d]*\.?[\d]{0,2}$/.test(discountVal) && /^[\d]*\.?[\d]{0,2}$/.test(conditionVal)) {
                    if (discount_value != discountVal || expiration != validity || condition != conditionVal) {
                        if (conditionVal > discountVal) {
                            updatePromotion.mutate({ id, condition: conditionVal, discount_value: discountVal, expiration: validity });
                        } else {
                            setError('Condition cannot be smaller than the discount!');
                            setEdit(false);
                        }
                    } else {
                        setEdit(false);
                    }
                }
            }

            return (
                <form onSubmit={handleUpdateTicket} className='promotion-row'>
                    <div>
                        <h3>{id}</h3>
                    </div>
                    <div>
                        <h3>{title}</h3>
                    </div>
                    <div>
                        <input id={title + ' input for discount ' + id} name='discount' type="number" value={discountVal} min={0} step={.01} onChange={e => setDiscount(e.target.value)} required onInput={handleInput}/>
                    </div>
                    <div>
                        <input id={title + ' input for condition ' + id} name='condition' type="number" value={conditionVal} min={0} step={.01} onChange={e => setCondition(e.target.value)} required onInput={handleInput}/>
                    </div>
                    <div>
                        <input type='date' name='date' min={new Date()} id={'ticketName' + id} value={formatDateForInput(validity)} onChange={e => setValidity(e.target.value)} required onInput={handleInput}/>
                    </div>
                    <div>
                        {
                            updatePromotion.isPending
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
                            <PromotionEdit />
                            :
                            <div key={'header'} className="promotion-row">
                                <div>
                                    <h3>{id}</h3>
                                </div>
                                <div>
                                    <h3>{title}</h3>
                                </div>
                                <div>
                                    <h3>${formatPrice(discount_value)}</h3>
                                </div>
                                <div>
                                    <h3>${formatPrice(condition)}</h3>
                                </div>
                                <div>
                                    <h3>{formatDate(expiration)}</h3>
                                </div>
                                <div>
                                    <button onClick={() => setEdit(!showEdit)} className='edit-button manage-ticket'>Modify</button>
                                </div>
                            </div>
                                }
            </>
        );
    };

    return (
        <div className="manage-promotions-container">
          <div className='header'>
            {
                error
                    ?
                        <h2>{error}</h2>
                        :
                        <h2 style={{"fontSize":"3rem"}}>Manage Promotions</h2>
            }
          </div>
          <div className="promotions-list">
            <div className='rows'>
                <div key={'header'} className="promotion-row">
                    <div>
                        <h3>ID</h3>
                    </div>
                    <div>
                        <h3>Condition</h3>
                    </div>
                    <div>
                        <h3>Discount</h3>
                    </div>
                    <div>
                        <h3>Min Price</h3>
                    </div>
                    <div>
                        <h3>Valid Til</h3>
                    </div>
                    <div>
                        <h3>Manage</h3>
                    </div>
                </div>
                {
                    isPending || promotions == undefined
                        ?
                            <h3>Loading...</h3>
                            :
                            promotions.map((promotion) => {
                                return <PromotionRow key={promotion.title + ' ' + promotion.id} promotion={promotion}/>;
                            })
                }
                <div className='add-ticket-row'>
                    {
                        showAdd 
                            ?
                                <form onSubmit={handleNewTicket} className='new-ticket-form'>
                                    <div>
                                        <div>
                                            <label htmlFor="new-promotion-date">Date: </label>
                                            <input id='new-promotion-date' name='date' type="date" value={formatDateForInput(newExpiration)} onChange={e => setNewExpiration(e.target.value)} required/>
                                        </div>
                                        <div>
                                            <label htmlFor="new-promotion-discount">Discount: </label>
                                            <input id='new-promotion-discount' name='newDiscount' type="number" value={newDiscount} onChange={e => setNewDiscount(e.target.value)} onInput={handleInput} min={0} step={.01} placeholder='50.00' required/>
                                        </div>
                                        <div>
                                            <label htmlFor="new-promotion-condition">Min Value: </label>
                                            <input id='new-promotion-condition' name='newCondition' type="number" value={newCondition} onChange={e => setNewCondition(e.target.value)} onInput={handleInput} min={0} step={.01} placeholder='50.00' required/>
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
        </div>
    );
};

export default ManagePromotions;
