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
    <div className="flex items-center justify-between w-full px-6 py-4 bg-slate-800/50 text-white text-sm rounded-xl border border-slate-700/50 backdrop-blur-sm">
      {/* Left side - Rows selected info */}
      <div className="flex items-center">
        <span className="text-slate-400 text-sm">
          Showing {rowsPerPage} items per page
        </span>
      </div>

      {/* Right side - Pagination controls */}
      <div className="flex items-center gap-6">
        {/* Rows per page */}
        {onRowsPerPageChange && (
          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-sm font-medium">Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => onRowsPerPageChange && onRowsPerPageChange(Number(e.target.value))}
              className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
            >
              {rowsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Page info */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm">Page</span>
          <span className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-3 py-1 rounded-lg border border-blue-500/30 text-white font-semibold">
            {currentPage}
          </span>
          <span className="text-slate-400 text-sm">of</span>
          <span className="text-white font-semibold">{totalPages}</span>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-2">
          {/* First page */}
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 rounded-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed border border-slate-600 hover:border-blue-500/30"
          >
            <MdKeyboardDoubleArrowLeft className="text-lg" />
          </button>

          {/* Previous page */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 rounded-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed border border-slate-600 hover:border-blue-500/30"
          >
            <FaChevronLeft className="text-sm" />
          </button>

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              if (pageNum > 0 && pageNum <= totalPages) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => onPageChange(pageNum)}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200 border ${
                      currentPage === pageNum
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-blue-500 shadow-lg'
                        : 'text-slate-400 hover:text-white hover:bg-slate-700/50 border-slate-600 hover:border-blue-500/30'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              }
              return null;
            })}
          </div>

          {/* Next page */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 rounded-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed border border-slate-600 hover:border-blue-500/30"
          >
            <FaChevronRight className="text-sm" />
          </button>

          {/* Last page */}
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 rounded-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed border border-slate-600 hover:border-blue-500/30"
          >
            <MdKeyboardDoubleArrowRight className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
}
