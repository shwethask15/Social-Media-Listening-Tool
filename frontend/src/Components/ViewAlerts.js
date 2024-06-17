import React from 'react';
import './ViewAlerts.css';

function ViewAlerts({ closeModal }) {
    return (
        <div className="detailed-overlay" onClick={closeModal}>
            <div className="detailed-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-detailed-btn" onClick={closeModal}>X</button>
                <div className="detailed-body">
                    <h2>All Alerts</h2>
                    <div className="tabs">
                        <button className="tab active">Recent Alerts</button>
                        <button className="tab">Historical Alerts</button>
                    </div>
                    <div className="alerts-list">
                        <div className="alert-item">SML</div>
                        <div className="alert-item">Reviews and Ratings</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewAlerts;
