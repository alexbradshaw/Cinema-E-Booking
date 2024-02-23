import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const OrderSummary = () => {
    // Use the useLocation hook to get data passed from the Booking page
    const location = useLocation();
    const { movie, showtime, seats, seatAges } = location.state || {};
  
    // Ensure that there are booking details before rendering
    if (!movie || !showtime || seats.length === 0) {
      return <p>No booking details found.</p>;
    }
  
    return (
      <div>
        <h1>Order Summary</h1>
        <p>Selected Movie: {movie}</p>
        <p>Selected Showtime: {showtime}</p>
        <p>Selected Seats: {seats.join(', ')}</p>
  
        {/* Display seat ages if available */}
        {Object.keys(seatAges).length > 0 && (
          <p>
            Seat Ages:{' '}
            {Object.entries(seatAges)
              .map(([seat, age]) => `${seat}: ${age}`)
              .join(', ')}
          </p>
        )}
  
        {/* Add more details or styling as needed */}
      </div>
    );
  };
  
  export default OrderSummary;