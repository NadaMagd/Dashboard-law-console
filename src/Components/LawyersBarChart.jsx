import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function LawyersBarChart({ Clients, Lawyers }) {
  const data = [
    { name: "Clients", value: Clients, color: "#3b82f6" },
    { name: "Lawyers", value: Lawyers, color: "#8b5cf6" },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-lg">
          <p className="text-white font-semibold">{label}</p>
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
            className="w-4 h-4 rounded-lg" 
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
        <h3 className="card-title">Users Status</h3>
        <p className="card-subtitle">Distribution of clients and lawyers</p>
      </div>
      
      <div className="relative">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <YAxis 
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="value"
              radius={[8, 8, 0, 0]}
              barSize={60}
            >
              {data.map((entry, index) => (
                <Bar
                  key={`bar-${index}`}
                  dataKey="value"
                  fill={entry.color}
                  radius={[8, 8, 0, 0]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
        {/* Center Stats */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {Clients + Lawyers}
            </div>
            <div className="text-sm text-slate-400">Total Users</div>
          </div>
        </div>
      </div>
      
      <CustomLegend payload={data.map(item => ({ value: item.name, color: item.color }))} />
    </div>
  );
}
