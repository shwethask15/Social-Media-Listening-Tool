import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useDispatch } from 'react-redux';
import { useLogoutMutation } from './redux/authApi';
import { logoutSuccess } from './redux/authSlice';
import NotificationList from './NotificationList';

function Navbar() {
    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const handleLogout = async () => {
        try {
          await logout().unwrap();
          localStorage.removeItem('authToken'); // Remove the token from localStorage
          dispatch(logoutSuccess()); // Update the state to reflect logout
          navigate('/login'); // Redirect to the login page
        } catch (error) {
          console.error('Failed to log out:', error);
        }
      };

    return (
        <div className="navbar">
            <div className="navbar-brand">
                <h3>SOCIAL MEDIA LISTENING TOOL</h3>
            </div>
            <ul className="navbar-menu">
                <li><NavLink to="/page1" className="nav-link">Analytics</NavLink></li>
                <li><NavLink to="/page2" className="nav-link">Verbatims</NavLink></li>
            </ul>
            <div className="navbar-icons">

                <NotificationList />
                <button onClick={handleLogout}>Logout</button>
            </div>
            
        </div>
    );
}

export default Navbar;
