import React, { useState } from 'react';
import ChartComponent from './TopicFilterChart';
import '../style/TopicFilter.css';
import WordCloud from './WordCloud';

const TopicFilter = () => {
  const [selectedBubble, setSelectedBubble] = useState({ brand: null, theme: null });

  const handleBubbleClick = (bubble) => {
    setSelectedBubble(bubble);
  };

  return (
    <div className="topic-filter-page">
      <div className="topic-filter-container">
        <h2>Topic Filter</h2>
        <div className="chart-container">
          <ChartComponent onBubbleClick={handleBubbleClick} className='chart-display' />
        </div>
      </div>
      <div className="wordcloud-container">
        <div className="wordcloud">
          <WordCloud selectedBubble={selectedBubble} className='chart-display' />
        </div>
      </div>
    </div>
  );
};

export default TopicFilter;
