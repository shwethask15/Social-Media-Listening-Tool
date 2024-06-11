import React, { useState } from 'react';
import './style/FilterModal.css';

const FilterModal = ({ show, onClose }) => {
  const initialFilters = {
    brand: true,
    datasource: true,
    region: true,
    subCategory: true,
    source: true,
    sentiment: true,
  };

  const [filters, setFilters] = useState(initialFilters);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  const handleApply = () => {
    console.log('Filters applied:', filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      brand: false,
      datasource: false,
      region: false,
      subCategory: false,
      source: false,
      sentiment: false,
    });
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
          <div className="filter-section">
            <label>
              <input
                type="checkbox"
                name="brand"
                checked={filters.brand}
                onChange={handleCheckboxChange}
              />
              Selected All
            </label>
          </div>
          <div className="filter-section">
            <label>
              <input
                type="checkbox"
                name="datasource"
                checked={filters.datasource}
                onChange={handleCheckboxChange}
              />
              Advance
            </label>
          </div>
          <div className="filter-section">
            <label>
              <input
                type="checkbox"
                name="region"
                checked={filters.region}
                onChange={handleCheckboxChange}
              />
              Cesar/My Dog
            </label>
          </div>
          <div className="filter-section">
            <label>
              <input
                type="checkbox"
                name="subCategory"
                checked={filters.subCategory}
                onChange={handleCheckboxChange}
              />
              Crave
            </label>
          </div>
          <div className="filter-section">
            <label>
              <input
                type="checkbox"
                name="source"
                checked={filters.source}
                onChange={handleCheckboxChange}
              />
              Dreamies/Temptations/Catisfactions
            </label>
          </div>
          <div className="filter-section">
            <label>
              <input
                type="checkbox"
                name="sentiment"
                checked={filters.sentiment}
                onChange={handleCheckboxChange}
              />
              Eukanuba
            </label>
          </div>
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
