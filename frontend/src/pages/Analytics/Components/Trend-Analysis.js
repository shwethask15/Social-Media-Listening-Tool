import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrendAnalysisData } from '../redux/slice/slice';
import LineCharts from './LineCharts';

const TrendAnalysis = () => {
  const [selectedOption, setSelectedOption] = useState('verbatims');
  const [selectedMonth, setSelectedMonth] = useState('may');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const trendAnalysisData = useSelector((state) => state.analytics.trendAnalysisData);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchTrendAnalysisData('verbatim_count')).finally(() => setLoading(false));
  }, [dispatch]);

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    let queryParam = '';

    switch (value) {
      case 'verbatims':
        queryParam = 'verbatim_count';
        break;
      case 'severity':
        queryParam = 'severity_count';
        break;
      case 'virality':
        queryParam = 'virality_count';
        break;
      case 'sentiment':
        queryParam = 'sentiment_count';
        break;
      default:
        break;
    }

    if (queryParam) {
      setLoading(true);
      dispatch(fetchTrendAnalysisData(queryParam)).finally(() => setLoading(false));
    }
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
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

  const getFilteredData = () => {
    if (trendAnalysisData[selectedMonth]) {
      return formatData(trendAnalysisData[selectedMonth]);
    }
    return [];
  };

  return (
    <div className="trend-analysis-container">
      <h2>Trend Analysis</h2>
      <form className="trend-analysis-form">
        <label>
          <input
            type="radio"
            value="verbatims"
            checked={selectedOption === 'verbatims'}
            onChange={handleOptionChange}
          />
          Verbatims
        </label>
        <label>
          <input
            type="radio"
            value="severity"
            checked={selectedOption === 'severity'}
            onChange={handleOptionChange}
          />
          Severity
        </label>
        <label>
          <input
            type="radio"
            value="virality"
            checked={selectedOption === 'virality'}
            onChange={handleOptionChange}
          />
          Virality
        </label>
        <label>
          <input
            type="radio"
            value="sentiment"
            checked={selectedOption === 'sentiment'}
            onChange={handleOptionChange}
          />
          Sentiment
        </label>
      </form>
      <div className="trend-analysis-month-select">
        <label>
          Select Month:
          <select value={selectedMonth} onChange={handleMonthChange}>
            <option value="april">April</option>
            <option value="may">May</option>
            <option value="june">June</option>
          </select>
        </label>
      </div>
      {loading ? (
        <div className="trend-analysis-loading">Loading...</div>
      ) : (
        <LineCharts data={getFilteredData()} />
      )}
    </div>
  );
};

export default TrendAnalysis;
