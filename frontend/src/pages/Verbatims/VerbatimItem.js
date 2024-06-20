import React from "react";
import "./style/VerbatimItem.css";

const VerbatimItem = ({
  date,
  location,
  language,
  virality,
  sentiment,
  severity,
  subCategory,
  content,
  brand,
  link,
  icon,
}) => {
  return (
    <div className="verbatim-item">
      <div className="verbatim-header">
        <span className="verbatim-date">{date}</span>
        <span className="verbatim-location">{location}</span>
        <span className="verbatim-language">{language}</span>
      </div>
      <div className="verbatim-content">
        {icon && (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <img src={icon} alt="icon" className="verbatim-icon" />
          </a>
        )}
        <p>{content}</p>
      </div>
      <div className="verbatim-footer">
        <span className="verbatim-brand">Brand: {brand}</span>
        <div className="verbatim-tags">
          <span className="verbatim-tag">Virality: {virality}</span>
          <span className="verbatim-tag">Sentiment: {sentiment}</span>
          <span className="verbatim-tag">Severity: {severity}</span>
          <span className="verbatim-tag">Sub-Category: {subCategory}</span>
        </div>
      </div>
    </div>
  );
};

export default VerbatimItem;
