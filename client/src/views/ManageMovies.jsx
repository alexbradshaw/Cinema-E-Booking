import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { checkAdmin, getAllMovies } from '../utils/API';
import { formatMovieLength } from '../utils/utils';
import './CSS/ManageMovies.css'; // Import CSS for ManageMovies view
import { AuthContext } from '../App';
import { useQuery } from '@tanstack/react-query';

const ManageMovies = () => {
  const navigate = useNavigate();
  const { admin: { isAdmin } } = useContext(AuthContext);

  useEffect(() => { checkAdmin(navigate) }, [isAdmin]);

  const { isPending, data: movies } = useQuery({ queryKey: ['movies'], queryFn: getAllMovies })

  return (
    <div className="manage-movies-container">
      <div className='header'>
        <div>
            <h2 style={{"fontSize": "3rem"}}>Manage Movies</h2>
        </div>
      </div>

      <div className="movies-list">
        <div className='rows'>
          <div key={'header'} className="movie-row">
            <div>
              <h3>ID</h3>
            </div>
            <div>
              <h3>Title</h3>
            </div>
            <div>
              <h3>Status</h3>
            </div>
            <div>
              <h3>Rating</h3>
            </div>
            <div>
              <h3>Length (Hours)</h3>
            </div>
            <div>
              <h3>Manage</h3>
            </div>
          </div>
        {
          isPending 
            ? 
              <h1>Loading...</h1>
            :
              (
                movies.map((movie) => (
                  <div key={"admin movie display item " + movie.id} className='movie-row'>
                    <div>
                      <h4>{movie.id}</h4>
                    </div>
                    <div>
                      <h4>{movie.title}</h4>
                    </div>
                    <div>
                      <h4>{new Date(movie.starts_showing) < Date.now() ? <span style={{'color': 'green'}}>Running</span> : <span style={{'color': 'red'}}>Coming Soon</span> }</h4>
                    </div>
                    <div>
                      <h4>{movie.rating}</h4>
                    </div>
                    <div>
                      <h4>{formatMovieLength(movie.length)}</h4>
                    </div>
                    <div>
                      <Link className='edit-button manage-movie' state={{'movie' : movie}} to={`${movie.id}`}>Modify Movie</Link>
                    </div>
                  </div>
                ))
              )
        }
            <div className='add-movie-row'>
              <Link to="/admin/movies/addMovie">
                <button className="add-movie-button">Add Movie</button>
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ManageMovies;
