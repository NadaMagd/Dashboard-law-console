export default function ProgressCard({ title, value, total }) {
  const percent = total > 0 ? Math.round((value / total) * 100) : 0;

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'from-green-500 to-emerald-500';
    if (percentage >= 60) return 'from-blue-500 to-cyan-500';
    if (percentage >= 40) return 'from-yellow-500 to-orange-500';
    if (percentage >= 20) return 'from-orange-500 to-red-500';
    return 'from-red-500 to-pink-500';
  };

  const getStatusText = (percentage) => {
    if (percentage >= 80) return 'Excellent';
    if (percentage >= 60) return 'Good';
    if (percentage >= 40) return 'Fair';
    if (percentage >= 20) return 'Poor';
    return 'Critical';
  };

  return (
    <div className="card group hover:scale-105 transition-all duration-300 cursor-pointer">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white">{value}</span>
          <span className="text-slate-400">/ {total}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative mb-4">
        <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${getProgressColor(percent)} rounded-full transition-all duration-1000 ease-out shadow-lg`}
            style={{
              width: `${percent}%`,
            }}
          />
        </div>
        
        {/* Progress Indicator */}
        <div className="absolute -top-2 right-0 transform translate-x-1/2">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center p-3">
            <span className="text-xs font-bold text-white ">{percent}%</span>
          </div>
        </div>
      </div>

      {/* Status and Details */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getProgressColor(percent)} animate-pulse`}></div>
          <span className={`text-sm font-medium ${
            percent >= 80 ? 'text-green-400' :
            percent >= 60 ? 'text-blue-400' :
            percent >= 40 ? 'text-yellow-400' :
            percent >= 20 ? 'text-orange-400' : 'text-red-400'
          }`}>
            {getStatusText(percent)}
          </span>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-slate-400">Completion</div>
          <div className="text-lg font-bold text-white">{percent}%</div>
        </div>
      </div>

      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-16 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
}
