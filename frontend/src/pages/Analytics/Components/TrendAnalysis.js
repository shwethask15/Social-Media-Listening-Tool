import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrendAnalysisData } from '../redux/slice/slice';
import LineCharts from './LineCharts';
import Loader from './Loader';
import FilterMenu from './FilterMenu';
import '../style/TrendAnalysis.css';

const TrendAnalysis = () => {
  const [selectedOption, setSelectedOption] = useState('verbatims');
  const [selectedMonth, setSelectedMonth] = useState('may');
  const dispatch = useDispatch();
  const { trendAnalysisData, loading, error } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchTrendAnalysisData(getQueryParam(selectedOption)));
  }, [selectedOption]);

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const getQueryParam = (option) => {
    const options = {
      verbatims: 'verbatim_count',
      severity: 'severity_count',
      virality: 'virality_count',
      sentiment: 'sentiment_count'
    };
    return options[option] || '';
  };

  const getHeading = () => {
    const headings = {
      verbatims: 'Verbatims by Date',
      severity: 'Verbatims across Severity',
      virality: 'Verbatims across Virality',
      sentiment: 'Verbatims across Sentiment'
    };
    return headings[selectedOption] || '';
  };

  const formatData = (data) => data.map(item => {
    const [year, month, day] = item.date.split('-');
    return { ...item, date: new Date(`20${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`) };
  });

  const filteredData = trendAnalysisData[selectedMonth] 
    ? formatData(trendAnalysisData[selectedMonth]) 
    : [];

  return (
    <div className="trend-analysis-container">
      <div className="trend-analysis-controls">
        <FilterMenu
          options={['verbatims', 'severity', 'virality', 'sentiment']}
          selectedOption={selectedOption}
          onOptionChange={handleOptionChange}
          months={['april', 'may', 'june']}
          selectedMonth={selectedMonth}
          onMonthChange={handleMonthChange}
        />
        <h2 className="trend-analysis-heading">{getHeading()}</h2>
      </div>
      {loading ? <Loader /> : error ? <div>Error: {error}</div> : <LineCharts data={filteredData} />}
    </div>
  );
};
export default TrendAnalysis;