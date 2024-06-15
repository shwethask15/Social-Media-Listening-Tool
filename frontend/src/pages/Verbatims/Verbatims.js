import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterModal from "./FilterModal";
import VerbatimItem from "./VerbatimItem";
import "./style/Verbatims.css";
import twitterIcon from "./assets/twitter-icon.png";
import blogIcon from "./assets/blog-icon.png";
import redditIcon from "./assets/reddit-icon.png";

const ITEMS_PER_PAGE = 5;

const Verbatims = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verbatimData, setVerbatimData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOptions, setFilterOptions] = useState({
    brands: [],
    regions: [],
    sources: [],
    sentiments: [],
    viralities: [],
    severities: [],
    languages: [],
  });
  const [selectedFilters, setSelectedFilters] = useState({
    brands: [],
    regions: [],
    sources: [],
    sentiments: [],
    viralities: [],
    severities: [],
    languages: [],
  });

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
          source: item.source.trim(),
        }));
        setVerbatimData(data);
        setLoading(false);

        // Extract unique filter options
        const uniqueOptions = {
          brands: [...new Set(data.map(item => item.brand))].sort(),
          regions: [...new Set(data.map(item => item.location))].sort(),
          sources: [...new Set(data.map(item => item.source))].sort(),
          sentiments: [...new Set(data.map(item => item.sentiment))].sort(),
          viralities: [...new Set(data.map(item => item.virality))].sort(),
          severities: [...new Set(data.map(item => item.severity))].sort(),
          languages: [...new Set(data.map(item => item.language))].sort(),
        };
        setFilterOptions(uniqueOptions);

        // Initialize selected filters with all options selected
        setSelectedFilters({
          brands: uniqueOptions.brands,
          regions: uniqueOptions.regions,
          sources: uniqueOptions.sources,
          sentiments: uniqueOptions.sentiments,
          viralities: uniqueOptions.viralities,
          severities: uniqueOptions.severities,
          languages: uniqueOptions.languages,
        });
      } catch (error) {
        console.error("Error fetching verbatims:", error);
        setLoading(false);
      }
    };

    fetchVerbatims();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentVerbatimData = verbatimData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(verbatimData.length / ITEMS_PER_PAGE);

  return (
    <div className="Verbatims">
      <button onClick={toggleModal}>Open Filter Modal</button>
      <FilterModal
        show={isModalOpen}
        onClose={toggleModal}
        filterOptions={filterOptions}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <div className="verbatims-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          currentVerbatimData.map((item, index) => <VerbatimItem key={index} {...item} />)
        )}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Verbatims;
