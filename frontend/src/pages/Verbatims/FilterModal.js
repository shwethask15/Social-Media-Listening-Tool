import React, { useState } from "react";
import "./style/FilterModal.css";

const FilterModal = ({ show, onClose }) => {
  const initialFilters = {
    brand: {
      selectedAll: true,
      advance: true,
    },
    datasource: {
      cesarMyDog: true,
    },
    region: {
      crave: true,
    },
    subCategory: {
      dreamies: true,
    },
    source: {
      eukanuba: true,
    },
    sentiment: {},
  };

  const [filters, setFilters] = useState(initialFilters);
  const [activeFilter, setActiveFilter] = useState("brand");

  const handleCheckboxChange = (category, subCategory) => (e) => {
    const { checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: {
        ...prevFilters[category],
        [subCategory]: checked,
      },
    }));
  };

  const handleApply = () => {
    console.log("Filters applied:", filters);
    onClose();
  };

  const handleReset = () => {
    setFilters(initialFilters);
  };

  const renderSubFilters = () => {
    const subFilters = filters[activeFilter];
    return Object.keys(subFilters).map((subFilter) => (
      <div key={subFilter} className="filter-section">
        <label>
          <input
            type="checkbox"
            checked={subFilters[subFilter]}
            onChange={handleCheckboxChange(activeFilter, subFilter)}
          />
          {subFilter.charAt(0).toUpperCase() +
            subFilter.slice(1).replace(/([A-Z])/g, " $1")}
        </label>
      </div>
    ));
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">Filter</h4>
        </div>
        <div className="modal-body">
          <div className="filter-category">
            {Object.keys(initialFilters).map((filter) => (
              <div
                key={filter}
                className={`filter-category-item ${
                  activeFilter === filter ? "active" : ""
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter.charAt(0).toUpperCase() +
                  filter.slice(1).replace(/([A-Z])/g, " $1")}
              </div>
            ))}
          </div>
          <div className="filter-options">{renderSubFilters()}</div>
        </div>
        <div className="modal-footer">
          <button onClick={handleApply}>Apply</button>
          <button onClick={handleReset}>Reset</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
