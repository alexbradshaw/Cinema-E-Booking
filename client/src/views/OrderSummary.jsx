import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./CSS/OrderSummary.css";
import { getAllTicketTypes } from '../utils/API'; // Import the API call

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, showtime, seats } = location.state || {};
  const [ticketTypes, setTicketTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState({});
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const fetchTicketTypes = async () => {
      try {
        const types = await getAllTicketTypes();
        setTicketTypes(types);
        setSelectedTypes(seats.reduce((acc, seat) => ({ ...acc, [seat]: types[0]?.id }), {}));
      } catch (error) {
        console.error('Failed to fetch ticket types:', error);
      }
    };

    fetchTicketTypes();
  }, [seats]);

  useEffect(() => {
    // Calculate total cost whenever selectedTypes changes
    const calculateTotal = () => {
      const cost = seats.reduce((total, seat) => {
        const type = ticketTypes.find(t => t.id === selectedTypes[seat]);
        return total + (type ? type.price : 0);
      }, 0);
      setTotalCost(cost);
    };

    calculateTotal();
  }, [selectedTypes, seats, ticketTypes]);

  const handleTypeChange = (seat, typeId) => {
    setSelectedTypes({ ...selectedTypes, [seat]: typeId });
  };

  const handleConfirmOrder = () => {
    navigate('/checkout', { state: { movie, showtime, seats, selectedTypes, totalCost } });
  };

  const handleCancelOrder = () => {
    navigate('/booking');
  };

  if (!movie || !showtime || seats.length === 0) {
    return <p>No booking details found.</p>;
  }

  return (
    <div className="order-summary-container">
      <h1>Order Summary</h1>
      <p><strong>Selected Movie:</strong> {movie}</p>
      <p><strong>Selected Showtime:</strong> {showtime}</p>
      <ul>
        {seats.map((seat) => (
          <li key={seat}>
            {seat}:
            <select value={selectedTypes[seat]} onChange={(e) => handleTypeChange(seat, e.target.value)}>
              {ticketTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name} - ${type.price}</option>
              ))}
            </select>
          </li>
        ))}
      </ul>
      <p><strong>Total Cost:</strong> ${totalCost.toFixed(2)}</p>
      <div className="actions">
        <button className="confirm-btn" onClick={handleConfirmOrder}>Confirm Order</button>
        <button className="cancel-btn" onClick={handleCancelOrder}>Cancel</button>
      </div>
    </div>
  );
};

export default OrderSummary;