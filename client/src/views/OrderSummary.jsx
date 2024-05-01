import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./CSS/OrderSummary.css"; // Make sure the CSS path is correct

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, showtime, seats, seatAges } = location.state || {};

  // Function to determine ticket price based on age
  const getTicketPrice = (age) => {
    if (age <= 12) return 10;
    else if (age >= 60) return 15;
    else return 20;
  };

  // Calculate the total cost based on ages
  const totalCost = seats.reduce((total, seat, index) => {
    const age = seatAges[seat];
    return total + getTicketPrice(age);
  }, 0);

  if (!movie || !showtime || seats.length === 0) {
    return <p>No booking details found.</p>;
  }

  const handleConfirmOrder = () => {
    navigate('/checkout', { state: { movie, showtime, seats, seatAges, totalCost } });
  };

  const handleCancelOrder = () => {
    navigate('/booking'); // Navigate back to the booking page
  };

  return (
    <div className="order-summary-container">
      <h1>Order Summary</h1>
      <div className="summary-section">
        <p><strong>Selected Movie:</strong> {movie}</p>
        <p><strong>Selected Showtime:</strong> {showtime}</p>
        <p><strong>Seats and Prices:</strong></p>
        <ul>
          {seats.map((seat, index) => (
            <li key={seat}>{seat}: Age {seatAges[seat]} - Price: ${getTicketPrice(seatAges[seat])}</li>
          ))}
        </ul>
        <p><strong>Total Cost:</strong> ${totalCost}</p>
      </div>
      <div className="actions">
        <button className="confirm-btn" onClick={handleConfirmOrder}>Confirm Order</button>
        <button className="cancel-btn" onClick={handleCancelOrder}>Cancel</button>
      </div>
    </div>
  );
};

export default OrderSummary;