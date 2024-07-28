import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/OrderConfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, totalPrice, paymentMethod } = location.state || { cartItems: [], totalPrice: 0, paymentMethod: '' };

  const getRandomDeliveryDate = () => {
    const startDate = new Date(2024, 7, 1);
    const endDate = new Date(2024, 8, 1);
    const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    return randomDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const deliveryDate = getRandomDeliveryDate();

  return (
    <div className="confirm-order-page">
      <nav className="confirm-nav-bar">
        <button className="confirm-home-button" onClick={() => navigate('/')}>
          Home
        </button>
        <button className="confirm-review-button" onClick={() => navigate('/review')}>
          Review
        </button>
        <button className="confirm-continue-shopping-button" onClick={() => navigate('/')}>
          Continue Shopping
        </button>
      </nav>
      <div className="confirm-order-box">
        <h2>Order Confirmation</h2>
        <div className="confirm-product-cards">
          {cartItems.map((product) => (
            <div className="confirm-product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <div className="confirm-product-details">
                <h3>{product.name}</h3>
                <p>Price: ₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="confirm-delivery-details">
          <h3>Delivery Details</h3>
          <p>Total Price: ₹{totalPrice}</p>
          <p>Payment Method: {paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}</p>
        </div>
        <div className="confirm-delivery-date">
          <p>Estimated Delivery Date: {deliveryDate}</p>
        </div>
        <button className="confirm-track-button">Track Order</button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
