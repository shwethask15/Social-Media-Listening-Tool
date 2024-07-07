import React, { useState, useEffect } from "react";
import axiosInstance from "../../Components/redux/axiosInstance";
import FilterModal from "./FilterModal";
import VerbatimItem from "./VerbatimItem";
import "./style/Verbatims.css";
import twitterIcon from "./assets/twitter-icon.png";
import blogIcon from "./assets/blog-icon.png";
import redditIcon from "./assets/reddit-icon.png";
import forumIcon from "./assets/forum-icon.png";
import newsIcon from "./assets/news-icon.png";
import VerbatimsPrompter from "./VerbatimsPrompter";
import { useLocation } from 'react-router-dom'; // Import useLocation

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
  
  const location = useLocation(); // Initialize the useLocation hook

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const fetchVerbatims = async () => {
      try {
        const response = await axiosInstance.get(
          "http://127.0.0.1:8000/verbatims_list/"
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
          brand: item.brand.trim(), // Trim whitespace for consistency
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
        setVerbatimData(data);
        setFilteredVerbatimData(data);
        setLoading(false);

        const uniqueOptions = {
          brands: [...new Set(data.map((item) => item.brand))].sort(),
          regions: [...new Set(data.map((item) => item.location))].sort(),
          sources: [...new Set(data.map((item) => item.source))].sort(),
          sentiments: [...new Set(data.map((item) => item.sentiment))].reverse(),
          viralities: [...new Set(data.map((item) => item.virality))],
          severities: [...new Set(data.map((item) => item.severity))],
          languages: [...new Set(data.map((item) => item.language))].sort(),
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
        setAppliedFilters(initialFilters); // Default: select all
      } catch (error) {
        console.error("Error fetching verbatims:", error);
        setLoading(false);
      }
    };

    fetchVerbatims();
  }, []);

  useEffect(() => {
    const fetchFilteredVerbatims = async () => {
      setLoading(true);

      const queryParams = new URLSearchParams(location.search);
      const word = queryParams.get('word');

      const filters = {
        brand: appliedFilters.brands,
        datasource: appliedFilters.sources,
        country: appliedFilters.regions,
        sentiment: appliedFilters.sentiments,
        virality: appliedFilters.viralities,
        severity: appliedFilters.severities,
        language: appliedFilters.languages,
        word, // Include the word in the filter request
      };

      try {
        const response = await axiosInstance.post(
          "http://127.0.0.1:8000/verbatims_list/",
          filters,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
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
          brand: item.brand.trim(), // Trim whitespace for consistency
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
        setCurrentPage(1); // Reset to first page when filters change
        setLoading(false);
      } catch (error) {
        console.error("Error fetching filtered verbatims:", error);
        setLoading(false);
      }
    };

    fetchFilteredVerbatims();
  }, [appliedFilters, location]); // Add location to dependency array to re-fetch on URL change

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVerbatimData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredVerbatimData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDownload = () => {
    const csvData = filteredVerbatimData.map((verbatim) => ({
      date: verbatim.date,
      location: verbatim.location,
      language: verbatim.language,
      virality: verbatim.virality,
      sentiment: verbatim.sentiment,
      severity: verbatim.severity,
      subCategory: verbatim.subCategory,
      content: verbatim.content,
      brand: verbatim.brand,
    }));

    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(csvData[0]).join(",") +
      "\n" +
      csvData.map((e) => Object.values(e).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "verbatims.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpdate = (mention_id, updatedData) => {
    // Filter out metadata fields
    const relevantData = {
      date: updatedData.date,
      source: updatedData.source,
      translated_snippet: updatedData.translated_snippet,
      brand: updatedData.brand ? updatedData.brand.trim() : "",
      severity: updatedData.severity,
      snippet: updatedData.snippet,
      theme: updatedData.theme,
      country: updatedData.country,
      originalURL: updatedData.originalURL,
      impact_index: updatedData.impact_index,
      datasource: updatedData.datasource,
      virality: updatedData.virality,
      mention_id: updatedData.mention_id,
      full_text: updatedData.full_text,
      language: updatedData.language,
      sentiment: updatedData.sentiment,
    };

    setVerbatimData((prevData) =>
      prevData.map((item) =>
        item.mention_id === mention_id ? { ...item, ...relevantData } : item
      )
    );
  };

  return (
    <div className="Verbatims">
      <FilterModal
        show={isModalOpen}
        onClose={toggleModal}
        filterOptions={filterOptions}
        appliedFilters={appliedFilters}
        setAppliedFilters={setAppliedFilters}
      />
      <div className="verbatims-header">
        <VerbatimsPrompter
          setFilteredVerbatimData={setFilteredVerbatimData}
          setCurrentPage={setCurrentPage}
          setLoading={setLoading} // pass setLoading to handle loading state
        />
        <div className="verbatims-count">
          Total Verbatims: {filteredVerbatimData.length}
        </div>
        <div className="right-buttons">
          <button onClick={toggleModal} className="filter-button">
            Open Filter
          </button>
          <button onClick={handleDownload} className="download-button">
            Download CSV
          </button>
        </div>
      </div>
      <div className="verbatims-list">
        {loading ? (
          <p>Loading...</p>
        ) : filteredVerbatimData.length > 0 ? (
          currentItems.map((verbatim) => (
            <VerbatimItem
              key={verbatim.mention_id}
              {...verbatim}
              onUpdate={handleUpdate}
            />
          ))
        ) : (
          <p>No verbatims found.</p>
        )}
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={currentPage === pageNumber ? "active" : ""}
              >
                {pageNumber}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Verbatims;
