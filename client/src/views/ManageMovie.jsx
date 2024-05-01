import './CSS/ManageMovies.css'; 
import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { formatMovieLength } from '../utils/utils';

const ManageMovie = () => {
    const navigate = useNavigate();
    const { state: { movie } } = useLocation();
    const { id, length, poster_url, rating, starts_showing, stops_showing, title, trailer_url, vote_average } = movie;
    const [success, setSuccess] = useState(false);


    const [form, setForm] = useState("");

    const onUpdate = ({ target: { name } }) => {
        let updated = form;
        updated[name] = { ...form[name], value: !form[name].value } 
        setForm([...updated]);
    }

    return (
        <div key={id} className="movie">
            <div>
                <h2>Manage Movie</h2>
                <div className='back-link'>
                    <Link to={'..'} relative="path">Back</Link>
                </div>
            </div>
            <div className='movie-header'>
                <div>
                    <h3>ID</h3>
                    <div>{id}</div>
                </div>
                <div>
                    <h3>Title</h3>
                    <div>{title}</div>
                </div>
                <div>
                    <h3>Status</h3>
                    <div>{new Date(starts_showing) < Date.now() ? <span style={{'color': 'green'}}>Showing</span> : <span style={{'color': 'red'}}>Coming Soon</span> }</div>
                </div>
                <div>
                    <h3>Length</h3>
                    <div>{formatMovieLength(length)}</div>
                </div>
            </div>
            <div className='user-column'>
                <div className='user-options'>
                    <div>
                        <div className='profile-pic'>
                            <img src={poster_url} alt={`picture for movie: ${title}`} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageMovie;