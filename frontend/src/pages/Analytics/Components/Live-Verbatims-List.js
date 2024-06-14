import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLiveVerbatims } from '../redux/slice/slice'; 

const LiveVerbatimsList = () => {
  const dispatch = useDispatch();
  const { liveVerbatims, loading, error } = useSelector((state) => state.liveVerbatims);

  useEffect(() => {
    dispatch(fetchLiveVerbatims());
  }, [dispatch]);

  return (
    <div>
      <h1>Live Verbatims</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {liveVerbatims.map((verbatim, index) => (
          <li key={index}>
            <p><strong>Source:</strong> {verbatim.source}</p>
            <p><strong>Snippet:</strong> {verbatim.snippet}</p>
            <p><strong>Country:</strong> {verbatim.country_name}</p>
            <a href={verbatim.url} target="_blank" rel="noopener noreferrer">View Post</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LiveVerbatimsList;
