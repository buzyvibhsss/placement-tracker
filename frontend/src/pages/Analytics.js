import { useEffect, useState } from "react";
import axios from "axios";
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

const API = "http://localhost:5000";

function Analytics() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/companies`)
      .then(res => setCompanies(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.log(err));
  }, []);

  const statusCount = {
    Applied: 0,
    OA: 0,
    Interview: 0,
    Offer: 0,
    Rejected: 0
  };

  companies.forEach(c => {
    if (statusCount[c.status] !== undefined) {
      statusCount[c.status]++;
    }
  });

  const pieData = {
    labels: Object.keys(statusCount),
    datasets: [
      {
        data: Object.values(statusCount),
        backgroundColor: [
          "#93c5fd",
          "#fde68a",
          "#a7f3d0",
          "#86efac",
          "#fca5a5"
        ]
      }
    ]
  };

  const barData = {
    labels: Object.keys(statusCount),
    datasets: [
      {
        label: "Applications",
        data: Object.values(statusCount),
        backgroundColor: "#6366f1"
      }
    ]
  };

  return (
    <div>
      <h1>Analytics</h1>
      <p style={{ color: "#6b7280", marginBottom: "20px" }}>
        Visual overview of your placement progress
      </p>

      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            width: "350px",
            boxShadow: "0 10px 20px rgba(0,0,0,0.08)"
          }}
        >
          <h5>Status Distribution</h5>
          <Pie data={pieData} />
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            width: "450px",
            boxShadow: "0 10px 20px rgba(0,0,0,0.08)"
          }}
        >
          <h5>Applications Count</h5>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
}

export default Analytics;
