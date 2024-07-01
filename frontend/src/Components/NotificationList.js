import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Badge, Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';
import './Navbar.css';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotifications, setNewNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const socket = new WebSocket('ws://127.0.0.1:8000/ws');

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'notification') {
        const newNotifs = message.data;
        setNewNotifications((prevNewNotifications) => [
          ...prevNewNotifications,
          ...newNotifs,
        ]);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = (event) => {
      console.log('WebSocket closed:', event);
    };

    // Cleanup on component unmount
    return () => {
      socket.close();
    };
  }, []);

  const handleAlertClick = () => {
    setShowModal(true);
    setNotifications((prevNotifications) => [
      ...newNotifications,
      ...prevNotifications,
    ]);
    setNewNotifications([]); // Clear new notifications count after viewing
  };

  return (
    <div>
      <IconButton className="icon-button" color="primary" onClick={handleAlertClick}>
        <Badge badgeContent={newNotifications.length} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>New Notifications</DialogTitle>
        <DialogContent>
          {notifications.map((notification, index) => (
            <div key={index} className="notification-item">
              <div className="notification-header">
                <div className="notification-date">
                  <FaCalendarAlt style={{ marginRight: '5px' }} />
                  <p>{new Date(notification.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                </div>
                <IconButton href={notification.url} target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt className="notification-link" />
                </IconButton>
              </div>
              <p className="notification-snippet">{notification.snippet}</p>
              <hr className="notification-divider" />
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setShowModal(false)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NotificationList;
