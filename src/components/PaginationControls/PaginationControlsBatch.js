import React from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const PaginationControlsBatch = ({currentPage, totalPages, onPageChange}) => {
    return (
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-white p-3 rounded-md shadow-md "
          >
            <span className="sr-only">Previous</span>
            <FaChevronLeft   aria-hidden="true" className="h-5 w-5 text-black" />
          </button>
  
          <span className="text-sm font-medium text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
  
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-white p-3 rounded-lg shadow-md"
          >
            <span className="sr-only">Next</span>
            <FaChevronRight aria-hidden="true" className="h-5 w-5 text-black" />
          </button>
        </div>
      );
}

export default PaginationControlsBatch;