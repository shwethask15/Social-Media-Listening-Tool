import React, { useState } from 'react';
import LiveMapChart from './LiveMapChart';
import SmlList from './SmlList';
import Loader from './Loader';
import '../style/smlShow.css';

function LiveTrendingVerbatims() {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      {loading && <Loader />}
      <div className="content-container">
        <div className="map-container">
          <LiveMapChart setLoading={setLoading} />
          <p className='MapLabel'> * Live Trending Verbatims shows the recent records</p>
        </div>

        <div className="comments-container">
          <SmlList />
        </div>
      </div>
    </div>
  );
}

export default LiveTrendingVerbatims;
