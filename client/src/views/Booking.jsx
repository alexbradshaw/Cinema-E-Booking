import React, { useState } from 'react';
import { getAllMoviesSlim } from '../utils/API';
import { useNavigate } from 'react-router-dom';
import "./CSS/Booking.css";
import { useQuery } from '@tanstack/react-query';
import movieScreenImage from '../../public/seeds/screen.svg';

const Booking = () => {
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  //const [seatAges, setSeatAges] = useState({});

  const navigate = useNavigate();

  const { isPending, data } = useQuery({ queryKey: ['slimMovies'], queryFn: getAllMoviesSlim })

  const showtimes = ['12:00 PM', '3:00 PM', '6:00 PM'];

  const handleMovieChange = (event) => {
    setSelectedMovie(event.target.value);
    setSelectedShowtime('');
    setSelectedSeats([]);
    //setSeatAges({});
  };

  const handleShowtimeChange = (event) => {
    setSelectedShowtime(event.target.value);
    setSelectedSeats([]);
    //setSeatAges({});
  };

  const handleSeatClick = (seat) => {
    setSelectedSeats((prevSeats) => {
      if (prevSeats.includes(seat)) {
        const updatedSeats = prevSeats.filter((prevSeat) => prevSeat !== seat);
        //const updatedSeatAges = { ...seatAges };
        //delete updatedSeatAges[seat];
        //setSeatAges(updatedSeatAges);
        return updatedSeats;
      } else {
        return [...prevSeats, seat];
      }
    });
  };

  const handleDeselectAll = () => {
    setSelectedSeats([]);
    setSeatAges({});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedMovie || !selectedShowtime || selectedSeats.length === 0) {
      alert('Please select movie, showtime, and at least one seat.');
      return;
    }
    navigate('/orderSummary', { state: { movie: selectedMovie, showtime: selectedShowtime, seats: selectedSeats } });
  };

  const renderSeats = () => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'walkway', 'F', 'G', 'H', 'I', 'J']; // Added 'walkway' between E and F
    const cols = 20;

    const seats = [];
    for (let row of rows) {
      if (row === 'walkway') {
        seats.push(<div key={row} className="walkway" />);
      } else {
        const rowSeats = [];
        for (let i = 1; i <= cols; i++) {
          const seat = `${row}${i}`;
          const isSelected = selectedSeats.includes(seat);
          rowSeats.push(
            <div
              key={seat}
              className={`seat ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSeatClick(seat)}
            >
              {i} {/* Only display the number for the seat */}
            </div>
          );
        }
        seats.push(
          <div key={row} className="seatRow">
            <div className="rowLetter">{row}</div>
            {rowSeats}
          </div>
        );
      }
    }
    return seats;
  };

  return (
    <div className="bookingContainer">
      <h1>Booking</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="movie">Select a Movie: &nbsp;</label>
          <select id="movie" value={selectedMovie} onChange={handleMovieChange} required>
            <option value="" disabled>Select a movie</option>
            {isPending ? <option value="" disabled>Loading..</option> : data.map((movie) => <option key={movie.id} value={movie.title}>{movie.title}</option>)}
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
          <button className="purchaseButton" type="submit">Book Tickets</button>
        )}
      </form>
      <div className="theater">
        <img src={movieScreenImage} alt="Movie Screen" />
        <div className="seating-chart">
          {renderSeats()}
        </div>
      </div>
      <button type="button" className="purchaseButton" onClick={handleDeselectAll}>Deselect All</button>
    </div>
  );
};

export default Booking;
