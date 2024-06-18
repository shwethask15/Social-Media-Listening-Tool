import React from "react";
import "./style/VerbatimListHeader.css";

const VerbatimListHeader = ({ verbatimsCount, onSearch, onDownload }) => {
  return (
    <div className="verbatim-list-header">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => onSearch(e.target.value)}
        />
        <i className="fas fa-search"></i>
      </div>
      <div className="verbatims-info">
        <span className="verbatims-count">Total Verbatims: {verbatimsCount}</span>
        <button className="download-button" onClick={onDownload}>
          <i className="fas fa-download"></i>
        </button>
      </div>
    </div>
  );
};

export default VerbatimListHeader;
