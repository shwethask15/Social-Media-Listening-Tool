import React, { useEffect, useState } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

const SnapshotViewMapAll = ({ data, selectedOption, loading }) => {
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
    processedLegendData = [
      { name: 'High', fill: am4core.color('#004d00') },
      { name: 'Medium', fill: am4core.color('#1a8c1a') },
      { name: 'Low', fill: am4core.color('#66ff66') },
      { name: 'No Activity', fill: am4core.color('#c0c0c0') }
    ];

    setLegendData(processedLegendData);
    setIsProcessing(false);
  };

  const getCounts = (item) => {
    return { High: item.High, Medium: item.Medium, Low: item.Low };
  };

  const getFillColor = (counts) => {
    if (counts.High > 0) return am4core.color('#004d00');
    if (counts.Medium > 0) return am4core.color('#1a8c1a');
    if (counts.Low > 0) return am4core.color('#66ff66');
  };

  const constructMap = (countryData, legendData) => {
    console.log('Rendering map with countryData:', countryData, 'legendData:', legendData);

    // Filter out items with all counts as 0
    const filteredCountryData = countryData.filter(item => item.high > 0 || item.medium > 0 || item.low > 0);

    if (filteredCountryData.length === 0) {
      console.log('No data to display on the map.');
      return; // Exit early if there's no data to display
    }

    let chart = am4core.create('chartdiv', am4maps.MapChart);

    chart.geodata = am4geodata_worldLow;
    chart.projection = new am4maps.projections.Miller();

    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    polygonSeries.exclude = ['AQ'];

    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = '[bold]{name}[/]\nHigh: {high}\nMedium: {medium}\nLow: {low}';
    polygonTemplate.polygon.fillOpacity = 0.6;

    let hs = polygonTemplate.states.create('hover');
    hs.properties.fill = am4core.color('#367B25');

    polygonSeries.data = filteredCountryData; // Use filtered data

    polygonTemplate.propertyFields.fill = 'fill';

    let legend = new am4maps.Legend();
    legend.position = 'bottom';
    legend.align = 'center';
    legend.fontSize = '20px';
    legend.data = legendData;

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

    // Adjusting legend position inside the map
    // chart.events.on('ready', function() {
    //   legend.parent = chart.chartContainer;
    //   legend.zIndex = 100;
    //   legend.width = am4core.percent(100);
    //   legend.align = 'center';
    //   legend.marginTop = 10;
    // });

    return () => {
      chart.dispose();
    };
  };

  return (
    <div className='SnapShotViewMapAll' style={{ margin: '50px', border: '1px solid #000000', padding: '20px', borderRadius: '8px' }}>
      {loading || isProcessing ? (
        <div>Loading...</div>
      ) : (
        <>
          <div id="chartdiv" style={{ width: '100%', height: '300px' }}></div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
            {legendData.map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                <div style={{ width: '20px', height: '20px', backgroundColor: item.fill.hex, marginRight: '5px' }}></div>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SnapshotViewMapAll;
