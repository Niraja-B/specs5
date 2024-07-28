import React, { useState } from 'react';
import axios from 'axios';

import '../styles/Modal.css'; // Import CSS for modal styling

const LoginForm = ({ closeModal, openSignUp, onLogin }) => {
  const [emailAddress, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission

    try {
      const response = await axios.get('http://localhost:8000/getuser');
      const users = response.data;
      const user = users.find(user => user.emailAddress === emailAddress);

      if (user && user.password === password) {
        alert('Successfully logged in!');
        onLogin(user); // Pass user data to parent component
        closeModal(); // Optionally close the modal after logging in
      } else {
        alert('Incorrect email or password.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      alert('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={emailAddress}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <button onClick={openSignUp}>Sign Up</button></p>
      </div>
    </div>
  );
};

export default LoginForm;