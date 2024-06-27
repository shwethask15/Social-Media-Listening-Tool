import React, { useState } from 'react';
import { useLoginMutation } from './redux/authApi';
import { useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { loginSuccess } from './redux/authSlice';
import './../App.css'; // Ensure you have some basic CSS for styling

const SignIn = () => {
  const [user_name, setUser_name] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ user_name, password }).unwrap();
      localStorage.setItem('authToken', data.access_token); // Store token in localStorage
      dispatch(loginSuccess({ token: data.access_token, user: user_name }));
      navigate('/page1');  // Redirect to a protected route
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn} className="sign-in-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={user_name}
            onChange={(e) => setUser_name(e.target.value)}
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
        {error && <p className="error-message">{error.data?.message || 'Login failed'}</p>}
        <button type="submit" className="sign-in-button" disabled={isLoading}>Sign In</button>
        <p className="signup-link">
          New user? <NavLink to="/signup">Sign Up</NavLink>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
