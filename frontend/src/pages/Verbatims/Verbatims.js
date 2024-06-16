import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterModal from "./FilterModal";
import VerbatimItem from "./VerbatimItem";
import filterVerbatims from "./FilterVerbatims";
import "./style/Verbatims.css";
import twitterIcon from "./assets/twitter-icon.png";
import blogIcon from "./assets/blog-icon.png";
import redditIcon from "./assets/reddit-icon.png";

const Verbatims = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verbatimData, setVerbatimData] = useState([]);
  const [filteredVerbatimData, setFilteredVerbatimData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState({
    brands: [],
    regions: [],
    sources: [],
    sentiments: [],
    viralities: [],
    severities: [],
    languages: [],
  });
  const [appliedFilters, setAppliedFilters] = useState({
    brands: [],
    regions: [],
    sources: [],
    sentiments: [],
    viralities: [],
    severities: [],
    languages: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
        setFilteredVerbatimData(data); // Initialize filtered data with all verbatims
        setLoading(false);

        // Extract unique filter options
        const uniqueOptions = {
          brands: [...new Set(data.map(item => item.brand))].sort(),
          regions: [...new Set(data.map(item => item.location))].sort(),
          sources: [...new Set(data.map(item => item.icon))].sort(), // Assuming icon represents the source
          sentiments: [...new Set(data.map(item => item.sentiment))].sort(),
          viralities: [...new Set(data.map(item => item.virality))].sort(),
          severities: [...new Set(data.map(item => item.severity))].sort(),
          languages: [...new Set(data.map(item => item.language))].sort(),
        };

        const initialFilters = {
          brands: uniqueOptions.brands,
          regions: uniqueOptions.regions,
          sources: uniqueOptions.sources,
          sentiments: uniqueOptions.sentiments,
          viralities: uniqueOptions.viralities,
          severities: uniqueOptions.severities,
          languages: uniqueOptions.languages,
        };

        setFilterOptions(uniqueOptions);
        setAppliedFilters(initialFilters); // Set all filters to checked by default
      } catch (error) {
        console.error("Error fetching verbatims:", error);
        setLoading(false);
      }
    };

    fetchVerbatims();
  }, []);

  useEffect(() => {
    const filteredData = filterVerbatims(verbatimData, appliedFilters);
    setFilteredVerbatimData(filteredData);
    setCurrentPage(1); // Reset to first page whenever filters are applied
  }, [verbatimData, appliedFilters]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVerbatimData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredVerbatimData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="Verbatims">
      <button onClick={toggleModal}>Open Filter Modal</button>
      <FilterModal
        show={isModalOpen}
        onClose={toggleModal}
        filterOptions={filterOptions}
        appliedFilters={appliedFilters}
        setAppliedFilters={setAppliedFilters}
      />
      <div className="verbatims-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          currentItems.map((item, index) => <VerbatimItem key={index} {...item} />)
        )}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
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
