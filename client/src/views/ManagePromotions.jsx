import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import Link for navigation
import { AuthContext } from '../App';
import { getAllPromotions } from '../utils/API'; // Import function to fetch promotions
import { checkAdmin } from '../utils/API';
import './CSS/ManagePromotions.css'; // Import CSS for ManagePromotions view
import { formatDate } from '../utils/utils';


const ManagePromotions = () => {
    const navigate = useNavigate();
    const { admin: { isAdmin } } = useContext(AuthContext);
    const [promotions, setPromotions] = useState([]);

    useEffect(() => { checkAdmin(navigate) }, [isAdmin]);

    useEffect(() => {
        // Fetch promotions when component mounts
        const fetchPromotions = async () => {
            try {
            const promotionsData = await getAllPromotions();
            setPromotions(promotionsData);
            } catch (error) {
            console.error("Error fetching promotions:", error);
            }
        };

        fetchPromotions();
    }, []);


    // Function to render each promotion item
    const renderPromotionItem = (promotion) => (
        <div key={promotion.id} className="promotion-item">
        <h3>{promotion.title}</h3>
        <p>{promotion.condition}</p>
        <p>Discount Amount: {promotion.discount_value}</p>
        <p>Validity Period: {formatDate(promotion.created_at)} until {formatDate(promotion.expiration)}</p>
        <div className="promotion-actions">
            <button className="edit-button" disabled>Edit</button>
            <button className="delete-button" disabled>Delete</button>
            <button className="view-button" disabled>View</button>
        </div>
        </div>
    );

    return (
        <div className="manage-promotions-container">
          <h2>Manage Promotions</h2>
          <div className="promotions-list">
            {
                promotions.map((promotion) => {
                    return renderPromotionItem(promotion);
                })
            }
          </div>
        </div>
    );
};

export default ManagePromotions;
