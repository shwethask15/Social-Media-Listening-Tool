import React, { useEffect, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5wc from '@amcharts/amcharts5/wc';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import axiosInstance from '../../../Components/redux/axiosInstance';

const WordCloud = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('http://127.0.0.1:8000/analytics/snapshot_view/topic_filter/');
        if (response.status === 200) {
          const result = response.data;
          if (result && result.top_50_most_repeated_words) {
            const formattedData = result.top_50_most_repeated_words.map(([tag, weight]) => ({ tag, weight }));
            setData(formattedData);
          } else {
            console.error('Unexpected response structure:', result);
          }
        } else {
          console.error('Failed to fetch data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let root = am5.Root.new("wordCloudDiv");
    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    let series = root.container.children.push(am5wc.WordCloud.new(root, {
      categoryField: "tag",
      valueField: "weight",
      maxFontSize: am5.percent(15)
    }));

    series.labels.template.setAll({
      fontFamily: "Courier New"
    });

    if (data.length > 0) {
      series.data.setAll(data);
    }

    const intervalId = setInterval(() => {
      am5.array.each(series.dataItems, function(dataItem) {
        let value = Math.random() * 65;
        value = value - Math.random() * value;
        dataItem.set("value", value);
        dataItem.set("valueWorking", value);
      });
    }, 5000);

    return () => {
      clearInterval(intervalId);
      root.dispose();
    };
  }, [data]);

  return <div id="wordCloudDiv" style={{ width: "100%", height: "500px" }}></div>;
};

export default WordCloud;
