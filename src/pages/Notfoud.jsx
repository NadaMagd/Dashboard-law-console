"use client";

export default function Notfoud() {
  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        {/* Logo/Brand Section */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-900 rounded-full mb-4 shadow-lg">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-white"
            >
              <path d="m12 15 2-5-2-5-2 5 2 5" />
              <path d="m2 20 2-6 2 6" />
              <path d="m18 20 2-6 2 6" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Legal Associates
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Professional Legal Services
          </p>
        </div>

        {/* 404 Error Display */}
        <div className="mb-12">
          <div className="text-8xl md:text-9xl font-bold text-slate-200 mb-4 select-none leading-none">
            404
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              The legal document you're looking for has been moved or doesn't
              exist.
            </p>
            <p className="text-sm text-slate-500 font-medium">
              صفحة غير موجودة - الصفحة التي تبحث عنها غير متاحة
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 min-w-[180px]"
            onClick={handleGoHome}
          >
            <span>←</span>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
