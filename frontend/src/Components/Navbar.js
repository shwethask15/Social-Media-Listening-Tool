import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useLogoutMutation } from './redux/authApi';
import NotificationList from './NotificationList'

function Navbar() {
  const [logout] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      await logout().unwrap();
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
        <li><NavLink to="/analytics" className="nav-link">ANALYTICS</NavLink></li>
        <li><NavLink to="/verbatims" className="nav-link">VERBATIMS</NavLink></li>
      </ul>
      <div className="navbar-icons">
        <NotificationList />
        <button onClick={handleLogout} className='logout-button'>
          <i className="fa fa-sign-out"></i>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
