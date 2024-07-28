import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/BuyNow.css';

const BuyNow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, quantities } = location.state || { cart: [], quantities: [] };

  const [cartItems, setCartItems] = useState(cart);
  const [quantitiesState, setQuantitiesState] = useState(quantities);
  const [address, setAddress] = useState({
    name: '',  // Added name field
    phone: '',
    area: '',
    city: '',
    country: '',
    pincode: '',
  });

  const totalPrice = cartItems.reduce(
    (sum, product, index) => sum + product.price * quantitiesState[index],
    0
  );

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const removeProduct = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    const updatedQuantities = quantitiesState.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
    setQuantitiesState(updatedQuantities);
  };

  return (
    <div className="buy-now-page">
      <nav className="nav-bar">
        <button className="home-button" onClick={() => navigate('/')}>
          Home
        </button>
      </nav>
      <h2>Buy Now</h2>
      {cartItems.length > 0 ? (
        <div className="order-summary">
          <div className="product-summary">
            {cartItems.map((product, index) => (
              <div className="product-card" key={product.id}>
                <img src={product.image} alt={product.name} />
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p>Price: ₹{product.price}</p>
                  <p>Quantity: {quantitiesState[index]}</p>
                  <p>Total: ₹{product.price * quantitiesState[index]}</p>
                </div>
                <button className="remove-button" onClick={() => removeProduct(index)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="address-form">
            <h3>Delivery Address</h3>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={address.name}
              onChange={handleAddressChange}
              className="address-input"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={address.phone}
              onChange={handleAddressChange}
              className="address-input"
            />
            <input
              type="text"
              name="area"
              placeholder="Area"
              value={address.area}
              onChange={handleAddressChange}
              className="address-input"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={address.city}
              onChange={handleAddressChange}
              className="address-input"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={address.country}
              onChange={handleAddressChange}
              className="address-input"
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={address.pincode}
              onChange={handleAddressChange}
              className="address-input"
            />
            <button
              className="proceed-button"
              onClick={() => navigate('/placeorder', { state: { cartItems, totalPrice } })}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default BuyNow;
