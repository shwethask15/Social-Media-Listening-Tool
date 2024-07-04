import React, { useState } from "react";
import axiosInstance from "../../Components/redux/axiosInstance";
import "./style/VerbatimsPrompter.css";
import twitterIcon from "./assets/twitter-icon.png";
import blogIcon from "./assets/blog-icon.png";
import redditIcon from "./assets/reddit-icon.png";
import forumIcon from "./assets/forum-icon.png";
import newsIcon from "./assets/news-icon.png";

const VerbatimsPrompter = ({ setFilteredVerbatimData, setCurrentPage, setLoading }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      await handleSearch(query);
    }
  };

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `http://127.0.0.1:8000/verbatims_list/?query=${encodeURIComponent(query)}`
      );
      const data = response.data.map((item) => ({
        mention_id: item.mention_id,
        date: item.date,
        location: item.country || "Unknown",
        language: item.language,
        virality: item.virality,
        sentiment: item.sentiment,
        severity: item.severity,
        subCategory: item.theme || "Unknown",
        content: item.translated_snippet,
        brand: item.brand.trim(),
        source: item.source,
        link: item.originalURL,
        icon:
          item.source === "twitter"
            ? twitterIcon
            : item.source === "blog"
            ? blogIcon
            : item.source === "reddit"
            ? redditIcon
            : item.source === "news"
            ? newsIcon
            : forumIcon,
      }));
      setFilteredVerbatimData(data);
      setCurrentPage(1);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching filtered verbatims:", error);
      setLoading(false);
    }
  };

  return (
    <div className="verbatims-prompter">
      <input
        type="text"
        placeholder="Type your query here..."
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="prompter-input"
      />
    </div>
  );
};

export default VerbatimsPrompter;
