import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LiveMapChart from './LiveMapChart';
import SmlList from './SmlList';
import Loader from './Loader';
import { fetchLiveVerbatimsData } from '../redux/slice/slice';
import '../style/Analytics.css';

function LiveTrendingVerbatims() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.analytics.loading);
  const error = useSelector((state) => state.analytics.error);

  useEffect(() => {
    dispatch(fetchLiveVerbatimsData());
  }, []);

  return (
    <div>
      {loading && <Loader />}
      {error && <div>Error: {JSON.stringify(error)}</div>}
      {!loading && !error && (
        <div className="content-container">
          <div className="map-container">
            <LiveMapChart />
            <p className='MapLabel'>* Live trending verbatims map</p>
          </div>
          <div className="comments-container">
            <SmlList />
          </div>
        </div>
      )}
    </div>
  );
}

export default LiveTrendingVerbatims;
