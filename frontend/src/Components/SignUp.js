import React, { useState } from 'react';
import { useRegisterMutation } from './redux/authApi';
import { useNavigate, NavLink } from 'react-router-dom';
import './../App.css'; // Ensure you have some basic CSS for styling

const SignUp = () => {
  const [user_name, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [mobile_no, setMobileNo] = useState('');
  const [address, setAddress] = useState('');
  const [register, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await register({ user_name, password, mobile_no, address }).unwrap();
      navigate('/login');  // Redirect to login page after successful signup
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="background-container">
      <div className="circle one"></div>
      <div className="circle two"></div>
      <div className="circle three"></div>
      <div className="sign-up-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp} className="sign-up-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={user_name}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="text"
              id="mobile"
              placeholder="Mobile Number"
              value={mobile_no}
              onChange={(e) => setMobileNo(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          {error && error.data?.detail && (
            <p className="error-message">{error.data.detail}</p>
          )}
          <button type="submit" className="sign-up-button" disabled={isLoading}>
            Sign Up
          </button>
          <p className="signin-link">
            Already have an account? <NavLink to="/login">Sign In</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
