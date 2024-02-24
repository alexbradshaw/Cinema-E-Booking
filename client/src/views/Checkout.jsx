import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Checkout  = () => { 
    const navigate = useNavigate();
    const location = useLocation();
    const { movie, showtime, seats, seatAges, totalCost } = location.state || {};

    const [paymentInfo, setPaymentInfo] = useState({ //holds payment info input
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        nameOnCard: '',
    });

    const handleInputChange = (e) => { //updates the card details state based on input
        const { name, value } = e.target;
        setPaymentInfo({ ...paymentInfo, [name]: value });
    };

    const handleCompletePurchase= () => {
        //add purchace logic later
        console.log('Purchase Completed!');

        //navigate to OrderConfrirmation
        navigate('/orderConfirmation', { state: { movie, showtime, seats, seatAges, totalCost } });
    }

    const handleCancel = () => {
        navigate('/orderSummary', { state: { movie, showtime, seats, seatAges, totalCost } });
      };
    
      if (!movie || !showtime || !seats || !totalCost) {
        return <p>Order details not found. Please go back to booking.</p>;
      }

    return(
        <div>
        <h1>Checkout</h1>
        <div>
          <h2>Order Details</h2>
          <p>Movie: {movie}</p>
          <p>Showtime: {showtime}</p>
          <p>
            {Object.keys(seatAges).length > 0 && (
            <p>
                Seat Ages:{' '}
                {Object.entries(seatAges)
                .map(([seat, age]) => `${seat}: ${age}`)
                .join(', ')}
            </p>
            )}
            </p>
          <p>Total Cost: ${totalCost}</p>
        </div>
        <div>
          <h2>Payment Information</h2>
          <input name="cardNumber" placeholder="Card Number" value={paymentInfo.cardNumber} onChange={handleInputChange} />
          <input name="expiryDate" placeholder="Expiry Date" value={paymentInfo.expiryDate} onChange={handleInputChange} />
          <input name="cvv" type="password" placeholder="CVV" value={paymentInfo.cvv} onChange={handleInputChange} />
          <input name="nameOnCard" placeholder="Name on Card" value={paymentInfo.nameOnCard} onChange={handleInputChange} />
        </div>
        <button onClick={handleCompletePurchase}>Complete Purchase</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    );
}

export default Checkout;