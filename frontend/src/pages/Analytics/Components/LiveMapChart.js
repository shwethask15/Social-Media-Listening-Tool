import React, { useEffect, useLayoutEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useDispatch, useSelector } from 'react-redux';
import { fetchLiveVerbatimsData } from '../redux/slice/slice';
import '../style/smlShow.css'; // Ensure this path is correct

function LiveMapChart({ setLoading }) {
  const dispatch = useDispatch();
  const mapData = useSelector((state) => state.analytics.liveVerbatimsData.graph);
  useEffect(() => {
    dispatch(fetchLiveVerbatimsData());
    console.log('Fetching live verbatims data');
  }, [dispatch]);

  useLayoutEffect(() => {
    console.log('mapData:', mapData);
    if (!mapData || mapData.length === 0) return; // Check if mapData is undefined or empty

    setLoading(true);

    let root = am5.Root.new("chartdiv");
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(am5map.MapChart.new(root, {}));
    
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"],
        fill: am5.color(0xffffff),
        stroke: am5.color(0x000000), // Stroke color
        strokeWidth: 2, // Increase the stroke width (adjust as needed)
      })
    );
    

    let bubbleSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {
        valueField: "value",
        calculateAggregates: true,
        polygonIdField: "id"
      })
    );

    let circleTemplate = am5.Template.new({});

    bubbleSeries.bullets.push(function (root, series, dataItem) {
      let container = am5.Container.new(root, {});

      let circle = container.children.push(
        am5.Circle.new(root, {
          radius: 3, //  radius
          fillOpacity: 1,
          fill: am5.color(0x000000),
          cursorOverStyle: "pointer",
          tooltipText: `{id}: [bold]{value}[/]`
        }, circleTemplate)
      );

      let countryLabel = container.children.push(
        am5.Label.new(root, {
          paddingLeft: 5,
          populateText: true,
          fontWeight: "bold",
          fontSize: 13,
          centerY: am5.p50
        })
      );

      circle.on("radius", function (radius) {
        countryLabel.set("x", radius);
      });

      return am5.Bullet.new(root, {
        sprite: container,
        dynamic: true
      });
    });

    bubbleSeries.bullets.push(function (root, series, dataItem) {
      return am5.Bullet.new(root, {
        sprite: am5.Label.new(root, {
          fill: am5.color(0xFFFFFF),
          populateText: true,
          centerX: am5.p50,
          centerY: am5.p50,
          textAlign: "center"
        }),
        dynamic: true
      });
    });

    let data1 = mapData.map(item => ({
      id: item.two_digit_country_code,
      name: item.country_name,
      value: item.post_count
    }));

    bubbleSeries.data.setAll(data1);

    // Add zoom control
    let zoomControl = am5map.ZoomControl.new(root, {
      layout: root.verticalLayout
    });
    chart.set("zoomControl", zoomControl);

    // Customize the zoom in button
    zoomControl.plusButton.setAll({
      scale: .6, // Adjust the size
      background: am5.Rectangle.new(root, {
        fill: am5.color(0xdddbe4) // Change the color
      })
    });

    // Customize the zoom out button
    zoomControl.minusButton.setAll({
      scale: .6, // Adjust the size
      background: am5.Rectangle.new(root, {
        fill: am5.color(0xdddbe4) // Change the color
      })
    });

    // Customize the home button
    let homeButton = am5.Button.new(root, {
      scale: .6, // Adjust the size
      icon: am5.Graphics.new(root, {
        svgPath: "M12 2C13.1 2 14 2.9 14 4V8H16V4C16 2.34 14.66 1 13 1H11C9.34 1 8 2.34 8 4V8H10V4C10 2.9 10.9 2 12 2M4 10V22H10V16H14V22H20V10L12 3L4 10Z",
        fill: am5.color(0xdddbe4) // Change the color
      }),
    });

    zoomControl.children.push(homeButton);

    homeButton.events.on("click", function () {
      chart.goHome();
    });

    setLoading(false);

    return () => {
      root.dispose();
    };
  }, [mapData, setLoading]);


  return (
    <div id="chartdiv" className='MapChart '></div>
  );
}

export default LiveMapChart;
