import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBell, FaQuestionCircle } from 'react-icons/fa';
import './Navbar.css';
import Alerts from './Alerts';
import ViewAlerts from './ViewAlerts';
import { useDispatch } from 'react-redux';
import { logoutSuccess } from './redux/authSlice';

function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showViewAlertsModal, setShowViewAlertsModal] = useState(false);
    const [notificationCount, setNotificationCount] = useState(2);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleDropdown = (e) => {
        e.stopPropagation(); // Prevent click event from propagating
        setShowDropdown(!showDropdown);
    };

    const showViewAlerts = () => {
        setShowDropdown(false); // Close the dropdown
        setShowViewAlertsModal(true); // Open the view alerts modal
    };

    const closeViewAlertsModal = () => {
        setShowViewAlertsModal(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Remove the token from localStorage
        dispatch(logoutSuccess()); // Update the state to reflect logout
        navigate('/login'); // Redirect to the login page
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
                <div className="icon-container" onClick={toggleDropdown}>
                    <FaBell className="icon" />
                    {notificationCount > 0 && (
                        <span className="notification-badge">{notificationCount}</span>
                    )}
                    {showDropdown && <Alerts toggleModal={toggleDropdown} showViewAlerts={showViewAlerts} />}
                </div>
                <FaQuestionCircle className="icon" />
                <button onClick={handleLogout}>Logout</button>
            </div>
            {showViewAlertsModal && <ViewAlerts closeModal={closeViewAlertsModal} />}
        </div>
    );
}

export default Navbar;
