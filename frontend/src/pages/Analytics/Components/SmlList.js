import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLiveVerbatims } from '../redux/slice/slice';
import SmlShow from './Sml-Show';

const SmlList = () => {
  const dispatch = useDispatch();
  const  liveVerbatims  = useSelector((state) => state.analytics.liveVerbatims);

  useEffect(() => {
    dispatch(fetchLiveVerbatims());
  }, [dispatch]);

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
