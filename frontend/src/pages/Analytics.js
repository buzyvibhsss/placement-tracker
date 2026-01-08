import Layout from "../components/Layout";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Analytics({ companies }) {
  const statusCount = {
    Applied: 0,
    Interview: 0,
    Selected: 0,
    Rejected: 0
  };

  companies.forEach(c => {
    statusCount[c.status]++;
  });

  const pieData = {
    labels: ["Applied", "Interview", "Selected", "Rejected"],
    datasets: [
      {
        data: [
          statusCount.Applied,
          statusCount.Interview,
          statusCount.Selected,
          statusCount.Rejected
        ],
        backgroundColor: ["#93c5fd", "#fde68a", "#86efac", "#fca5a5"]
      }
    ]
  };

  const barData = {
    labels: ["Applied", "Interview", "Selected", "Rejected"],
    datasets: [
      {
        label: "Applications",
        data: [
          statusCount.Applied,
          statusCount.Interview,
          statusCount.Selected,
          statusCount.Rejected
        ],
        backgroundColor: "#6366f1"
      }
    ]
  };

  return (
    <Layout>
      {/* Header */}
      <div style={{ marginBottom: "20px" }}>
        <h1>Analytics</h1>
        <p style={{ color: "#6b7280" }}>
          Visual overview of your placement progress
        </p>
      </div>

      {/* Charts */}
      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        {/* Pie Chart */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            width: "350px",
            boxShadow: "0 10px 20px rgba(0,0,0,0.08)"
          }}
        >
          <h5 style={{ marginBottom: "15px" }}>Status Distribution</h5>
          <Pie data={pieData} />
        </div>

        {/* Bar Chart */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            width: "450px",
            boxShadow: "0 10px 20px rgba(0,0,0,0.08)"
          }}
        >
          <h5 style={{ marginBottom: "15px" }}>Applications Count</h5>
          <Bar data={barData} />
        </div>
      </div>
    </Layout>
  );
}

export default Analytics;
