import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSnapShotViewData } from '../redux/slice/slice';
import SnapshotViewMap from './SnapShotViewMap';
import TopicFilter from './TopicFilter';
import { Button, ButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import FilterMenu from './FilterMenu';
import '../style/SnapshotView.css';

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: '#220047',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  '&.Mui-selected': {
    backgroundColor: '#dab9dc',
    color: '#220047',
    boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.2)',
  },
}));

const CustomButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  '& .MuiButton-root': {
    backgroundColor: 'transparent',
    color: '#220047',
    boxShadow: 'none',
    borderColor: '#ccc',
    '&:hover': {
      backgroundColor: '#e3e3e3',
      borderColor: 'transparent'
    },
    '&.Mui-selected': {
      backgroundColor: '#dab9dc',
      color: '#220047',
      boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.2)',
    },
  },
}));

function SnapshotView() {
  const dispatch = useDispatch();
  const MapData = useSelector((state) => state.analytics.SSVMapData);
  const loading = useSelector((state) => state.analytics.loading);
  const [selectedOption, setSelectedOption] = useState('All');
  const [currentPage, setCurrentPage] = useState('map');

  useEffect(() => {
    if (currentPage === 'map') {
      handleFetchData();
    }
  }, [selectedOption, currentPage]);

  const handleFetchData = () => {
    dispatch(fetchSnapShotViewData(selectedOption.toLowerCase()));
  };

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const renderSwitchButtons = () => (
    <CustomButtonGroup className="switch-buttons">
      <CustomButton
        className={currentPage === 'map' ? 'Mui-selected' : ''}
        onClick={() => setCurrentPage('map')}
      >
        World Map
      </CustomButton>
      <CustomButton
        className={currentPage === 'topicFilter' ? 'Mui-selected' : ''}
        onClick={() => setCurrentPage('topicFilter')}
      >
        Topic Filter
      </CustomButton>
    </CustomButtonGroup>
  );

  const renderContent = () => {
    if (currentPage === 'map') {
      return (
        <SnapshotViewMap data={MapData} selectedOption={selectedOption} loading={loading} />
      );
    } else if (currentPage === 'topicFilter') {
      return <TopicFilter />;
    }
  };

  return (
    <div className="snapshot-view-container">
      <div className="snapshot-view-controls">
        {renderSwitchButtons()}
        {currentPage === 'map' && (
          <FilterMenu
            options={['All', 'Virality', 'Sentiment', 'Severity']}
            selectedOption={selectedOption}
            onOptionChange={handleOptionChange}
          />
        )}
      </div>
      <div className="snapshot-view-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default SnapshotView;
