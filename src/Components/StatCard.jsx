export default function StatCard({ title, value, icon }) {
  return (
    <div className="card group hover:scale-105 transition-all duration-300 cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-slate-400 mb-2 uppercase tracking-wide">
            {title}
          </h3>
          <div className="text-3xl font-bold text-white mb-2">
            {value.toLocaleString()}
          </div>
          <div className="flex items-center text-sm text-slate-400">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            Active
          </div>
        </div>
        
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
          <div className="text-2xl text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
            {icon}
          </div>
        </div>
      </div>
      
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-16 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
}
