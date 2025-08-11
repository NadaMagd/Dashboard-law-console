import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#8B5CF6", "#06B6D4", "#10B981", "#F59E0B"];

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-lg backdrop-blur-sm">
        <p className="text-white font-medium">{payload[0].name}</p>
        <p className="text-blue-400 font-bold">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

// Custom Legend Component
const CustomLegend = ({ payload }) => (
  <div className="flex justify-center gap-4 mt-4">
    {payload.map((entry, index) => (
      <div key={entry.value} className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: entry.color }}
        />
        <span className="text-slate-300 text-sm">{entry.value}</span>
      </div>
    ))}
  </div>
);

export default function UserDoughnutChart({ Accepted, Pending }) {
  const data = [
    { name: "Accepted", value: Accepted, color: "#10B981" },
    { name: "Pending", value: Pending, color: "#F59E0B" },
  ];

  const total = Accepted + Pending;

  return (
    <div className="card group hover:scale-105 transition-transform duration-300">
      <div className="card-header">
        <h3 className="card-title">Lawyers Status</h3>
        <p className="card-subtitle">Distribution of lawyer applications</p>
      </div>
      
      <div className="relative">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Stats */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{total}</div>
            <div className="text-sm text-slate-400">Total</div>
          </div>
        </div>
      </div>
    </div>
  );
}
