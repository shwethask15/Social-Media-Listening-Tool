import React, { useEffect, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5wc from '@amcharts/amcharts5/wc';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import axiosInstance from '../../../Components/redux/axiosInstance';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const WordCloud = ({ selectedBubble }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {};
        if (selectedBubble.brand) {
          params.brand = selectedBubble.brand;
        }
        if (selectedBubble.theme) {
          params.theme = selectedBubble.theme;
        }

        const response = await axiosInstance.get('http://127.0.0.1:8000/analytics/snapshot_view/topic_filter/', { params });
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
  }, [selectedBubble]);

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

    // Click event handler
    console.log(data);
    series.labels.template.events.on("click", (event) => {
      const word = event.target.dataItem.get("tag");

      // Log the word to debug
      console.log("Clicked word:", word);

      if (word) {
        navigateToVerbatimsPage(word);
      } else {
        console.error("Word is undefined or empty:", word);
      }
    });

    if (data.length > 0) {
      series.data.setAll(data);
    }

    return () => {
      root.dispose();
    };
  }, [data]);

  const navigateToVerbatimsPage = (word) => {
    navigate(`/page2?word=${word}`);
  };

  return <div id="wordCloudDiv" style={{ width: "100%", height: "550px", padding: "0px", marginTop: "-75px"}}></div>;
};

export default WordCloud;
