import LiveMapChart from './MapChart'
import SmlList from './SmlList';
import React from 'react';
import '../style/smlShow.css'; 

function LiveTrendingVerbatims() {
    return (
        <div className="LTV">
            <h1>Live Trending Verbatims</h1>
            <div className="map-container">
                <LiveMapChart />
            </div>
            <SmlList />
        </div>
    );
}

export default LiveTrendingVerbatims;
