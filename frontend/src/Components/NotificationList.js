import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton } from '@mui/material';
import { FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';
import '../../src/App.css'

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
      <Button variant="contained" color="primary" onClick={handleAlertClick}>
        Notifications ({newNotifications.length})
      </Button>

      <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>New Notifications</DialogTitle>
        <DialogContent>
          {notifications.map((notification, index) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FaCalendarAlt style={{ marginRight: '5px', color: '#0056b3' }} />
                  <p style={{ margin: 0, color: '#0056b3' }}>{new Date(notification.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                </div>
                <IconButton href={notification.url} target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt style={{ color: '#0056b3' }} />
                </IconButton>
              </div>
              <p style={{ margin: '5px 0' }}>{notification.snippet}</p>
              <hr style={{ border: '0.5px solid #0056b3' }} />
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
