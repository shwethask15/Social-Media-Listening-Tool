import React from 'react';
import { useSelector } from 'react-redux';
import SmlShow from './SmlShow';
import Loader from './Loader';
import '../style/Analytics.css';

const SmlList = () => {
  const liveVerbatims = useSelector((state) => state.analytics.liveVerbatimsData.Live_Verbatims_List);
  
  if (!liveVerbatims || liveVerbatims.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <div className='smlHeading'>
        <p>Live Trending Verbatims</p>
        <p>Count: {liveVerbatims.length}</p>
      </div>
      <div>
        {liveVerbatims.map((item, index) => (
          <SmlShow key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default SmlList;
