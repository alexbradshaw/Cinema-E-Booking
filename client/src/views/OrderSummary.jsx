import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./CSS/OrderSummary.css";
import { getAllTicketTypes } from '../utils/API';
import { formatTime } from '../utils/utils';

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movieId, movie, showtime, seats } = location.state || {};
  const [ticketTypes, setTicketTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState({});
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const fetchTicketTypes = async () => {
      try {
        const types = await getAllTicketTypes();
        setTicketTypes(types);
        const initialTypes = seats.reduce((acc, seat) => ({ ...acc, [seat]: types[0]?.id }), {});
        setSelectedTypes(initialTypes);
      } catch (error) {
        console.error('Failed to fetch ticket types:', error);
      }
    };

    fetchTicketTypes();
  }, [seats]);

  useEffect(() => {
    const calculateTotal = () => {
      const cost = seats.reduce((total, seat) => {
        const typeId = selectedTypes[seat];
        const type = ticketTypes.find(t => t.id === parseInt(typeId));
        return total + (type ? type.price : 0);
      }, 0);
      setTotalCost(cost);
    };

    if (ticketTypes.length > 0) calculateTotal();
  }, [selectedTypes, ticketTypes, seats]);

  const handleTypeChange = (seat, typeId) => {
    setSelectedTypes(prev => ({
      ...prev,
      [seat]: JSON.parse(typeId)
    }));
  };

  const handleConfirmOrder = () => {
    const finalTypes = []
    const selected = Object.keys(selectedTypes);
    const values = Object.values(selectedTypes);
    for (let i = 0; i < selected.length; i++) {
      finalTypes.push({ name: selected[i], value: values[i] })
    }
    navigate('/checkout', { state: { movieId, movie, showtime, seats, selectedTypes: finalTypes, ticketTypes, totalCost } });
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
      <p><strong>Selected Showtime:</strong> {formatTime(showtime)}</p>
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
        <button className="confirm-btn" onClick={handleConfirmOrder}>Proceed to Checkout</button>
        <button className="cancel-btn" onClick={handleCancelOrder}>Cancel</button>
      </div>
    </div>
  );
};

export default OrderSummary;