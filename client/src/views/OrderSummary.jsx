import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, showtime, seats, seatAges } = location.state || {};
  const ticketPrice = 10;

  const totalCost = seats.length * ticketPrice;

  if (!movie || !showtime || seats.length === 0) {
    return <p>No booking details found.</p>;
  }

  const handleConfirmOrder = () => {
    navigate('/login', { state: { movie, showtime, seats, seatAges, totalCost, pendingOrder: true } });
  };

  const handleCancelOrder = () => {
    navigate('/booking');
  };

  return (
    <div>
      <h1>Order Summary</h1>
      <p>Selected Movie: {movie}</p>
      <p>Selected Showtime: {showtime}</p>
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
      <p>Ticket Price: ${ticketPrice} each</p>
      <p>Total Cost: ${totalCost}</p>

      <button onClick={handleConfirmOrder}>Confirm Order</button>
      <button onClick={handleCancelOrder}>Cancel</button>
    </div>
  );
};

export default OrderSummary;