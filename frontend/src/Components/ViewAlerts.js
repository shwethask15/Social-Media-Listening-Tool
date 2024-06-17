import React, { useState } from 'react';
import './ViewAlerts.css';

function ViewAlerts({ closeModal }) {
    const [isRecentExpanded, setIsRecentExpanded] = useState(true);
    const [isHistoricalExpanded, setIsHistoricalExpanded] = useState(false);
    const [isRecentSmlOpen, setIsRecentSmlOpen] = useState(false);
    const [isHistoricalSmlOpen, setIsHistoricalSmlOpen] = useState(false);

    const toggleTab = (tab) => {
        setIsRecentExpanded(tab === 'recent');
        setIsHistoricalExpanded(tab === 'historical');
    };

    const toggleRecentSml = () => {
        setIsRecentSmlOpen(!isRecentSmlOpen);
    };

    const toggleHistoricalSml = () => {
        setIsHistoricalSmlOpen(!isHistoricalSmlOpen);
    };

    return (
        <div className="detailed-overlay" onClick={closeModal}>
            <div className="detailed-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-detailed-btn" onClick={closeModal}>X</button>
                <div className="detailed-body">
                    <h2>All Alerts</h2>
                    <div className="tabs">
                        <button
                            className={`tab ${isRecentExpanded ? 'active' : ''}`}
                            onClick={() => toggleTab('recent')}
                        >
                            Recent Alerts
                        </button>
                        <button
                            className={`tab ${isHistoricalExpanded ? 'active' : ''}`}
                            onClick={() => toggleTab('historical')}
                        >
                            Historical Alerts
                        </button>
                    </div>

                    {/* Recent Alerts */}
                    {isRecentExpanded && (
                        <div className="alerts-list">
                            <div className="alert-item">
                                <h3 onClick={toggleRecentSml}>SML</h3>
                                <div className={`alert-details ${isRecentSmlOpen ? 'open' : ''}`}>
                                    <div className="alert-detail">Sponsorship/Donation <span className="badge">21</span></div>
                                    <div className="alert-detail">Availability <span className="badge">20</span></div>
                                    <div className="alert-detail">Advertising/Promotion <span className="badge">6</span></div>
                                    <div className="alert-detail">Health/Diet <span className="badge">22</span></div>
                                    <div className="alert-detail">PA-Variety/Variant <span className="badge">12</span></div>
                                    <div className="alert-detail">P&P-Package <span className="badge">2</span></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Historical Alerts */}
                    {isHistoricalExpanded && (
                        <div className="alerts-list">
                            <div className="alert-item">
                                <h3 onClick={toggleHistoricalSml}>SML</h3>
                                <div className={`alert-details ${isHistoricalSmlOpen ? 'open' : ''}`}>
                                    <div className="alert-detail">Sponsorship/Donation <span className="badge">21</span></div>
                                    <div className="alert-detail">Availability <span className="badge">20</span></div>
                                    <div className="alert-detail">Advertising/Promotion <span className="badge">6</span></div>
                                    <div className="alert-detail">Health/Diet <span className="badge">22</span></div>
                                    <div className="alert-detail">PA-Variety/Variant <span className="badge">12</span></div>
                                    <div className="alert-detail">P&P-Package <span className="badge">2</span></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ViewAlerts;
