import { addCard, deleteCard, getLoggedInUser, updateCard, updateUser } from '../utils/API';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import './CSS/EditProfile.css';
import { formatPrice, formatTime } from '../utils/utils';

const EditProfile = () => {
  const { isPending, data, isError, error } = useQuery({ queryKey: ['users'], queryFn: getLoggedInUser })

  if (isError) {
    console.error('Error getting logged in user:', error);
  }

  const ProfileBody = (props) => {
    const { data: { user: { username: name, fname, lname, email, profile_pic: pic, promotion_enrollment: enrolled, transactions }, card: cardInfo } } = props
      
    const [username, setUsername] = useState(name);
    const [profile_pic, setProfilePic] = useState(pic);
    const [firstName, setFname] = useState(fname);
    const [lastName, setLname] = useState(lname);
    const [promotion_enrollment, setEnrollment] = useState(enrolled);

    const [status, setStatus] = useState({ profile: false, card: false });
  
    const [card, setCardView] = useState(cardInfo ? true : false);
  
    const [card_id, setId] = useState(cardInfo ? cardInfo.card_id : 0);
    const [card_number, setCardNumber] = useState('');
    const [last_four, setFour] = useState(cardInfo ? cardInfo.last_four : '');
    const [cardholder_name, setCardName] = useState(cardInfo ? cardInfo.cardholder_name : fname + lname);
    const [expiry_date, setDate] = useState(cardInfo ? cardInfo.expiry_date : new Date().toISOString().split('T')[0]);
    const [cvv, setCVV] = useState(cardInfo ? cardInfo.cvv : 0);
    const [address, setAddy] = useState(cardInfo ? cardInfo.address : '');

    const updateUserProfile = useMutation({ 
      mutationFn: updateUser,
      onMutate: () => {
        setStatus({...status, profile: true});
        setTimeout(() => {
          setStatus({...status, profile: false});
        }, 2000)
      },
      onError: async (error) => {
        console.error('Error updating profile:', error);
      }
    })

    const submitCard = useMutation({ 
      mutationFn: addCard,
      onMutate: () => {
        setStatus({...status, card: true});
        setTimeout(() => {
          setStatus({...status, card: false});
        }, 2000)
      },
      onSuccess: async (data) => {
        setId(data.card_id);
        setFour(card_number.trim().slice(-4));
        setCardView(true);
      },
      onError: async (error) => {
        console.error('Error creating card:', error);
      }
    })
  
    const updateProfileCard = useMutation({ 
      mutationFn: updateCard,
      onMutate: () => {
        setStatus({...status, card: true});
        setTimeout(() => {
          setStatus({...status, card: false});
        }, 2000)
      },
      onError: async (error) => {
        console.error('Error updating card:', error);
      }
    })
  
    const deleteProfileCard = useMutation({ 
      mutationFn: deleteCard,
      onMutate: () => {
        setCardView(false);
        return { card_number, cardholder_name, expiry_date, cvv, address }
      },
      onSuccess: async () => {
        setCardName('');
        setCardNumber('');
        setAddy('');
        setCVV('');
        setDate(new Date().toISOString().split('T')[0]);
      },
      onError: async (error, context) => {
        const { card_number, cardholder_name, expiry_date, cvv, address } = context

        setCardName(cardholder_name);
        setCardNumber(card_number);
        setAddy(address);
        setCVV(cvv);
        setDate(expiry_date);
        setCardView(true);

        console.error('Error deleting card:', error);
      }
    })
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      updateUserProfile.mutate({ username, promotion_enrollment, profile_pic, fname: firstName, lname: lastName });
    };
  
    const handleCardSubmit = async (event) => {
      event.preventDefault();
      submitCard.mutate({ card_number, cardholder_name, expiry_date, cvv, address });
    };
  
    const handleCardUpdate = async (event) => {
      event.preventDefault();
      updateProfileCard.mutate({ address, card_id });
    };
  
    const handleDelete = async (event) => {
      event.preventDefault();
      deleteProfileCard.mutate(card_id);
    };

    return (
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

          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFname(e.target.value)}
            className="inputField"
            required
          />

          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLname(e.target.value)}
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
          />

          <br />
          <button type="submit" className='save-changes'>{status.profile ? "Saved!" : "Save Changes"}</button>
        </form>

        <div>
          <label htmlFor="transactions">Transactions:</label>
          <div className="transactionsTab"> 
            {transactions.map((transaction, index) => (
              <div key={index} className="transactionItem">
                <div className='transactionsHeader'>
                  <p>{new Date(transaction.date).toLocaleDateString()}</p>
                  <p>Total: ${transaction.total}</p>
                </div>
                {
                  transaction.promotion
                        ?
                        <h5 className='promotionHeader'>
                          {'$' + formatPrice(transaction.promotion.discount_value) +  ' off promotion Applied!'}
                        </h5>
                        :
                        <></>
                }
                <ul>
                  {transaction.tickets.map((ticket, ticketIndex) => {
                    const { seat: { row, number, showing: { time, theatre: { id: theatreId }, movie: { title }}}, ticketType: { name, price }} = ticket;
                    return (
                      <div className='ticket'>
                        <li key={ticketIndex}><h5>{title} at {formatTime(time)}</h5></li>
                        <div>
                          <h5>Theater: {theatreId}</h5><h5>Seat: {row + number}</h5><h5>{name} (${price})</h5>
                        </div>
                      </div>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

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
            !status.card ?
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
    );
  }

  return (
    <div className="editProfileContainer">
      <h2>Manage Profile</h2>
      {
        isPending || data.user == undefined
          ?
            <>
              <h1>Loading...</h1>
            </>
            :
            <ProfileBody data={data} />
      }
    </div>
  );
};

export default EditProfile;
