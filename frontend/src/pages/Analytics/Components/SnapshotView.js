import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSnapShotViewData } from '../redux/slice/slice';
import SnapshotViewMap from './SnapShotViewMap';
import BasicButtonGroup from './ButtonGroup';
import TopicFilter from './TopicFilter';
import { Button, ButtonGroup } from '@mui/material'; // Import Material-UI components
import '../style/SnapshotView.css'; // Import the CSS file

function SnapshotView() {
  const dispatch = useDispatch();
  const MapData = useSelector((state) => state.analytics.SSVMapData);
  const [selectedOption, setSelectedOption] = useState('All');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('map');

  useEffect(() => {
    if (currentPage === 'map') {
      handleFetchData();
    }
  }, [selectedOption, currentPage]);

  const handleFetchData = () => {
    setLoading(true);
    dispatch(fetchSnapShotViewData(selectedOption.toLowerCase())).finally(() => setLoading(false));
  };

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const renderButtons = () => (
    <ButtonGroup className="snapshot-view-buttons">
      {['All', 'Virality', 'Sentiment', 'Severity'].map(option => (
        <Button
          key={option}
          className={selectedOption === option ? 'active' : ''}
          onClick={() => handleOptionChange(option)}
          variant="outlined"
        >
          {option}
        </Button>
      ))}
    </ButtonGroup>
  );

  const renderMap = () => {
    return <SnapshotViewMap data={MapData} selectedOption={selectedOption} loading={loading} />;
  };

  const renderContent = () => {
    if (currentPage === 'map') {
      return (
        <>
          {renderButtons()}
          {renderMap()}
        </>
      );
    } else if (currentPage === 'topicFilter') {
      return <TopicFilter />;
    }
  };

  return (
    <div>
      <BasicButtonGroup setCurrentPage={setCurrentPage} />
      {renderContent()}
    </div>
  );
}

export default SnapshotView;
