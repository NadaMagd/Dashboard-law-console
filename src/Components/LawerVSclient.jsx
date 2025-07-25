import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  plugins: {
    title: {
      display: true,
      text: "Lawyer vs Client Statistics",
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: function (context) {
          return `${context.dataset.label}: ${context.parsed.y}`;
        },
      },
    },
    legend: {
      position: "top",
    },
  },
  animation: {
    duration: 1500,
    easing: "easeOutBounce",
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Months",
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Count",
      },
    },
  },
};

export default function LawyerVSClientBarChart({ Clients, Lawyers }) {
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"], // تقدر تغيرها حسب الداتا الفعلية
    datasets: [
      {
        label: "Lawyer",
        data: Array.isArray(Lawyers) ? Lawyers : [Lawyers],
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderRadius: 5,
      },
      {
        label: "Client",
        data: Array.isArray(Clients) ? Clients : [Clients],
        backgroundColor: "rgba(255, 99, 132, 0.7)",
        borderRadius: 5,
      },
    ],
  };

  return <Bar options={options} data={chartData} />;
}
