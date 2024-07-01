import React, { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5/index";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const ChartComponent = () => {
  useEffect(() => {
    // Create root element
    let root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create wrapper container
    let container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout,
      })
    );

    // Create series
    let series = container.children.push(
      am5hierarchy.ForceDirected.new(root, {
        singleBranchOnly: false,
        downDepth: 1,
        initialDepth: 2,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        centerStrength: 0.5,
        minRadius: 30,  // Increase minimum radius of bubbles
        maxRadius: 70,  // Increase maximum radius of bubbles
      })
    );

    // Define data
    let data = {
      name: "Petcare",
      children: [
        { name: "Royal Canin", value: 1 },
        { name: "Optimum", value: 1 },
        { name: "Cesar", value: 1 },
        { name: "Eukanuba", value: 1 },
        { name: "IAMS", value: 1 },
        { name: "Sheba/Dine", value: 1 },
        { name: "Crave", value: 1 },
        { name: "Puppo", value: 1 },
        { name: "Nutro", value: 1 },
        { name: "Dreamies", value: 1 },
        { name: "Whiskas", value: 1, children: [
            { name: "Health/...", value: 1 },
            { name: "Value/Price", value: 1 },
            { name: "Advertis...", value: 1 },
            { name: "P&P-Pac...", value: 1 },
            { name: "Refusal", value: 1 },
            { name: "Illness/...", value: 1 },
            { name: "Sponsors...", value: 1 },
            { name: "Availability", value: 1 },
            { name: "PA-Variet...", value: 1 }
          ] 
        },
        { name: "Greenies", value: 1 },
        { name: "Advance", value: 1 },
        { name: "James ...", value: 1 },
        { name: "Misfits", value: 1 },
        { name: "Pedigree", value: 1 },
        { name: "Other", value: 1 }
      ]
    };

    series.data.setAll([data]);
    series.set("selectedDataItem", series.dataItems[0]);

    // Make stuff animate on load
    series.appear(1000, 100);

    // Clean up when component unmounts
    return () => {
      root.dispose();
    };
  }, []); // Empty dependency array ensures useEffect runs only once

  return <div id="chartdiv" style={{ width: "100%", height: "400px" }}></div>;
};

export default ChartComponent;
