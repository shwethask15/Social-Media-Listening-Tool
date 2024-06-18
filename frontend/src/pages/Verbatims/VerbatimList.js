import React, { useState, useEffect } from "react";
import VerbatimItem from "./VerbatimItem";
import VerbatimListHeader from "./VerbatimListHeader";
import "./style/VerbatimList.css";

const VerbatimList = ({ verbatims }) => {
  const [filteredVerbatims, setFilteredVerbatims] = useState(verbatims);

  const handleSearch = (query) => {
    const result = verbatims.filter((verbatim) =>
      verbatim.content.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredVerbatims(result);
  };

  const handleDownload = () => {
    const csvData = filteredVerbatims.map((verbatim) => ({
      date: verbatim.date,
      location: verbatim.location,
      language: verbatim.language,
      virality: verbatim.virality,
      sentiment: verbatim.sentiment,
      severity: verbatim.severity,
      subCategory: verbatim.subCategory,
      content: verbatim.content,
      brand: verbatim.brand,
    }));

    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(csvData[0])
        .join(",") +
      "\n" +
      csvData.map((e) => Object.values(e).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "verbatims.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="verbatim-list">
      <VerbatimListHeader
        verbatimsCount={filteredVerbatims.length}
        onSearch={handleSearch}
        onDownload={handleDownload}
      />
      {filteredVerbatims.map((verbatim, index) => (
        <VerbatimItem key={index} {...verbatim} />
      ))}
    </div>
  );
};

export default VerbatimList;
