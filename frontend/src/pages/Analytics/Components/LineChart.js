import React, { useRef, useEffect } from "react";
import { create, useTheme } from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from "@amcharts/amcharts4/themes/animated";



const LineChart = ({ data }) => {
  // Apply the animated theme
  useTheme(am4themes_animated);
  const chartRef = useRef(null);

  useEffect(() => {
    // Create the chart
    let chart = create(chartRef.current, am4charts.XYChart);

    // Add data
    chart.data = data;

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.dateFormats.setKey("day", "MMM dd yyyy");
    dateAxis.periodChangeDateFormats.setKey("day", "MMM dd yyyy");

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minGridDistance = 50;

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "count";
    series.dataFields.dateX = "date";
    series.tooltipText = "{count}";
    series.strokeWidth = 2;
    series.minBulletDistance = 10;

    // Add bullets
    series.bullets.push(new am4charts.CircleBullet());

    // Add a cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;

    // Enable exporting
    chart.exporting.menu = new am4core.ExportMenu();

    // Cleanup on unmount
    return () => {
      chart.dispose();
    };
  }, [data]);

  return (
    <div>
      <div id="chartdiv" ref={chartRef} style={{ width: "100%", height: "300px" }}></div>
    </div>
  );
};

export default LineChart;
