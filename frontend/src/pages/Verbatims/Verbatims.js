import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterModal from "./FilterModal";
import VerbatimItem from "./VerbatimItem";
import "./style/Verbatims.css";
import twitterIcon from "./assets/twitter-icon.png";
import blogIcon from "./assets/blog-icon.png";
import redditIcon from "./assets/reddit-icon.png";

const Verbatims = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verbatimData, setVerbatimData] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const fetchVerbatims = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/verbatim_list/");
        const data = response.data.map((item) => ({
          date: item.date,
          location: item.country || "Unknown",
          language: item.language,
          virality: item.virality,
          sentiment: item.sentiment,
          severity: item.severity,
          subCategory: item.theme || "Unknown",
          content: item.translated_snippet,
          brand: item.brand.trim(),
          icon:
            item.source === "twitter"
              ? twitterIcon
              : item.source === "blog"
              ? blogIcon
              : redditIcon,
        }));
        setVerbatimData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching verbatims:", error);
        setLoading(false);
      }
    };

    fetchVerbatims();
  }, []);

  return (
    <div className="Verbatims">
      <button onClick={toggleModal}>Open Filter Modal</button>
      <FilterModal show={isModalOpen} onClose={toggleModal} />
      <div className="verbatims-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          verbatimData.map((item, index) => <VerbatimItem key={index} {...item} />)
        )}
      </div>
    </div>
  );
};

export default Verbatims;
