import React from 'react';
import ChartComponent from './TopicFilterChart';

const TopicFilter = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ width: '50%' }}>
        <h2>Topic Filter</h2>
        <ChartComponent />
      </div>
      <div style={{ width: '50%' }}>
        <h2>Petcare</h2>
        <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="/mnt/data/image.png" alt="Petcare Word Cloud" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </div>
      </div>
    </div>
  );
};

export default TopicFilter;
