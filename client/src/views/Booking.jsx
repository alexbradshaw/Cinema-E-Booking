import React, { useEffect, useState } from 'react';
import { getAllMoviesSlim, getShowtimes } from '../utils/API';
import { formatTime } from '../utils/utils';
import { useNavigate } from 'react-router-dom';
import "./CSS/Booking.css";
import { useQuery } from '@tanstack/react-query';
import movieScreenImage from '../../public/seeds/screen.svg';

const Booking = () => {
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showtimes, setShowTimes] = useState([]);
  //const [seatAges, setSeatAges] = useState({});

  const navigate = useNavigate();

  const { isSuccess, data } = useQuery({ queryKey: ['showtimes'], queryFn: getShowtimes })
  const movies = useQuery({ queryKey: ['slimMovies'], queryFn: getAllMoviesSlim })

  useEffect(()=>{setTimes(data)}, [isSuccess]);

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

  const handleSeatClick = (seat, ticket_id) => {
    setSelectedSeats((prevSeats) => {
      if (!ticket_id) {
        if (prevSeats.includes(seat)) {
          const updatedSeats = prevSeats.filter((prevSeat) => prevSeat !== seat);
          //const updatedSeatAges = { ...seatAges };
          //delete updatedSeatAges[seat];
          //setSeatAges(updatedSeatAges);
          return updatedSeats;
        } else {
          return [...prevSeats, seat];
        } 
      } else {
        return prevSeats
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

    const movieId = data.filter((show) => {
      if (show.movie.title == selectedMovie && show.time == selectedShowtime) {
        return true;
      }
    })[0].id;

    if (!localStorage.getItem('auth')) {
      navigate('/login', { state: { movieId: movieId, movie: selectedMovie, showtime: selectedShowtime, seats: selectedSeats } });
    } else {
      navigate('/orderSummary', { state: { movieId: movieId, movie: selectedMovie, showtime: selectedShowtime, seats: selectedSeats } });
    }
  };

  const setTimes = (times) => {
    if (!times) return;

    const time = []
    
    for (let i = 0; i < 3; i++) {
      time.push(times[i].time);
    }
    
    setShowTimes(time);
  }

  const renderSeats = () => {
    const size = data.filter((show) => {
      if (show.movie.title == selectedMovie && show.time == selectedShowtime) {
        return true;
      }
    })[0].id;

    const rows = data[size - 1].seats;

    const cols = 10

    const seats = [];

    for (let a = 0; a < rows.length; a += 10) {
      const rowSeats = [];
        for (let i = 0; i < cols; i++) {
          const seat = `${rows[a + i].row}${rows[a + i].number}`;
          const isSelected = selectedSeats.includes(seat);
          rowSeats.push(
            <div
              key={seat}
              className={`seat ${rows[a + i].ticket_id ? 'unavailable' : isSelected ? 'selected' : ''}`}
              onClick={() => handleSeatClick(seat, rows[a + i].ticket_id)}
            >
              {i} {/* Only display the number for the seat */}
            </div>
          );
        }
        seats.push(
          <div key={rows[a].row} className="seatRow">
            <div className="rowLetter">{rows[a].row}</div>
            {rowSeats}
          </div>
        );
      }
    return seats;
  };

  return (
    <div className="bookingContainer">
      <h1>Booking</h1>
      <form onSubmit={handleSubmit} className='bookingForm' id='bookingForm'>
        <div className='selectionContainer'>
          <div className='formSelects'>
            <div>
              <label htmlFor="movie">Select a Movie: &nbsp;</label>
              <select id="movie" value={selectedMovie} onChange={handleMovieChange} required>
                <option value="" disabled>Select a movie</option>
                {movies.isPending ? <option value="" disabled>Loading..</option> : movies.data.map((movie) => <option key={movie.id} value={movie.title}>{movie.title}</option>)}
              </select>
            </div>
            {selectedMovie && (
              <div>
                <label htmlFor="showtime">Select a Showtime:</label>
                <select id="showtime" value={selectedShowtime} onChange={handleShowtimeChange} required>
                  <option value="" disabled>Select a showtime</option>
                  {showtimes.map((time) => <option key={time} value={time}>{formatTime(time)}</option>)}
                </select>
              </div>
            )}
          </div>
        </div>
        {selectedShowtime && (
          <>
            <div className="theater">
            <img src={movieScreenImage} alt="Movie Screen" />
              <div className="seating-chart">
                {renderSeats()}
              </div>
              <div className="key">
                <div className="keyItem">
                  <input type="checkbox" disabled checked /> Available
                </div>
                <div className="keyItem">
                  <input type="checkbox" disabled checked /> Selected
                </div>
                <div className="keyItem">
                  <input type="checkbox" disabled checked /> Unavailable
                </div>
              </div>
              <div className="backOfTheater">
                Back of Theater
              </div>
            </div>
          </>
        )}
      </form>
      <div className='bookingButtons'>
        <button type="button" className="purchaseButton" onClick={handleDeselectAll}>Deselect All</button>
        <button className="purchaseButton" type="submit" form='bookingForm'>Book Tickets</button>
      </div>
    </div>
  );
};

export default Booking;
