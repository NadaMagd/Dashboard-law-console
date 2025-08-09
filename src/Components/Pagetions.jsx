import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  rowsPerPage = 10, 
  onRowsPerPageChange 
}) {
  const rowsPerPageOptions = [5, 8, 10, 25, 50];

  return (
    <div className="flex items-center justify-between w-full px-4 py-3 bg-gray-900 text-white text-sm">
      {/* Left side - Rows selected info */}
      <div className="flex items-center">
       
      </div>

      {/* Right side - Pagination controls */}
      <div className="flex items-center gap-6">
        {/* Rows per page */}
        <div className="flex items-center gap-2">
          <span className="text-gray-300">Rows per page</span>
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange && onRowsPerPageChange(Number(e.target.value))}
            className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#c9b38c]"
          >
            {rowsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Page info */}
        <div className="flex items-center">
          <span className="text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center">
          {/* First page */}
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <MdKeyboardDoubleArrowLeft className="text-lg" />
          </button>

          {/* Previous page */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <FaChevronLeft className="text-sm" />
          </button>

          {/* Next page */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <FaChevronRight className="text-sm" />
          </button>

          {/* Last page */}
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <MdKeyboardDoubleArrowRight className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
}
