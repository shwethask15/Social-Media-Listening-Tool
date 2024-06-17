import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMapData,fetchAll} from '../redux/slice/slice'
import SnapshotViewMap from './SnapShotViewMap';
// import MapComponent from './MapComponent'; 

function SnapshotView(){
    const dispatch = useDispatch();
    const radioButtonData = useSelector((state) => state.analytics.radioButtonData);
    const [selectedOption, setSelectedOption] = useState('All');
  
    useEffect(() => {
      if (selectedOption === 'All') {
        dispatch(fetchAll());
      } else {
        dispatch(fetchMapData(selectedOption.toLowerCase()));
      }
    }, [dispatch, selectedOption]);
  
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };
  
    return (
      <div>
        <div className="radio-buttons">
          <label>
            <input
              type="radio"
              value="All"
              checked={selectedOption === 'All'}
              onChange={handleOptionChange}
            />
            All
          </label>
          <label>
            <input
              type="radio"
              value="Virality"
              checked={selectedOption === 'Virality'}
              onChange={handleOptionChange}
            />
            Virality
          </label>
          <label>
            <input
              type="radio"
              value="Sentiment"
              checked={selectedOption === 'Sentiment'}
              onChange={handleOptionChange}
            />
            Sentiment
          </label>
          <label>
            <input
              type="radio"
              value="Severity"
              checked={selectedOption === 'Severity'}
              onChange={handleOptionChange}
            />
            Severity
          </label>
        </div>
        <div>
            {/* {console.log(radioButtonData)} */}
            <SnapshotViewMap />
          {/* {loading ? <p>Loading...</p> : error ? <p>{error}</p> : <MapComponent data={radioButtonData} />} */}
        </div>
      </div>
)}
export default SnapshotView;

