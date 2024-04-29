import React, { useState } from 'react';
import { getAllMoviesSlim } from '../utils/API';
import { useNavigate } from 'react-router-dom';
import "./CSS/Booking.css";
import { useQuery } from '@tanstack/react-query';

const Booking = () => {
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatAges, setSeatAges] = useState({});

  const navigate = useNavigate();

  const { isPending, data } = useQuery({ queryKey: ['slimMovies'], queryFn: getAllMoviesSlim })

  // Sample data, replace with actual movie and showtime data
  const showtimes = ['12:00 PM', '3:00 PM', '6:00 PM'];

  const handleMovieChange = (event) => {
    setSelectedMovie(event.target.value);
    // Reset showtime and selected seats when movie changes
    setSelectedShowtime('');
    setSelectedSeats([]);
  };

  const handleShowtimeChange = (event) => {
    setSelectedShowtime(event.target.value);
    // Reset selected seats when showtime changes
    setSelectedSeats([]);
  };

  const handleSeatClick = (seat) => {
    // Toggle selected seats
    setSelectedSeats((prevSeats) => {
      if (prevSeats.includes(seat)) {
        return prevSeats.filter((prevSeat) => prevSeat !== seat);
      } else {
        return [...prevSeats, seat];
      }
    });
  };

  const handleAgeChange = (seat, event) => {
    const age = event.target.value;
    setSeatAges((prevAges) => ({ ...prevAges, [seat]: age }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process the booking details (selectedMovie, selectedShowtime, selectedSeats, seatAges)
    // You can handle the form submission logic here, e.g., sending data to the server
    console.log('Booking submitted:', {
      movie: selectedMovie,
      showtime: selectedShowtime,
      seats: selectedSeats,
      seatAges: seatAges,
    });

    navigate('/orderSummary', { state: { movie: selectedMovie, showtime: selectedShowtime, seats: selectedSeats, seatAges: seatAges } });

  };

  return (
    <div>
      <h1>Booking</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="movie">Select a Movie:</label>
          <select id="movie" value={selectedMovie} onChange={handleMovieChange} required>
            <option value="" disabled>Select a movie</option>
            {
              isPending 
                ? 
                  <option value="" disabled>Loading..</option> 
                : 
                  data.map((movie) => <option key={movie.id} value={movie.title}> {movie.title}</option>)
            }
          </select>
        </div>
        {selectedMovie && (
          <div>
            <label htmlFor="showtime">Select a Showtime:</label>
            <select id="showtime" value={selectedShowtime} onChange={handleShowtimeChange} required>
              <option value="" disabled>Select a showtime</option>
              {showtimes.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        )}
        {selectedShowtime && (
          <div>
            <label>Select Seats:</label>
            <div>
              {['A1', 'A2', 'A3', 'B1', 'B2', 'B3'].map((seat) => (
                <label key={seat}>
                  <input
                    type="checkbox"
                    checked={selectedSeats.includes(seat)}
                    onChange={() => handleSeatClick(seat)}
                  />
                  {seat}
                  <input
                    type="number"
                    placeholder="Age"
                    value={seatAges[seat] || ''}
                    onChange={(event) => handleAgeChange(seat, event)}
                    min="0"
                  />
                </label>
              ))}
            </div>
          </div>
        )}
        <button type="submit">Book Tickets</button>
      </form>
    </div>
  );
};

export default Booking;
