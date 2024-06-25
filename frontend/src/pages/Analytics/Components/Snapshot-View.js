import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSnapShotViewData } from '../redux/slice/slice';
import SnapshotViewMap from './SnapShotViewMap'; 


function SnapshotView() {
  const dispatch = useDispatch();
  const MapData = useSelector((state) => state.analytics.SSVMapData);
  const [selectedOption, setSelectedOption] = useState('All');
  const [loading, setLoading] = useState(false); // State to track loading

  useEffect(() => {
    handleFetchData();
  }, [selectedOption]);

  const handleFetchData = () => {
      setLoading(true); 
      dispatch(fetchSnapShotViewData(selectedOption.toLowerCase())).finally(() => setLoading(false)); 
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const renderRadioButtons = () => (
    <div className="radio-buttons">
      {['All', 'Virality', 'Sentiment', 'Severity'].map(option => (
        <label key={option}>
          <input
            type="radio"
            value={option}
            checked={selectedOption === option}
            onChange={handleOptionChange}
          />
          {option}
        </label>
      ))}
    </div>
  );

  const renderMap = () => {
      return <SnapshotViewMap data={MapData} selectedOption={selectedOption} loading={loading} />;
  };

  return (
    <div>
      {renderRadioButtons()}
      {renderMap()}
    </div>
  );
}

export default SnapshotView;
