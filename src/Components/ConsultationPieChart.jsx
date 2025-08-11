import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"];

export default function ConsultationPieChart({ accepted, pending }) {
  const data = [
    { name: "Accepted", value: accepted, color: "#10b981" },
    { name: "Pending", value: pending, color: "#f59e0b" },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-lg">
          <p className="text-white font-semibold">{payload[0].name}</p>
          <p className="text-slate-300">
            Count: <span className="text-blue-400 font-bold">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry, index) => (
        <div key={entry.value} className="flex items-center gap-2">
          <div 
            className="w-4 h-4 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-slate-300">{entry.value}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="card text-center">
      <div className="card-header">
        <h3 className="card-title">Consultations Status</h3>
        <p className="card-subtitle">Overview of consultation requests</p>
      </div>
      
      <div className="relative">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke={entry.color}
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Stats */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {accepted + pending}
            </div>
            <div className="text-sm text-slate-400">Total</div>
          </div>
        </div>
      </div>
      
      <CustomLegend payload={data.map(item => ({ value: item.name, color: item.color }))} />
    </div>
  );
}
