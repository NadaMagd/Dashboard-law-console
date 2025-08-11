"use client";
import { FaGavel, FaHome, FaSearch } from "react-icons/fa";

export default function Notfoud() {
  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl w-full text-center relative z-10">
        {/* Logo/Brand Section */}
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-2xl">
            <FaGavel className="text-white text-3xl" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Law Counsel
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            Professional Legal Services Platform
          </p>
        </div>

        {/* 404 Error Display */}
        <div className="mb-16">
          <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent mb-6 select-none leading-none">
            404
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Page Not Found
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              The legal document you're looking for has been moved or doesn't exist.
            </p>
            <p className="text-base text-slate-500 font-medium bg-slate-800/50 px-4 py-2 rounded-lg inline-block">
              صفحة غير موجودة - الصفحة التي تبحث عنها غير متاحة
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <button
            className="btn btn-primary px-10 py-4 text-lg font-semibold min-w-[200px] group"
            onClick={handleGoHome}
          >
            <FaHome className="group-hover:scale-110 transition-transform duration-200" />
            Back to Dashboard
          </button>
          <button className="btn btn-outline px-10 py-4 text-lg font-semibold min-w-[200px] group">
            <FaSearch className="group-hover:scale-110 transition-transform duration-200" />
            Search Again
          </button>
        </div>

        {/* Additional Info */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 max-w-md mx-auto">
          <p className="text-slate-400 text-sm">
            If you believe this is an error, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
