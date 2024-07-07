import React, { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5/index";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const ChartComponent = ({ onBubbleClick }) => {
  useEffect(() => {
    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout,
      })
    );

    let series = container.children.push(
      am5hierarchy.ForceDirected.new(root, {
        singleBranchOnly: false,
        downDepth: 1,
        initialDepth: 2,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        centerStrength: 0.5,
        minRadius: 30,
        maxRadius: 70,
      })
    );

    let data = {
      name: "Petcare",
      children: [
        { name: "Royal Canin", value: 1 },
        { name: "Optimum", value: 1 },
        { name: "Cesar/My Dog", value: 1 },
        { name: "Eukanuba", value: 1 },
        { name: "IAMS", value: 1 },
        { name: "Sheba/Dine", value: 1 },
        { name: "Crave", value: 1 },
        { name: "Puppo", value: 1 },
        { name: "Misfits", value: 1 },
        { name: "Nutro", value: 1 },
        { name: "Dreamies", value: 1 },
        {
          name: "Whiskas",
          value: 1,
          children: [
            { name: "Health/...", value: 1 },
            { name: "Value/Price", value: 1 },
            { name: "Advertis...", value: 1 },
            { name: "P&P-Pac...", value: 1 },
            { name: "Refusal", value: 1 },
            { name: "Illness/...", value: 1 },
            { name: "Sponsors...", value: 1 },
            { name: "Availability", value: 1 },
            { name: "PA-Variet...", value: 1 },
          ],
        },
        { name: "Greenies", value: 1 },
        { name: "Advance", value: 1 },
        { name: "James Wellbeloved", value: 1 },
        { name: "Pedigree", value: 1 },
        { name: "Other", value: 1 },
      ],
    };

    series.data.setAll([data]);
    series.set("selectedDataItem", series.dataItems[0]);

    series.nodes.template.events.on("hit", (event) => {
      const { name, children } = event.target.dataItem.dataContext;
      const bubble = { brand: name, theme: children ? null : event.target.dataItem.dataContext.name };
      onBubbleClick(bubble);
    });

    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [onBubbleClick]);

  return <div id="chartdiv" style={{ width: "100%", height: "332px" }}></div>;
};

export default ChartComponent;
