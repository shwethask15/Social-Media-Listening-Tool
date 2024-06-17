// LiveTrendingVerbatims.js
import React, { useState, useEffect } from 'react';
import LiveMapChart from './MapChart';
import SmlList from './SmlList';
import Loader from './Loader';
import '../style/smlShow.css';

function LiveTrendingVerbatims() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loader for 5 seconds on component mount
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    // Cleanup timer
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="LTV">
      {loading && <Loader />}
      <div className="title-ltv">
        <h1>Live Trending Map</h1>
      </div>
      <div className="map-container">
        <LiveMapChart />
      </div>
      <div>
        <SmlList />
      </div>
    </div>
  );
}

export default LiveTrendingVerbatims;
