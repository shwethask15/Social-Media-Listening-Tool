import React, { useState } from 'react';
import FilterModal from './FilterModal';

const Verbatims = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="verbatims">
      <button onClick={toggleModal}>Open Filter Modal</button>
      <FilterModal show={isModalOpen} onClose={toggleModal} />
    </div>
  );
};

export default Verbatims;
