import React, { useLayoutEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const MyMapChart = () => {
  useLayoutEffect(() => {
    // Create root element
    let root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create the map chart
    let chart = root.container.children.push(am5map.MapChart.new(root, {
      panX: "rotateX",
      panY: "none",
      projection: am5map.geoMercator()
    }));

    // Create polygon series
    let polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_worldLow,
      exclude: ["AQ"]
    }));

    // Configure series
    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}: {value}",
      interactive: true,
      fill: am5.color(0x74B266)
    });

    // Add hover state
    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x367B25)
    });

    // Add some data
    polygonSeries.data.setAll([
      { id: "US", name: "United States", value: 100, fill: am5.color(0x006400) },
      { id: "FR", name: "France", value: 50, fill: am5.color(0x228B22) },
      { id: "RU", name: "Russia", value: 20, fill: am5.color(0x32CD32) },
      { id: "CN", name: "China", value: 10, fill: am5.color(0xADFF2F) },
      { id: "IN", name: "India", value: 5, fill: am5.color(0x98FB98) },
      { id: "BR", name: "Brazil", value: 15, fill: am5.color(0x7FFF00) }
    ]);

    // Clean up on unmount
    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
};

export default MyMapChart;
