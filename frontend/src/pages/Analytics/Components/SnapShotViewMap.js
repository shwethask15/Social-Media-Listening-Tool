import React, { useEffect, useState } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import '../style/smlShow.css';

const LoadingIndicator = () => <div>Loading...</div>;

const MapContainer = () => (
  <div id="chartdiv"></div>
);

const Legend = ({ legendData }) => (
  <div className="legend-container">
    {legendData.map((item, index) => (
      <div key={index} className="legend-item">
        <div className="legend-color-box" style={{ backgroundColor: item.fill }}></div>
        <span>{item.name}</span>
      </div>
    ))}
  </div>
);

const SnapshotViewMap = ({ data, selectedOption, loading }) => {
  const [countryData, setCountryData] = useState([]);
  const [legendData, setLegendData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    if (!loading) {
      setIsProcessing(true);
      processData(data);
    }
  }, [data, selectedOption, loading]);

  useEffect(() => {
    if (!loading && !isProcessing && countryData.length > 0) {
      constructMap(countryData, legendData);
    }
  }, [countryData, legendData, loading, isProcessing]);

  const processData = (data) => {
    if (!data || data.length === 0) {
      setIsProcessing(false);
      return;
    }

    let processedCountryData = data.map(item => {
      const counts = getCounts(item);
      const countryFeature = am4geodata_worldLow.features.find(f => f.properties.name === item.country);
      if (!countryFeature) {
        console.warn(`Country "${item.country}" not found in geodata`);
        return null;
      }
      return {
        id: countryFeature.id,
        name: item.country,
        fill: getFillColor(counts),
        high: counts.High || counts.Positive || 0,
        medium: counts.Medium || counts.Neutral || 0,
        low: counts.Low || counts.Negative || 0
      };
    }).filter(item => item !== null);

    setCountryData(processedCountryData);

    let processedLegendData;
    if (selectedOption === 'Sentiment') {
      processedLegendData = [
        { name: 'Positive', fill: am4core.color('#004d00') },
        { name: 'Negative', fill: am4core.color('#8B0000') },
        { name: 'Neutral', fill: am4core.color('#FFD700') },
        { name: 'No Activity', fill: am4core.color('#c0c0c0') }
      ];
    } else {
      processedLegendData = [
        { name: 'High', fill: am4core.color('#004d00') },
        { name: 'Medium', fill: am4core.color('#1a8c1a') },
        { name: 'Low', fill: am4core.color('#66ff66') },
        { name: 'No Activity', fill: am4core.color('#c0c0c0') }
      ];
    }
    setLegendData(processedLegendData);
    setIsProcessing(false);
  };

  const getCounts = (item) => {
    switch (selectedOption) {
      case 'Virality':
        return item.virality_counts || { High: 0, Medium: 0, Low: 0 };
      case 'Sentiment':
        return item.sentiment_counts || { Positive: 0, Negative: 0, Neutral: 0 };
      case 'Severity':
        return item.severity_counts || { High: 0, Medium: 0, Low: 0 };
      case 'All':
        return { High: item.High, Medium: item.Medium, Low: item.Low };
      default:
        return {};
    }
  };

  const getFillColor = (counts) => {
    if (selectedOption === 'Sentiment') {
      if (counts.Positive > 0) return am4core.color('#004d00');
      if (counts.Negative > 0) return am4core.color('#8B0000');
      if (counts.Neutral > 0) return am4core.color('#FFD700');
    } else {
      if (counts.High > 0) return am4core.color('#004d00');
      if (counts.Medium > 0) return am4core.color('#1a8c1a');
      if (counts.Low > 0) return am4core.color('#66ff66');
    }
    return am4core.color('#c0c0c0');
  };

  const getTooltipText = () => {
    switch (selectedOption) {
      case 'Sentiment':
        return '[bold]{name}[/]\nPositive: {high}\nNeutral: {medium}\nNegative: {low}';
      case 'Virality':
      case 'Severity':
      case 'All':
        return '[bold]{name}[/]\nHigh: {high}\nMedium: {medium}\nLow: {low}';
      default:
        return '[bold]{name}[/]\nHigh: {high}\nMedium: {medium}\nLow: {low}';
    }
  };

  const constructMap = (countryData, legendData) => {
    am4core.useTheme(am4themes_animated);

    console.log('Rendering map with countryData:', countryData, 'legendData:', legendData);
    let chart = am4core.create('chartdiv', am4maps.MapChart);

    chart.geodata = am4geodata_worldLow;
    chart.projection = new am4maps.projections.Miller();

    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    polygonSeries.exclude = ['AQ'];

    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = getTooltipText();
    polygonTemplate.polygon.fillOpacity = 0.6;

    let hs = polygonTemplate.states.create('hover');
    hs.properties.fill = am4core.color('#367B25');

    polygonSeries.data = countryData;

    polygonTemplate.propertyFields.fill = 'fill';

    chart.zoomControl = new am4maps.ZoomControl();

    let homeButton = new am4core.Button();
    homeButton.events.on('hit', function() {
      chart.goHome();
    });

    homeButton.icon = new am4core.Sprite();
    homeButton.padding(7, 5, 7, 5);
    homeButton.width = 30;
    homeButton.icon.path = 'M12 2L2 7h3v5h4V8h2v4h4V7h3L12 2z';
    homeButton.marginBottom = 10;
    homeButton.parent = chart.zoomControl;
    homeButton.insertBefore(chart.zoomControl.plusButton);

    // Enable export plugin and menu
    chart.exporting.menu = new am4core.ExportMenu();

    return () => {
      chart.dispose();
    };
  };

  return (
    <div className='SnapShotViewMap'>
      {loading || isProcessing ? (
        <LoadingIndicator />
      ) : (
        <>
          <MapContainer />
          <Legend legendData={legendData} />
        </>
      )}
    </div>
  );
};

export default SnapshotViewMap;
