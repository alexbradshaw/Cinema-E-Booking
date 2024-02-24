import React, { useState } from 'react';
import { createNewMovie } from '../utils/API';
// import './CSS/AddMovie.css'; // Import CSS file for styling

const AddMovie = () => {
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
    seats: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNewMovie(formData);
      // Redirect to ManageMovies page after successful creation
      window.location.href = '/manage-movies';
    } catch (error) {
      console.error('Error creating new movie:', error);
      // Handle error
    }
  };

  return (
    <div className="addMovieContainer">
      <h1>Add New Movie</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />

        <label htmlFor="synopsis">Synopsis:</label>
        <textarea id="synopsis" name="synopsis" value={formData.synopsis} onChange={handleChange} required />

        <label htmlFor="rating">Rating:</label>
        <input type="text" id="rating" name="rating" value={formData.rating} onChange={handleChange} required />

        <label htmlFor="poster">Poster URL:</label>
        <input type="text" id="poster" name="poster" value={formData.poster} onChange={handleChange} required />

        <label htmlFor="trailer_url">Trailer URL:</label>
        <input type="text" id="trailer_url" name="trailer_url" value={formData.trailer_url} onChange={handleChange} required />

        <label htmlFor="category_id">Category ID:</label>
        <input type="text" id="category_id" name="category_id" value={formData.category_id} onChange={handleChange} required />

        <label htmlFor="director_id">Director ID:</label>
        <input type="text" id="director_id" name="director_id" value={formData.director_id} onChange={handleChange} required />

        <label htmlFor="producer_id">Producer ID:</label>
        <input type="text" id="producer_id" name="producer_id" value={formData.producer_id} onChange={handleChange} required />

        <label htmlFor="member_id">Member ID:</label>
        <input type="text" id="member_id" name="member_id" value={formData.member_id} onChange={handleChange} required />

        <label htmlFor="seats">Seats:</label>
        <input type="text" id="seats" name="seats" value={formData.seats} onChange={handleChange} required />

        <button type="submit" disabled>Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;
