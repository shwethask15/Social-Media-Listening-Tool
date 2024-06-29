import React, { useState, useEffect } from "react";
import axios from "axios";
import filterVerbatims from "./filterVerbatims";
import VerbatimItem from "./VerbatimItem";

const VerbatimList = ({ initialVerbatimData, filters, updateOptions }) => {
  const [verbatimData, setVerbatimData] = useState(initialVerbatimData);
  const [filteredVerbatims, setFilteredVerbatims] = useState([]);

  useEffect(() => {
    setFilteredVerbatims(filterVerbatims(verbatimData, filters));
  }, [verbatimData, filters]);

  const handleUpdate = async (mention_id, updatedValues) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/verbatims_list/${mention_id}`,
        updatedValues,
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      if (response.status === 200) {
        setVerbatimData((prevData) =>
          prevData.map((item) =>
            item.mention_id === mention_id ? { ...item, ...updatedValues } : item
          )
        );
        alert("Update successful.");
      }
    } catch (error) {
      console.error("Error updating verbatim:", error.response?.data || error.message);
      alert("Failed to update.");
    }
  };

  // Render the filtered verbatims
  return (
    <div>
      {filteredVerbatims.map((verbatim) => (
        <VerbatimItem
          key={verbatim.mention_id}
          {...verbatim}
          updateOptions={updateOptions}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default VerbatimList;
