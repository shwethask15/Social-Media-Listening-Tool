import React from 'react';
import './Alerts.css';

function Alerts({ toggleModal, showViewAlerts }) {
    return (
        <div className="dropdown-overlay" onClick={toggleModal}>
            <div className="dropdown-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={toggleModal}>X</button>
                <div className="dropdown-body">
                    <p onClick={showViewAlerts}>
                        <span role="img" aria-label="eye">👁️</span> View Alerts
                    </p>
                    <p>
                        <span role="img" aria-label="pencil">✏️</span> Edit Alerts
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Alerts;
