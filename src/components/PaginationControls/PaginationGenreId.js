import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PaginationGenreId = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center space-x-4 py-5">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 bg-white text-black  rounded ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <FaChevronLeft />
      </button>
      <span>{currentPage} / {totalPages}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 bg-white text-black rounded ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default PaginationGenreId;
