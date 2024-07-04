import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrendAnalysisData } from '../redux/slice/slice';
import LineCharts from './LineCharts';
import { useMemo } from 'react';
import { Button, Modal, Box, Typography } from '@mui/material'; // Import Material-UI components
import '../style/TrendAnalysis.css'; // Import the CSS file

const TrendAnalysis = () => {
  const [selectedOption, setSelectedOption] = useState('verbatims');
  const [selectedMonth, setSelectedMonth] = useState('may');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const trendAnalysisData = useSelector((state) => state.analytics.trendAnalysisData);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchTrendAnalysisData(getQueryParam(selectedOption))).finally(() => setLoading(false));
  }, [dispatch, selectedOption]);

  const handleOptionChange = (value) => {
    setSelectedOption(value);

    const queryParam = getQueryParam(value);

    if (queryParam) {
      setLoading(true);
      dispatch(fetchTrendAnalysisData(queryParam)).finally(() => setLoading(false));
    }
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setIsModalOpen(false); // Close the modal after selection
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

  const filteredData = useMemo(() => {
    if (trendAnalysisData[selectedMonth]) {
      return formatData(trendAnalysisData[selectedMonth]);
    }
    return [];
  }, [selectedMonth, trendAnalysisData]);

  return (
    <div className="trend-analysis-container">
      <div className="trend-analysis-controls">
        <div className="trend-analysis-month-select">
          <Button onClick={() => setIsModalOpen(true)} variant="contained" className="filter-icon-button">
            <i className="fa fa-filter" aria-hidden="true"></i> Filter
          </Button>
        </div>
        <div className="trend-analysis-buttons">
          {['verbatims', 'severity', 'virality', 'sentiment'].map((option) => (
            <Button
              key={option}
              className={selectedOption === option ? 'active' : ''}
              onClick={() => handleOptionChange(option)}
              variant="outlined"
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </Button>
           
          ))}
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="month-modal">
          <Typography variant="h6" id="modal-title">
            Select Month
          </Typography>
          <div className="month-options">
            {['april', 'may', 'june'].map((month) => (
              <Button
                key={month}
                onClick={() => handleMonthChange(month)}
                variant={selectedMonth === month ? 'contained' : 'outlined'}
                className={`month-button ${selectedMonth === month ? 'active' : ''}`}
              >
                {month.charAt(0).toUpperCase() + month.slice(1)}
              </Button>
            ))}
          </div>
          <Button onClick={() => setIsModalOpen(false)} variant="contained" className="close-modal-button">
            Close
          </Button>
        </Box>
      </Modal>
      {loading ? (
        <div className="trend-analysis-loading">Loading...</div>
      ) : (
        <>
          <h2 className="trend-analysis-heading">{getHeading()}</h2>
          <LineCharts data={filteredData} />
        </>
      )}
    </div>
  );
};

export default TrendAnalysis;
