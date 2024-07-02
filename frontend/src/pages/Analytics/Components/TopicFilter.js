import React from 'react';
import ChartComponent from './TopicFilterChart';
import '../style/TopicFilter.css'
import WordCloud from './WordCloud';

const TopicFilter = () => {
  return (
    <div className="topic-filter-page">
      <div className="topic-filter-container">
        <h2>Topic Filter</h2>
        <ChartComponent />
      </div>
      <div className="wordcloud-container">
        <h2>Petcare</h2>
        <WordCloud />
      </div>
    </div>
  );
};

export default TopicFilter;
