import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrendAnalysisData } from '../redux/slice/slice';
import LineCharts from './LineCharts';
import { Button, Menu, MenuItem, MenuList } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import '../style/TrendAnalysis.css';

const TrendAnalysis = () => {
  const [selectedOption, setSelectedOption] = useState('verbatims');
  const [selectedMonth, setSelectedMonth] = useState('may');
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);
  const [submenuType, setSubmenuType] = useState(null);
  const dispatch = useDispatch();
  const trendAnalysisData = useSelector((state) => state.analytics.trendAnalysisData);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchTrendAnalysisData(getQueryParam(selectedOption))).finally(() => setLoading(false));
  }, [dispatch, selectedOption]);

  const handleOptionChange = (value) => {
    setSelectedOption(value);
    closeMenus();
    const queryParam = getQueryParam(value);
    if (queryParam) {
      setLoading(true);
      dispatch(fetchTrendAnalysisData(queryParam)).finally(() => setLoading(false));
    }
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    closeMenus();
  };

  const getQueryParam = (option) => {
    switch (option) {
      case 'verbatims':
        return 'verbatim_count';
      case 'severity':
        return 'severity_count';
      case 'virality':
        return 'virality_count';
      case 'sentiment':
        return 'sentiment_count';
      default:
        return '';
    }
  };

  const getHeading = () => {
    switch (selectedOption) {
      case 'verbatims':
        return 'Verbatims by Date';
      case 'severity':
        return 'Verbatims across Severity';
      case 'virality':
        return 'Verbatims across Virality';
      case 'sentiment':
        return 'Verbatims across Sentiment';
      default:
        return '';
    }
  };

  const formatData = (data) => {
    return data.map(item => {
      const [year, month, day] = item.date.split('-');
      return {
        ...item,
        date: new Date(`20${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`)
      };
    });
  };

  const filteredData = React.useMemo(() => {
    if (trendAnalysisData[selectedMonth]) {
      return formatData(trendAnalysisData[selectedMonth]);
    }
    return [];
  }, [selectedMonth, trendAnalysisData]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    closeSubmenu();
  };

  const handleClose = () => {
    closeMenus();
  };

const handleSubmenuOpen = (event, type) => {
  // Check if the submenu type is changing
  if (submenuType !== type) {
    closeSubmenu(); // Close the currently open submenu first
  }
  setSubmenuType(type);
  setSubmenuAnchorEl(event.currentTarget);
}
  
  const closeSubmenu = () => {
    setSubmenuAnchorEl(null);
    setSubmenuType(null);
  };

  const closeMenus = () => {
    setAnchorEl(null);
    closeSubmenu();
  };

  return (
    <div className="trend-analysis-container">
      <div className="trend-analysis-controls">
        <Button onClick={handleClick} variant="contained" className="filter-icon-button" style={{ backgroundColor: 'transparent', color: '#220047', boxShadow: 'none', fontSize: '16px', textTransform: 'none' }}>
          <i className="fa fa-filter" aria-hidden="true"></i> Filter
        </Button>
        <h2 className="trend-analysis-heading">{getHeading()}</h2>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          className="filter-dropdown"
        >
          <MenuList>
            <MenuItem
              onClick={(event) => handleSubmenuOpen(event, 'month')}
              aria-haspopup="true"
            >
              Select Month <ArrowRightIcon />
            </MenuItem>
            <MenuItem
              onClick={(event) => handleSubmenuOpen(event, 'trend')}
              aria-haspopup="true"
            >
              Select Trend <ArrowRightIcon />
            </MenuItem>
          </MenuList>
        </Menu>
        <Menu
          anchorEl={submenuAnchorEl}
          keepMounted
          open={Boolean(submenuAnchorEl)}
          onClose={closeSubmenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          className="filter-dropdown"
        >
          {submenuType === 'month' && ['april', 'may', 'june'].map((month) => (
            <MenuItem
              key={month}
              selected={selectedMonth === month}
              onClick={() => handleMonthChange(month)}
            >
              {month.charAt(0).toUpperCase() + month.slice(1)}
            </MenuItem>
          ))}
          {submenuType === 'trend' && ['verbatims', 'severity', 'virality', 'sentiment'].map((option) => (
            <MenuItem
              key={option}
              selected={selectedOption === option}
              onClick={() => handleOptionChange(option)}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </MenuItem>
          ))}
        </Menu>
      </div>
      {loading ? (
        <div className="trend-analysis-loading">Loading...</div>
      ) : (
        <>
          <LineCharts data={filteredData} />
        </>
      )}
    </div>
  );
};

export default TrendAnalysis;
