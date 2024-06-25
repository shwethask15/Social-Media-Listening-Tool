import React, { useState } from 'react';
import LiveMapChart from './LiveMapChart';
import SmlList from './SmlList';
import Loader from './Loader';
import '../style/smlShow.css';

function LiveTrendingVerbatims() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="LTV">
      {loading && <Loader />}
      {/* <div className="title-ltv">
        <h1>Live Trending Map</h1>
      </div> */}
      <div className="content-container">
        <div className="map-container">
          <LiveMapChart setLoading={setLoading} />
          <div>
          <p className='MapLabel'> * Live Trending Verbatims shows the recent records</p>
          </div>
        </div>
       
        <div className="comments-container">
          <SmlList />
        </div>
      </div>
    </div>
  );
}

export default LiveTrendingVerbatims;
