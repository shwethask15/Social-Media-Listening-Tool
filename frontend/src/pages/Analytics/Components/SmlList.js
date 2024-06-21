import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLiveVerbatims } from '../redux/slice/slice';
import SmlShow from './Sml-Show';
import Loader from './Loader';
import '../style/smlShow.css';

const SmlList = () => {
  const dispatch = useDispatch();
  const liveVerbatims = useSelector((state) => state.analytics.liveVerbatims);
  const loading = useSelector((state) => state.analytics.loading);

  useEffect(() => {
    dispatch(fetchLiveVerbatims());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  let data = liveVerbatims;
  let count = data.length;

  return (
    <div>
      <div className='smlHeading'>
        <p>Live Trending Verbatims</p>
        <p>Count: {count}</p>
      </div>
      <div>
        {data.map((item, index) => (
          <SmlShow key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default SmlList;
