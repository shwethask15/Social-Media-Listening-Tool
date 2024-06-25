import React, { useState } from "react";
import "./style/VerbatimsPrompter.css";

const VerbatimsPrompter = ({ verbatimData, setFilteredVerbatimData, setCurrentPage }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(query);
    }
  };

  const handleSearch = (query) => {
    // Split the query into words
    const words = query.toLowerCase().split(/[,\s]+/);

    let severity = null;
    let virality = null;
    let sentiment = null;
    let location = null;

    words.forEach((word, index) => {
      if (word.match(/(high|medium|low)/) && words[index + 1] === "severity") {
        severity = word;
      } else if (word.match(/(high|medium|low)/) && words[index + 1] === "virality") {
        virality = word;
      } else if (word.match(/(positive|negative|neutral)/) && words[index + 1] === "sentiment") {
        sentiment = word;
      } else if (word === "in" && words[index + 1]) {
        location = words[index + 1];
      }
    });

    const result = verbatimData.filter((verbatim) => {
      return (
        (!severity || verbatim.severity.toLowerCase() === severity) &&
        (!virality || verbatim.virality.toLowerCase() === virality) &&
        (!sentiment || verbatim.sentiment.toLowerCase() === sentiment) &&
        (!location || verbatim.location.toLowerCase() === location)
      );
    });

    setFilteredVerbatimData(result);
    setCurrentPage(1);
  };

  return (
    <div className="verbatims-prompter">
      <input
        type="text"
        placeholder="Type your query here..."
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="prompter-input"
      />
    </div>
  );
};

export default VerbatimsPrompter;
