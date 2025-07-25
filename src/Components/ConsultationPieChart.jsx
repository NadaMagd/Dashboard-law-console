import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const COLORS = ["#c9b38c", "#687693"];

export default function ConsultationPieChart({ accepted, pending }) {
  const data = [
    { name: "Accepted", value: accepted },
    { name: "Pending", value: pending },
  ];

  return (
    <div>
      <h3 className="text-lg font-bold mb-4 goldTxt ">
        Consultations Status
      </h3>
      <PieChart width={300} height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          label
          outerRadius={80}
          fill="#8884d8"
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
