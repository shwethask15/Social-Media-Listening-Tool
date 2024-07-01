import React, { useState, useEffect } from "react";
import axiosInstance from "../../Components/redux/axiosInstance";
import FilterModal from "./FilterModal";
import VerbatimItem from "./VerbatimItem";
import filterVerbatims from "./FilterVerbatims";
import "./style/Verbatims.css";
import twitterIcon from "./assets/twitter-icon.png";
import blogIcon from "./assets/blog-icon.png";
import redditIcon from "./assets/reddit-icon.png";
import forumIcon from "./assets/forum-icon.png";
import newsIcon from "./assets/news-icon.png";
import VerbatimsPrompter from "./VerbatimsPrompter";

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
        setVerbatimData(data);
        setFilteredVerbatimData(data);
        setLoading(false);

        const uniqueOptions = {
          brands: [...new Set(data.map((item) => item.brand))].sort(),
          regions: [...new Set(data.map((item) => item.location))].sort(),
          sources: [...new Set(data.map((item) => item.source))].sort(),
          sentiments: [
            ...new Set(data.map((item) => item.sentiment)),
          ].reverse(),
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
        setAppliedFilters(initialFilters); //default: select all
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
    setCurrentPage(1);
  }, [verbatimData, appliedFilters]);

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

  const handleSearch = (query) => {
    const severityMatch = query.match(/(high|medium|low) severity/i);
    const viralityMatch = query.match(/(high|medium|low) virality/i);
    const sentimentMatch = query.match(
      /(positive|negative|neutral) sentiment/i
    );
    const locationMatch = query.match(/in (\w+)/i);

    const severity = severityMatch ? severityMatch[1] : null;
    const virality = viralityMatch ? viralityMatch[1] : null;
    const sentiment = sentimentMatch ? sentimentMatch[1] : null;
    const location = locationMatch ? locationMatch[1] : null;

    const result = verbatimData.filter((verbatim) => {
      return (
        (severity
          ? verbatim.severity.toLowerCase() === severity.toLowerCase()
          : true) &&
        (virality
          ? verbatim.virality.toLowerCase() === virality.toLowerCase()
          : true) &&
        (sentiment
          ? verbatim.sentiment.toLowerCase() === sentiment.toLowerCase()
          : true) &&
        (location
          ? verbatim.location.toLowerCase() === location.toLowerCase()
          : true)
      );
    });

    setFilteredVerbatimData(result);
    setCurrentPage(1);
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
          verbatimData={verbatimData}
          setFilteredVerbatimData={setFilteredVerbatimData}
          handleSearch={handleSearch}
          setCurrentPage={setCurrentPage}
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
          currentItems.map((item, index) => (
            <VerbatimItem
              key={index}
              mention_id={item.mention_id}
              date={item.date}
              location={item.location}
              language={item.language}
              virality={item.virality}
              sentiment={item.sentiment}
              severity={item.severity}
              subCategory={item.subCategory}
              content={item.content}
              brand={item.brand}
              link={item.link}
              icon={item.icon}
              updateOptions={{
                virality: filterOptions.viralities,
                sentiment: filterOptions.sentiments,
                severity: filterOptions.severities,
              }}
            />
          ))
        ) : (
          <p>No matches found</p>
        )}
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Verbatims;
