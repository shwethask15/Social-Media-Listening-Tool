import React, { useState } from 'react';
import './style/FilterModal.css';

const FilterModal = ({ show, onClose, filterOptions, selectedFilters, setSelectedFilters }) => {
  const [selectedCategory, setSelectedCategory] = useState('brands');

  const handleCheckboxChange = (category, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((v) => v !== value)
        : [...prev[category], value],
    }));
  };

  const handleApply = () => {
    console.log('Filters applied:', selectedFilters);
    onClose();
  };

  const handleReset = () => {
    setSelectedFilters({
      brands: filterOptions.brands,
      regions: filterOptions.regions,
      sources: filterOptions.sources,
      sentiments: filterOptions.sentiments,
      viralities: filterOptions.viralities,
      severities: filterOptions.severities,
      languages: filterOptions.languages,
    });
  };

  if (!show) {
    return null;
  }

  const filterCategories = [
    { key: 'brands', label: 'Brand' },
    { key: 'regions', label: 'Region/Country' },
    { key: 'sources', label: 'Source' },
    { key: 'sentiments', label: 'Sentiment' },
    { key: 'viralities', label: 'Virality' },
    { key: 'severities', label: 'Severity' },
    { key: 'languages', label: 'Language' },
  ];

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">Filter</h4>
        </div>
        <div className="modal-body">
          <div className="filter-sidebar">
            {filterCategories.map(({ key, label }) => (
              <div
                key={key}
                className={`filter-category ${selectedCategory === key ? 'active' : ''}`}
                onClick={() => setSelectedCategory(key)}
              >
                <h5>{label.toUpperCase()}</h5>
              </div>
            ))}
          </div>
          <div className="filter-options">
            {(filterOptions[selectedCategory] || []).map((option) => (
              <div key={option} className="filter-option">
                <label>
                  <input
                    type="checkbox"
                    checked={selectedFilters[selectedCategory]?.includes(option)}
                    onChange={() => handleCheckboxChange(selectedCategory, option)}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={handleApply}>APPLY</button>
          <button onClick={handleReset}>RESET</button>
          <button onClick={onClose}>CANCEL</button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
