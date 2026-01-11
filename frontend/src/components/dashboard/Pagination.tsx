import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  // Determine which page numbers to show
  const getPageNumbers = () => {
    // For simple case with few pages, show all
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // For many pages, show a window around current page
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    } else if (currentPage >= totalPages - 2) {
      return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center gap-1">
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`font-semibold bg-subsidiary py-1 px-3 rounded-md text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-300'}`}
      >
        Previous
      </button>
      
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 rounded-md font-semibold ${
            currentPage === number 
              ? 'bg-transparent border border-subsidiary text-white' 
              : 'text-white bg-subsidiary hover:bg-subsidiary'
          }`}
        >
          {number}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`font-semibold bg-subsidiary py-1 px-3 rounded-md text-white ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-300'}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;