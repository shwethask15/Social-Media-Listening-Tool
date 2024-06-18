import React, { useState, useEffect } from "react";
import "./style/FilterModal.css";

const FilterModal = ({ show, onClose, filterOptions, appliedFilters, setAppliedFilters }) => {
  const [localFilters, setLocalFilters] = useState(appliedFilters);
  const [activeTab, setActiveTab] = useState("brands");

  useEffect(() => {
    setLocalFilters(appliedFilters);
  }, [appliedFilters]);

  const handleCheckboxChange = (category, option) => {
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [category]: prevFilters[category].includes(option)
        ? prevFilters[category].filter((item) => item !== option)
        : [...prevFilters[category], option],
    }));
  };

  const handleApply = () => {
    setAppliedFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    setLocalFilters(filterOptions);
  };

  const renderOptions = (category) => {
    return filterOptions[category].map((option) => (
      <div key={option} className="filter-option">
        <label>
          <input
            type="checkbox"
            checked={localFilters[category].includes(option)}
            onChange={() => handleCheckboxChange(category, option)}
          />
          {option}
        </label>
      </div>
    ));
  };

  if (!show) {
    return null;
  }

  return (
    <div className="filter-modal">
      <div className="filter-modal-content">
        <div className="filter-modal-header">
          <h2>Filter Options</h2>
          <button onClick={onClose}>X</button>
        </div>
        <div className="filter-modal-body">
          <div className="filter-modal-sidebar">
            {Object.keys(filterOptions).map((category) => (
              <button
                key={category}
                className={`filter-tab ${activeTab === category ? "active" : ""}`}
                onClick={() => setActiveTab(category)}
              >
                {category.replace(/_/g, " ")}
              </button>
            ))}
          </div>
          <div className="filter-modal-main">
            {renderOptions(activeTab)}
          </div>
        </div>
        <div className="filter-modal-footer">
          <button className="apply-button" onClick={handleApply}>
            Apply
          </button>
          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
