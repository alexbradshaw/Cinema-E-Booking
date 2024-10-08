import React, { useContext, useEffect, useState } from 'react';
import { checkAdmin, createMovie } from '../utils/API';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';
import './CSS/AddMovie.css';

const AddMovie = () => {
  const navigate = useNavigate();
  const { admin: { isAdmin } } = useContext(AuthContext);

  useEffect(() => { checkAdmin(navigate) }, [isAdmin]);

  const [formData, setFormData] = useState({
    title: '',
    synopsis: '',
    rating: '',
    poster: '',
    trailer_url: '',
    category_id: '',
    director_id: '',
    producer_id: '',
    member_id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMovie(formData);
      // Redirect to ManageMovies page after successful creation
      window.location.href = '/manage-movies';
    } catch (error) {
      console.error('Error creating new movie:', error);
      // Handle error
    }
  };

  return (
    <div className="addMovieContainer">
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit} className='addMovieForm'>
        <label htmlFor="title">Title:</label>
        <input class="changes" type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />

        <label htmlFor="synopsis">Synopsis:</label>
        <textarea id="synopsis" name="synopsis" value={formData.synopsis} onChange={handleChange} required />

        <label htmlFor="rating">Rating:</label>
        <input class="changes" type="text" id="rating" name="rating" value={formData.rating} onChange={handleChange} required />

        <label htmlFor="poster">Poster URL:</label>
        <input class="changes" type="text" id="poster" name="poster" value={formData.poster} onChange={handleChange} required />

        <label htmlFor="trailer_url">Trailer URL:</label>
        <input class="changes" type="text" id="trailer_url" name="trailer_url" value={formData.trailer_url} onChange={handleChange} required />

        <label htmlFor="category_id">Category ID:</label>
        <input class="changes" type="text" id="category_id" name="category_id" value={formData.category_id} onChange={handleChange} required />

        <label htmlFor="director_id">Director ID:</label>
        <input class="changes" type="text" id="director_id" name="director_id" value={formData.director_id} onChange={handleChange} required />

        <label htmlFor="producer_id">Producer ID:</label>
        <input class="changes" type="text" id="producer_id" name="producer_id" value={formData.producer_id} onChange={handleChange} required />

        <label htmlFor="member_id">Member ID:</label>
        <input class="changes" type="text" id="member_id" name="member_id" value={formData.member_id} onChange={handleChange} required />

        <label htmlFor="seats">Seats:</label>
        <input class="changes" type="text" id="seats" name="seats" value={formData.seats} onChange={handleChange} required />

        <div className="buttonContainer">
          <a href="/admin/movies" className="cancelBtn">Cancel</a>
          <button type="submit" className='addMovieBtn' disabled>Add Movie</button>
        </div>
      </form>
    </div>
  );
};

export default AddMovie;
