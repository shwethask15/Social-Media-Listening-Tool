
import React from "react";
import "./style/VerbatimListHeader.css";

const VerbatimListHeader = ({ verbatimsCount, onDownload, toggleModal }) => {
  return (
    <div className="verbatim-list-header">
      <div className="verbatims-info">
        <span className="verbatims-count">Total Verbatims: {verbatimsCount}</span>
        <button onClick={toggleModal} className="filter-button">
          Open Filter
        </button>
        <button className="download-button" onClick={onDownload}>
          <i className="fas fa-download"></i> Download CSV
        </button>
      </div>
    </div>
  );
};

export default VerbatimListHeader;