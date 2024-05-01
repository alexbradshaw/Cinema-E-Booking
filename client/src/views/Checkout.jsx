import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CSS/Checkout.css';  // Ensure the path here is correct
import { getAllTicketTypes, getAllPromotions, bookTickets, getUserCard } from '../utils/API';
import { formatTime } from '../utils/utils';
import { useMutation, useQuery } from '@tanstack/react-query';

const CreditCard = ({ card }) => {
    return (
        <div className="input-group">
            <input name="cardNumber" placeholder="Card Number" value={card.last_four} />
            <input name="expiryDate" placeholder="Expiry Date" value={card.expiry_date} />
            <input name="cvv" type="password" placeholder="CVV" value={card.cvv} />
            <input name="nameOnCard" placeholder="Name on Card" value={card.cardholder_name} />
        </div>
    );
}

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { movieId, movie, showtime, seats, selectedTypes, ticketTypes, totalCost } = location.state || {};
    const [selectedPromotion, setSelectedPromotion] = useState(0);
    const [discountedTotal, setDiscountedTotal] = useState(totalCost);

    const { isPending, data: promotions } = useQuery({ queryKey: ['promotions'], queryFn: getAllPromotions })
    const { isPending: cardPending, data: card } = useQuery({ queryKey: ['card'], queryFn: getUserCard })

    useEffect(() => {
        // Calculate discounted total when a promotion is selected
        if (selectedPromotion) {
            const promotion = promotions.find(p => p.id === parseInt(selectedPromotion));
            if (promotion.condition < totalCost) {
                const discountValue = promotion ? promotion.discount_value : 0;
                setDiscountedTotal(totalCost - discountValue);
            } else {
                setDiscountedTotal(totalCost);
            }
        } else {
            setDiscountedTotal(totalCost);
        }
    }, [selectedPromotion, promotions, totalCost]);

    const bookingMutation = useMutation({ 
        mutationFn: bookTickets, 
        onSuccess: async () => {
          navigate('/orderConfirmation', { state: { movieId, movie, showtime, seats, selectedTypes, ticketTypes, discountedTotal }});
        },
        onError: (error) => {
          console.error(error)
        }
    });

    const handleCompletePurchase = async () => {
        await bookingMutation.mutateAsync({ 
            total: discountedTotal, 
            promotion_id: selectedPromotion, 
            movie_id: movieId, 
            movie: movie,
            ticketsAndSeats: selectedTypes, 
            showing: showtime 
        })
    };

    const handleCancel = () => {
        navigate('/orderSummary', { state: { movieId, movie, showtime, seats, selectedTypes, ticketTypes, totalCost } });
    };

    if (!movie || !showtime || !seats || !totalCost) {
        return <p>Order details not found. Please go back to booking.</p>;
    }

    const handlePromotionChange = (e) => {
        setSelectedPromotion(e.target.value);
    };

    return (
        <div className="checkout-container">
            <h1 className="checkout-title">Checkout</h1>
            <div className="details-section">
                <div className="detail-item">
                    <strong>Movie:</strong> {movie}
                </div>
                <div className="detail-item">
                    <strong>Showtime:</strong> {formatTime(showtime)}
                </div>
                <div className="detail-item">
                    <strong>Tickets:</strong>
                    <ul>
                        {selectedTypes.map((seat) => {
                            return (
                                <li key={seat.name}>
                                    {seat.name}: {`${ticketTypes[seat.value - 1].name} - $${ticketTypes[seat.value - 1].price.toFixed(2)}`}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="detail-item">
                    <strong>Promotion:</strong>
                    <select value={selectedPromotion} onChange={handlePromotionChange}>
                        <option value="0">Select Promotion</option>
                        {
                            isPending || promotions == undefined
                                ?
                                    <></>
                                    :
                                    promotions.map(promo => (
                                        <option disabled={totalCost < promo.condition} key={promo.id} value={promo.id}>{promo.title} - ${promo.discount_value}</option>
                                    ))
                        }
                    </select>
                </div>
                <div className="detail-item">
                    <strong>Total Cost:</strong> ${discountedTotal.toFixed(2)}
                </div>
            </div>
            <h2>Payment Information</h2>
                    {cardPending || card == undefined ? <CreditCard card={{last_four: '', cvv: '', cardholder_name: '', expiry_date: new Date()}} /> : <CreditCard card={card} />}
            <div className="actions">
                <button className="button confirm-btn" onClick={handleCompletePurchase}>Complete Purchase</button>
                <button className="button cancel-btn" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default Checkout;