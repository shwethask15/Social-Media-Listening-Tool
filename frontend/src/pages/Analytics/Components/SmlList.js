import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLiveVerbatimsData } from '../redux/slice/slice';
import SmlShow from './Sml-Show';
import Loader from './Loader';
import '../style/smlShow.css';

const SmlList = () => {
  const dispatch = useDispatch();
  const liveVerbatims = useSelector((state) => state.analytics.liveVerbatimsData.Live_Verbatims_List);
  const loading = useSelector((state) => state.analytics.loading);
  const error = useSelector((state) => state.analytics.error);

  useEffect(() => {
    dispatch(fetchLiveVerbatimsData());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
