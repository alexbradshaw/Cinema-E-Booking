import React, { useState } from 'react';
import { getAllMoviesSlim } from '../utils/API';
import { useNavigate } from 'react-router-dom';
import "./CSS/Booking.css";
import { useQuery } from '@tanstack/react-query';

const Booking = () => {
    const [selectedMovie, setSelectedMovie] = useState('');
    const [selectedShowtime, setSelectedShowtime] = useState('');
    const [ticketCount, setTicketCount] = useState(1);  // State for the number of tickets
    const [ticketAges, setTicketAges] = useState([]);  // State for the ages of each ticket
    const [selectedSeats, setSelectedSeats] = useState([]);
    const navigate = useNavigate();
    const { isPending, data } = useQuery({ queryKey: ['slimMovies'], queryFn: getAllMoviesSlim });

    const showtimes = ['12:00 PM', '3:00 PM', '6:00 PM'];
    const seats = Array.from({ length: 60 }, (_, i) => `Seat ${i + 1}`);

    const handleMovieChange = (event) => {
        setSelectedMovie(event.target.value);
        setSelectedShowtime('');
        setSelectedSeats([]);
        setTicketCount(1);
        setTicketAges([]);
    };

    const handleShowtimeChange = (event) => {
        setSelectedShowtime(event.target.value);
        setSelectedSeats([]);
    };

    const handleSeatClick = (seat) => {
        setSelectedSeats((prevSeats) => {
            const isSelected = prevSeats.includes(seat);
            if (isSelected) {
                return prevSeats.filter((prevSeat) => prevSeat !== seat);
            } else if (prevSeats.length < ticketCount) {
                return [...prevSeats, seat];
            }
            return prevSeats;
        });
    };

    const handleTicketCountChange = (event) => {
        const count = parseInt(event.target.value, 10);
        setTicketCount(count);
        setTicketAges(Array(count).fill(''));  // Reset ages when ticket count changes
        setSelectedSeats([]);  // Reset selected seats if ticket count changes
    };

    const handleAgeChange = (index, event) => {
        const ages = [...ticketAges];
        ages[index] = event.target.value;
        setTicketAges(ages);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/orderSummary', { state: { movie: selectedMovie, showtime: selectedShowtime, seats: selectedSeats, seatAges: ticketAges } });
    };

    return (
        <div className='booking'>
            <h1>Booking</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="movie">Select a Movie:</label>
                    <select id="movie" value={selectedMovie} onChange={handleMovieChange} required>
                        <option value="" disabled>Select a movie</option>
                        {isPending ? <option disabled>Loading...</option> : data.map((movie) => <option key={movie.id} value={movie.title}>{movie.title}</option>)}
                    </select>
                </div>
                {selectedMovie && (
                    <div>
                        <label htmlFor="showtime">Select a Showtime:</label>
                        <select id="showtime" value={selectedShowtime} onChange={handleShowtimeChange} required>
                            <option value="" disabled>Select a showtime</option>
                            {showtimes.map((time) => <option key={time} value={time}>{time}</option>)}
                        </select>
                    </div>
                )}
                {selectedShowtime && (
                    <>
                        <div>
                            <label htmlFor="tickets">Number of Tickets:</label>
                            <input type="number" id="tickets" min="1" max="10" value={ticketCount} onChange={handleTicketCountChange} required />
                        </div>
                        <div>
                            {Array.from({ length: ticketCount }, (_, index) => (
                                <div key={index}>
                                    <label>Ticket {index + 1} Age:</label>
                                    <input type="number" min="0" value={ticketAges[index] || ''} onChange={(e) => handleAgeChange(index, e)} required />
                                </div>
                            ))}
                        </div>
                        <div>
                            <label>Select Seats:</label>
                            <div className="seat-grid">
                                {seats.map((seat) => (
                                    <button
                                        key={seat}
                                        className={`seat ${selectedSeats.includes(seat) ? 'selected' : ''}`}
                                        onClick={() => handleSeatClick(seat)}
                                        type="button"
                                    >
                                        {seat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                )}
                <button type="submit">Book Tickets</button>
            </form>
        </div>
    );
};

export default Booking;