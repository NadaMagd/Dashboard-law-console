import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#763CAC", "#8B7AA4"];

export default function UserDoughnutChart({ Accepted, Pending }) {
  const data = [
    { name: "Accepted", value: Accepted },
    { name: "Pending", value: Pending },
  ];

  return (
    <div>
      <h3 className="text-center text-lg font-bold mb-4">Lawyers</h3>
      <PieChart width={300} height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
