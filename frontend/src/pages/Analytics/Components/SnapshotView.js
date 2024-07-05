import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSnapShotViewData } from '../redux/slice/slice';
import SnapshotViewMap from './SnapShotViewMap';
import TopicFilter from './TopicFilter';
import { Button, Menu, MenuItem, ButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import '../style/SnapshotView.css';

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: '#220047',
  boxShadow:'none',
  '&:hover': {
    backgroundColor: '#e3e3e3',
  },
  '&.Mui-selected': {
    backgroundColor: '#e3cffd',
    color: '#220047',
    boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.2)',
  },
}));

const CustomButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  '& .MuiButton-root': {
    backgroundColor: 'transparent',
    color: '#220047',
    boxShadow:'none',
  
    borderColor: '#ccc',
    '&:hover': {
      backgroundColor: '#e3e3e3',
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
  const [selectedOption, setSelectedOption] = useState('All');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('map');
  const [anchorEl, setAnchorEl] = useState(null);

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
    setAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderFilterButton = () => (
    <CustomButton
      onClick={handleMenuOpen}
      variant="contained"
      className="filter-button"
    >
      <i className="fa fa-filter" aria-hidden="true"></i> Filter
    </CustomButton>
  );

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
        <>
          <SnapshotViewMap data={MapData} selectedOption={selectedOption} loading={loading} />
        </>
      );
    } else if (currentPage === 'topicFilter') {
      return <TopicFilter />;
    }
  };

  return (
    <div>
      <div className="snapshot-view-controls">
        
        {renderSwitchButtons()}
        {currentPage === 'map' && renderFilterButton()}
      </div>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {['All', 'Virality', 'Sentiment', 'Severity'].map((option) => (
          <MenuItem
            key={option}
            selected={selectedOption === option}
            onClick={() => handleOptionChange(option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      {renderContent()}
    </div>
  );
}

export default SnapshotView;
