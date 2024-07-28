import React, { useContext, useState } from 'react';
import { StoreContext } from '../contexts/StoreContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';

const Cart = () => {
  const { cart, removeFromCart } = useContext(StoreContext);
  const [powerLevels, setPowerLevels] = useState(cart.map(() => ({ left: 0, right: 0 })));
  const [quantities, setQuantities] = useState(cart.map(() => 1));
  const navigate = useNavigate();

  const handlePowerChange = (index, eye, increment) => {
    setPowerLevels((prevLevels) => {
      const newLevels = [...prevLevels];
      newLevels[index] = {
        ...newLevels[index],
        [eye]: Math.max(newLevels[index][eye] + increment, 0),
      };
      return newLevels;
    });
  };

  const handleQuantityChange = (index, value) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = value;
      return newQuantities;
    });
  };

  const handleBuyNow = () => {
    navigate('/buynow', { state: { cart, quantities } });
  };

  const totalPrice = cart.reduce((sum, product, index) => sum + product.price * quantities[index], 0);

  return (
    <div className="cart-page">
      <nav className="nav-bar">
        <button className="home-button" onClick={() => navigate('/')}>
          Home
        </button>
      </nav>
      <h2 className="cart-title">My Cart</h2>
      <div className="cart-grid">
        {cart.map((product, index) => (
          <div className="product-card2" key={product.id}>
            <img src={product.image} alt={product.name} />
            <div className="product-details">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Size: {product.size}</p>
              <p>Color: {product.color}</p>
              <p>Shape: {product.shape}</p>
              <p>₹{product.price}</p>
              <div className="power-controls-container">
                <div className="power-control">
                  <button
                    className="decrement"
                    onClick={() => handlePowerChange(index, 'left', -1)}
                    disabled={powerLevels[index].left <= 0}
                  >
                    -
                  </button>
                  <span>Left Eye: {powerLevels[index].left}</span>
                  <button
                    className="increment"
                    onClick={() => handlePowerChange(index, 'left', 1)}
                  >
                    +
                  </button>
                </div>
                <div className="power-control">
                  <button
                    className="decrement"
                    onClick={() => handlePowerChange(index, 'right', -1)}
                    disabled={powerLevels[index].right <= 0}
                  >
                    -
                  </button>
                  <span>Right Eye: {powerLevels[index].right}</span>
                  <button
                    className="increment"
                    onClick={() => handlePowerChange(index, 'right', 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="quantity-select">
                <label htmlFor={`quantity-${index}`}><b>Quantity:</b></label>
                <select
                  id={`quantity-${index}`}
                  value={quantities[index]}
                  onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <div className="product-buttons">
                <button className="remove-button" onClick={() => removeFromCart(product.id)}>
                  Remove
                </button>
                <button
                  className="buy-now-button"
                  onClick={() => navigate('/buynow', { state: { cart: [product], quantities: [quantities[index]] } })}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="total-price">
        <h3>Total Amount: ₹{totalPrice}</h3>
        <button className="buy-now-button" onClick={handleBuyNow}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
