import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import Link for navigation
import { AuthContext } from '../App';
// import { getAllPromotions } from '../utils/API'; // Import function to fetch promotions
import { checkAdmin } from '../utils/API';
import './CSS/ManagePromotions.css'; // Import CSS for ManagePromotions view


const ManagePromotions = () => {
    const navigate = useNavigate();
    const { admin: { isAdmin } } = useContext(AuthContext);

    useEffect(() => { checkAdmin(navigate) }, [isAdmin]);

    //   const [promotions, setPromotions] = useState([]);

    //   useEffect(() => {
    //     // Fetch promotions when component mounts
    //     const fetchPromotions = async () => {
    //       try {
    //         const promotionsData = await getAllPromotions();
    //         setPromotions(promotionsData);
    //       } catch (error) {
    //         console.error("Error fetching promotions:", error);
    //       }
    //     };

    //     fetchPromotions();
    //   }, []);

    // Function to render each promotion item
    const renderPromotionItem = (promotion) => (
        <div key={promotion.id} className="promotion-item">
        <h3>{promotion.title}</h3>
        <p>{promotion.description}</p>
        <p>Discount Amount: {promotion.discountAmount}</p>
        <p>Validity Period: {promotion.validityPeriod}</p>
        <div className="promotion-actions">
            <button className="edit-button" disabled>Edit</button>
            <button className="delete-button" disabled>Delete</button>
            <button className="view-button" disabled>View</button>
        </div>
        </div>
    );

    // Create a default promotion for demonstration
    const defaultPromotion = {
        id: 1,
        title: "Default Promotion",
        description: "This is a default promotion for demonstration purposes.",
        discountAmount: "20%",
        validityPeriod: "3/1/2024 to 3/15/2024",
    };

    return (
        <div className="manage-promotions-container">
          <h2>Manage Promotions</h2>
          <div className="promotions-list">
            {renderPromotionItem(defaultPromotion)}
          </div>
        </div>
    );
};

export default ManagePromotions;