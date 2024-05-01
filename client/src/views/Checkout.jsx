import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CSS/Checkout.css';  // Ensure the path here is correct
import { getAllTicketTypes, getAllPromotions, bookTickets } from '../utils/API';
import { formatTime } from '../utils/utils';
import { useMutation } from '@tanstack/react-query';

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { movieId, movie, showtime, seats, selectedTypes, totalCost } = location.state || {};
    const [ticketTypes, setTicketTypes] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [selectedPromotion, setSelectedPromotion] = useState(null);
    const [discountedTotal, setDiscountedTotal] = useState(totalCost);
    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        nameOnCard: '',
    });

    useEffect(() => {
        // Fetch ticket types similar to OrderSummary
        const fetchTicketTypes = async () => {
            try {
                const types = await getAllTicketTypes();
                setTicketTypes(types);
            } catch (error) {
                console.error('Failed to fetch ticket types:', error);
            }
        };

        const fetchPromotions = async () => {
            try {
                const promotionsData = await getAllPromotions();
                setPromotions(promotionsData);
            } catch (error) {
                console.error("Error fetching promotions:", error);
            }
        };

        fetchTicketTypes();
        fetchPromotions();
    }, []);

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
          navigate('/orderConfirmation', { state: { movieId, movie, showtime, seats, selectedTypes, discountedTotal }});
        },
        onError: (error) => {
          console.error(error)
        }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo({ ...paymentInfo, [name]: value });
    };

    const handleCompletePurchase = async () => {
        await bookingMutation.mutateAsync({ 
            total: discountedTotal, 
            promotion_id: 1, 
            movie_id: movieId, 
            movie: movie,
            ticketsAndSeats: selectedTypes, 
            showing: showtime 
        })
    };

    const handleCancel = () => {
        navigate('/orderSummary', { state: { movieId, movie, showtime, seats, selectedTypes, totalCost } });
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
                        {seats.map((seat) => {
                            const typeId = selectedTypes[seat];
                            const type = ticketTypes.find(t => t.id === parseInt(typeId));
                            return (
                                <li key={seat}>
                                    {seat}: {type ? `${type.name} - $${type.price.toFixed(2)}` : 'Type not found'}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="detail-item">
                    <strong>Promotion:</strong>
                    <select value={selectedPromotion} onChange={handlePromotionChange}>
                        <option value="">Select Promotion</option>
                        {promotions.map(promo => (
                            <option disabled={totalCost < promo.condition} key={promo.id} value={promo.id}>{promo.title} - ${promo.discount_value}</option>
                        ))}
                    </select>
                </div>
                <div className="detail-item">
                    <strong>Total Cost:</strong> ${discountedTotal.toFixed(2)}
                </div>
            </div>
            <h2>Payment Information</h2>
            <div className="input-group">
                <input name="cardNumber" placeholder="Card Number" value={paymentInfo.cardNumber} onChange={handleInputChange} />
                <input name="expiryDate" placeholder="Expiry Date" value={paymentInfo.expiryDate} onChange={handleInputChange} />
                <input name="cvv" type="password" placeholder="CVV" value={paymentInfo.cvv} onChange={handleInputChange} />
                <input name="nameOnCard" placeholder="Name on Card" value={paymentInfo.nameOnCard} onChange={handleInputChange} />
            </div>
            <div className="actions">
                <button className="button confirm-btn" onClick={handleCompletePurchase}>Complete Purchase</button>
                <button className="button cancel-btn" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default Checkout;