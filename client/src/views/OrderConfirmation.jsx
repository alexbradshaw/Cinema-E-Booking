import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Extracting booking details passed from Checkout
    const { movie, showtime, seats, seatAges, totalCost } = location.state || {};

    // Handle exit button click
    const handleExit = () => {
        navigate('/');
    };

    // Early return if booking details are missing
    if (!movie || !showtime || !seats || !seatAges) {
        return <p>Confirmation details not found.</p>;
    }

    return (
        <div>
            <h1>Order Confirmed!</h1>
            {/* Display booking details */}
            <p>Thank you for your booking. Here are your confirmation details:</p>
            <ul>
                <li>Movie: {movie}</li>
                <li>Showtime: {showtime}</li>
                {Object.entries(seatAges).map(([seat, age]) => (
                    <li key={seat}>Seat {seat}: Age {age}</li>
                ))}
                <li>Total Cost: ${totalCost}</li>
            </ul>
            {/* Additional details as needed */}
            <button onClick={handleExit}>Confirm Exit</button>
        </div>
    );
};

export default OrderConfirmation;