import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CSS/Checkout.css';  // Ensure the path here is correct

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { movie, showtime, seats, seatAges, totalCost } = location.state || {};

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        nameOnCard: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo({ ...paymentInfo, [name]: value });
    };

    const handleCompletePurchase = () => {
        console.log('Purchase Completed!');
        navigate('/orderConfirmation', { state: { movie, showtime, seats, seatAges, totalCost } });
    };

    const handleCancel = () => {
        navigate('/orderSummary', { state: { movie, showtime, seats, seatAges, totalCost } });
    };

    if (!movie || !showtime || !seats || !totalCost) {
        return <p>Order details not found. Please go back to booking.</p>;
    }

    return (
        <div className="checkout-container">
            <h1 className="checkout-title">Checkout</h1>
            <div className="details-section">
                <div className="detail-item">
                    <strong>Movie:</strong> {movie}
                </div>
                <div className="detail-item">
                    <strong>Showtime:</strong> {showtime}
                </div>
                <div className="detail-item">
                    <strong>Total Cost:</strong> ${totalCost.toFixed(2)}
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