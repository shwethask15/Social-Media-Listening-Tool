import React, { useRef, useEffect } from "react";
import { create, useTheme } from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import '../style/smlShow.css';

const LineCharts = ({ data }) => {
  useTheme(am4themes_animated);

  const chartRef = useRef(null);

  useEffect(() => {
    let chart = create(chartRef.current, am4charts.XYChart);
    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.dateFormats.setKey("day", "MMM dd yyyy");
    dateAxis.periodChangeDateFormats.setKey("day", "MMM dd yyyy");

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minGridDistance = 50;

    const createSeries = (field, name, color) => {
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = field;
      series.dataFields.dateX = "date";
      series.name = name;
      series.strokeWidth = 2;
      series.stroke = am4core.color(color);
      let bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.fill = am4core.color(color);
    };

    if (data.length > 0 && data[0].hasOwnProperty("count")) {
      createSeries("count", "Count", "#6683b7");
    } else if (data.length > 0 && data[0].hasOwnProperty("low")) {
      createSeries("low", "Low", "#EDD8F5");
      createSeries("medium", "Medium", "#B2A6D9");
      createSeries("high", "High", "#5E548E");
      createSeries("no_threat", "No Threat", "#708B82");
    } else if (data.length > 0 && data[0].hasOwnProperty("neutral")) {
      createSeries("neutral", "Neutral", "#F2D0A9");
      createSeries("positive", "Positive", "#A6C9C2");
      createSeries("negative", "Negative", "#E0A4AF");
    }

    chart.legend = new am4charts.Legend();
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.exporting.menu = new am4core.ExportMenu();

    return () => {
      chart.dispose();
    };
  }, [data]);

  return <div id="line-chart-container" ref={chartRef} style={{ width: "100%", height: "300px" }}></div>;
};

export default LineCharts;
