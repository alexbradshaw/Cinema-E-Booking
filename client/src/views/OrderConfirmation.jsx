import { useLocation, useNavigate } from 'react-router-dom';
import { getAllTicketTypes } from '../utils/API'; // Import to fetch ticket type details
import './CSS/OrderConfirmation.css'; // Ensure this path is correct
import { useEffect, useState } from 'react';
import { formatTime } from '../utils/utils';

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Extracting booking details passed from Checkout
    const { movie, showtime, seats, selectedTypes, discountedTotal } = location.state || {};
    const [ticketTypes, setTicketTypes] = useState([]);

    useEffect(() => {
        // Fetch ticket types once on mount
        const fetchTicketTypes = async () => {
            try {
                const types = await getAllTicketTypes();
                setTicketTypes(types);
            } catch (error) {
                console.error('Failed to fetch ticket types:', error);
            }
        };
        fetchTicketTypes();
    }, []);

    // Function to get ticket type name by ID
    const getTicketTypeName = (typeId) => {
        const type = ticketTypes.find(type => type.id === parseInt(typeId));
        return type ? type.name : 'Unknown Type';
    };

    // Handle exit button click
    const handleExit = () => {
        navigate('/');
    };

    // Early return if booking details are missing
    if (!movie || !showtime || !seats) {
        return <p>Confirmation details not found.</p>;
    }

    return (
        <div className="confirmation-container">
            <h1 className="confirmation-title">Order Confirmed!</h1>
            <p className="confirmation-details">Thank you for your booking. Here are your confirmation details:</p>
            <ul>
                <li><strong>Movie:</strong> {movie}</li>
                <li><strong>Showtime:</strong> {formatTime(showtime)}</li>
                {seats.map(seat => (
                    <li key={seat}>
                        <strong>Seat {seat}:</strong> {getTicketTypeName(selectedTypes[seat])}
                    </li>
                ))}
                <li><strong>Total Cost:</strong> ${discountedTotal.toFixed(2)}</li>
            </ul>
            <div className="actions">
                <button className="exit-button" onClick={handleExit}>Confirm Exit</button>
            </div>
        </div>
    );
};

export default OrderConfirmation;