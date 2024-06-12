import React, { useState } from "react";
import FilterModal from "./FilterModal";
import VerbatimItem from "./VerbatimItem";
import "./style/Verbatims.css";
import twitterIcon from "./assets/twitter-icon.png";
import blogIcon from "./assets/blog-icon.png";
import redditIcon from "./assets/reddit-icon.png";

const Verbatims = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const verbatimData = [
    {
      date: "2022-03-22",
      location: "Unknown",
      language: "English",
      virality: "Low",
      sentiment: "Neutral",
      severity: "Low",
      subCategory: "Unknown",
      content:
        "Like it?? from Dogs in Amazon SalesRank No.3?? IAMS PROACTIVE HEALTH Adult Minichunks ... Adult Dry Dog Food: Give your dog the nutrition they need in the small kibble si...",
      brand: "IAMS",
      icon: twitterIcon,
    },
    {
      date: "2022-03-22",
      location: "Unknown",
      language: "English",
      virality: "Low",
      sentiment: "Neutral",
      severity: "Low",
      subCategory: "Other",
      content: "8 Positive Stories From the Conflict",
      brand: "Other",
      icon: blogIcon,
    },
    {
      date: "2022-03-22",
      location: "Unknown",
      language: "English",
      virality: "Low",
      sentiment: "Positive",
      severity: "Low",
      subCategory: "Unknown",
      content:
        "Temptations treats, milk flavored. My cats are more addicted to those than catnip.",
      brand: "Dreamies/Temptations/Catisfactions",
      icon: redditIcon,
    },
  ];

  return (
    <div className="Verbatims">
      <button onClick={toggleModal}>Open Filter Modal</button>
      <FilterModal show={isModalOpen} onClose={toggleModal} />
      <div className="verbatims-list">
        {verbatimData.map((item, index) => (
          <VerbatimItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Verbatims;
