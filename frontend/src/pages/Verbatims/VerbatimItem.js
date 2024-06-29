import React, { useState } from "react";
import axiosInstance from "../../Components/redux/axiosInstance";
import "./style/VerbatimItem.css";

const VerbatimItem = ({
  mention_id,
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
  updateOptions,
  onUpdate, // Pass the onUpdate function
}) => {
  const [isEditing, setIsEditing] = useState({
    virality: false,
    sentiment: false,
    severity: false,
  });

  const [newValues, setNewValues] = useState({
    virality,
    sentiment,
    severity,
  });

  const toggleEditing = (field) => {
    setIsEditing((prevState) => ({ ...prevState, [field]: !prevState[field] }));
  };

  const handleChange = (field, value) => {
    setNewValues((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSave = async (field) => {
    const data = {
      virality,
      sentiment,
      severity,
    };
    data[field] = newValues[field];

    try {
      const response = await axiosInstance.put(
        `http://127.0.0.1:8000/verbatims_list/${mention_id}`,
        data,
        {
          params: {
            mention_id: mention_id,
          },
        }
      );

      if (response.status === 200) {
        onUpdate(mention_id, data); // Call onUpdate with mention_id and updated values
        toggleEditing(field);
      }
    } catch (error) {
      console.error("Error updating verbatim:", error.response?.data || error.message);
    }
  };

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
          {['virality', 'sentiment', 'severity'].map((field) => (
            <div key={field} className="verbatim-tag-container">
              <span className="verbatim-tag">
                {field.charAt(0).toUpperCase() + field.slice(1)}: {newValues[field]}
                <button onClick={() => toggleEditing(field)} className="edit-icon">
                  <i className="fa fa-pencil"></i>
                </button>
              </span>
              {isEditing[field] && (
                <div className="edit-dropdown">
                  {updateOptions[field].map((option) => (
                    <label key={option} className="edit-option">
                      <input
                        type="radio"
                        name={field}
                        value={option}
                        checked={newValues[field] === option}
                        onChange={() => handleChange(field, option)}
                      />
                      {option}
                    </label>
                  ))}
                  <button onClick={() => handleSave(field)} className="save-button">
                    Save
                  </button>
                </div>
              )}
            </div>
          ))}
          <span className="verbatim-tag">Sub-Category: {subCategory}</span>
        </div>
      </div>
    </div>
  );
};

export default VerbatimItem;
