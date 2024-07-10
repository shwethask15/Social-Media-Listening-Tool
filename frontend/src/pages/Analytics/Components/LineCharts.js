import React, { useRef, useEffect } from "react";
import { create, useTheme } from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import '../style/Analytics.css';

const LineCharts = ({ data }) => {
  useTheme(am4themes_animated);

  const chartRef = useRef(null);

  useEffect(() => {
    const chart = create(chartRef.current, am4charts.XYChart);
    chart.data = data;

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.dateFormats.setKey("day", "MMM dd yyyy");
    dateAxis.periodChangeDateFormats.setKey("day", "MMM dd yyyy");

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minGridDistance = 50;

    const createSeries = (field, name, color) => {
      const series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = field;
      series.dataFields.dateX = "date";
      series.name = name;
      series.strokeWidth = 2;
      series.stroke = am4core.color(color);
      const bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.fill = am4core.color(color);
    };

    if (data.length > 0) {
      const keys = Object.keys(data[0]);
      const colors = ["#FF9F1C", "#D4A5A5", "#B56576", "#6A0572", "#84A59D", "#C9ADA7", "#6B4226", "#A44A3F"];
      keys.forEach((key, index) => {
        if (key !== "date") createSeries(key, key.charAt(0).toUpperCase() + key.slice(1), colors[index % colors.length]);
      });
    }

    chart.legend = new am4charts.Legend();
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.exporting.menu = new am4core.ExportMenu();

    return () => chart.dispose();
  }, [data]);

  return <div id="line-chart-container" ref={chartRef} style={{ width: "100%", height: "370px" }}></div>;
};

export default LineCharts;