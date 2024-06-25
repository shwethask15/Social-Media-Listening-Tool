import React, { useState } from "react";
import LineChart from "./LineChart";

const TrendAnalysis = () => {
  const allData = {
    March: [
      { date: new Date("Wed Mar 16 2022"), count: 175 },
      { date: new Date("Thu Mar 17 2022"), count: 140 },
      { date: new Date("Fri Mar 18 2022"), count: 96 },
      { date: new Date("Sat Mar 19 2022"), count: 61 },
      { date: new Date("Sun Mar 20 2022"), count: 91 },
      { date: new Date("Mon Mar 21 2022"), count: 129 },
      { date: new Date("Tue Mar 22 2022"), count: 19 },
    ],
    April: [
      { date: new Date("Wed Apr 13 2022"), count: 150 },
      { date: new Date("Thu Apr 14 2022"), count: 100 },
      { date: new Date("Fri Apr 15 2022"), count: 90 },
      { date: new Date("Sat Apr 16 2022"), count: 70 },
      { date: new Date("Sun Apr 17 2022"), count: 100 },
      { date: new Date("Mon Apr 18 2022"), count: 130 },
      { date: new Date("Tue Apr 19 2022"), count: 20 },
    ],
    May: [
      { date: new Date("Wed May 11 2022"), count: 160 },
      { date: new Date("Thu May 12 2022"), count: 110 },
      { date: new Date("Fri May 13 2022"), count: 95 },
      { date: new Date("Sat May 14 2022"), count: 65 },
      { date: new Date("Sun May 15 2022"), count: 85 },
      { date: new Date("Mon May 16 2022"), count: 125 },
      { date: new Date("Tue May 17 2022"), count: 25 },
    ],
  };

  // Use a single state to manage the currently selected data
  const [data, setData] = useState(allData["March"]);

  const handleMonthChange = (event) => {
    const month = event.target.value;
    setData(allData[month]);
  };

  return (
    <>
      <h1>Trend Analysis</h1>
      <label htmlFor="month-select">Choose a month:</label>
      <select id="month-select" onChange={handleMonthChange}>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
      </select>
      <LineChart data={data} />
    </>
  );
};

export default TrendAnalysis;
