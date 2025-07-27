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
    { name: "Clients", value: Clients },
    { name: "Lawyers", value: Lawyers },
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-lg font-bold mb-4 goldTxt text-center">
        Users Status
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#687693" radius={[4, 4, 0, 0]} barSize={65} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
