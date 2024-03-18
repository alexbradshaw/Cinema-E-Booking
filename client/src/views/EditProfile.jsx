import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCard, deleteCard, getLoggedInUser, updateCard, updateUser } from '../utils/API';
import './CSS/EditProfile.css';

const EditProfile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profile_pic, setProfilePic] = useState('');
  const [promotion_enrollment, setEnrollment] = useState(false);

  const [card, setCardView] = useState(false);
  const [active, setActive] = useState(false);
  const [card_id, setId] = useState(0);
  const [card_number, setCardNumber] = useState('');
  const [last_four, setFour] = useState('');
  const [cardholder_name, setCardName] = useState('');
  const [expiry_date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [cvv, setCVV] = useState(0);
  const [address, setAddy] = useState();
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { user, card } = await getLoggedInUser();
        setUsername(user.username);
        setEmail(user.email);
        setProfilePic(user.profile_pic);
        setEnrollment(user.promotion_enrollment);

        if (card) {
          setCardView(true);
          setId(card.card_id);
          setFour(card.last_four);
          setCardName(card.cardholder_name);
          setDate(card.expiry_date);
          setCVV(card.cvv);
          setAddy(card.address);
        }
      } catch (error) {
        console.error('Error getting logged in user:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateUser({ username, promotion_enrollment, profile_pic });
      navigate('/');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCardSubmit = async (event) => {
    event.preventDefault();
    try {
      await addCard({ card_number, cardholder_name, expiry_date, cvv, address });
      setFour(card_number.trim().slice(-4));
      setCardView(true);
    } catch (error) {
      console.error('Error creating card:', error);
    }
  };

  const handleCardUpdate = async (event) => {
    event.preventDefault();
    try {
      await updateCard(address, card_id);
      setActive(true);
      setTimeout(() => {
        setActive(false);
      }, 2000)
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      await deleteCard(card_id);
      setCardName('');
      setCardNumber('');
      setAddy('');
      setCVV('');
      setDate(new Date().toISOString().split('T')[0])
      setCardView(false);
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  return (
    <div className="editProfileContainer">
      <h2>Manage Profile</h2>
      <div className='twoColumn'>
        <form onSubmit={handleSubmit} className="editProfileForm">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="inputField"
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            disabled
            className="inputField"
            required
          />

          <label htmlFor="profile_pic">Profile Pic:</label>
          <input
            type="text"
            id="profile_pic"
            value={profile_pic}
            onChange={(e) => setProfilePic(e.target.value)}
            className="inputField"
            required
          />

          <label htmlFor="promotion_enrollment">Promotion Enrollment:</label>
          <input
          type="checkbox"
          checked={promotion_enrollment}
          onChange={(e) => setEnrollment(e.target.checked)}
          required
          />

          <br />
          <button type="submit" className='save-changes'>Save Changes</button>
        </form>
        <form onSubmit={card ? handleCardUpdate : handleCardSubmit} className="editProfileForm">
          {
            card ?
            <>
              <label htmlFor="last_four">Last Four:</label>
              <input
                type="text"
                id="last_four"
                value={last_four}
                className="inputField"
                disabled
              />
            </>
            :
            <>
              <label htmlFor="card_number">Card Number</label>
              <input
                type="text"
                id="card_number"
                value={card_number}
                className="inputField"
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </>
          }

          <label htmlFor="cardholder_name">Card Holder Name:</label>
          <input
            type="text"
            id="cardholder_name"
            value={cardholder_name}
            disabled={card}
            onChange={(e) => setCardName(e.target.value)}
            className="inputField"
            required
          />

          <label htmlFor="address">Billing Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddy(e.target.value)}
            className="inputField"
            required
          />

          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id='cvv'
            value={cvv}
            className="inputField"
            onChange={(e) => setCVV(e.target.value)}
            disabled={card}
            minLength={3}
            maxLength={3}
            required
          />

          <label htmlFor="expiry_date">Expiry Date:</label>
          <input
            type="date"
            id='expiry_date'
            value={expiry_date.split('T')[0]}
            className="inputField"
            disabled={card}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
          />

          <br />
          {
            !active ?
            <button type="submit" className='save-changes'>Save Card</button>
            :
            <button disabled className='save-changes'>Saved!</button>
          }
          {
            card ? 
            <button type="button" className='back' onClick={handleDelete}>Delete Card</button> 
            :
            <></>
          }
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
