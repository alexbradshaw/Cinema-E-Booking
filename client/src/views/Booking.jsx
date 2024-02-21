import React, { useState, useEffect } from 'react';
import { getAllMovies } from '../utils/API';
import "./CSS/Booking.css";

const Booking = () => {
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatAges, setSeatAges] = useState({});
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getAllMovies();
        setMovies(moviesData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [])

  // Sample data, replace with your actual movie and showtime data
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
  };

  return (
    <div>
      <h1>Booking</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="movie">Select a Movie:</label>
          <select id="movie" value={selectedMovie} onChange={handleMovieChange} required>
            <option value="" disabled>Select a movie</option>
            {movies.map((movie) => (
              <option key={movie.id} value={movie.title}>
                {movie.title}</option>
            ))}
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
