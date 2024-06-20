import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMapData, fetchAll } from '../redux/slice/slice';
import SnapshotViewMap from './SnapShotViewMap'; // Assuming this is your generic map component
import SnapshotViewMapAll from './SnapShotViewMapAll';

function SnapshotView() {
  const dispatch = useDispatch();
  const radioButtonData = useSelector((state) => state.analytics.radioButtonData);
  const [selectedOption, setSelectedOption] = useState('All');
  const [loading, setLoading] = useState(false); // State to track loading

  useEffect(() => {
    handleFetchData();
  }, [selectedOption]);

  const handleFetchData = () => {
    setLoading(true); // Set loading to true when fetching data
    if (selectedOption === 'All') {
      dispatch(fetchAll()).finally(() => setLoading(false)); // Set loading to false when fetch is complete
    } else {
      dispatch(fetchMapData(selectedOption.toLowerCase())).finally(() => setLoading(false)); // Set loading to false when fetch is complete
    }
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

  const renderContent = () => {
    if (selectedOption === 'All') {
      return <SnapshotViewMapAll data={radioButtonData} selectedOption={selectedOption} loading={loading} />   
    } 
    else {
      return <SnapshotViewMap data={radioButtonData} selectedOption={selectedOption} loading={loading} />;
    }
  };

  return (
    <div>
      {renderRadioButtons()}
      {renderContent()}
    </div>
  );
}

export default SnapshotView;
