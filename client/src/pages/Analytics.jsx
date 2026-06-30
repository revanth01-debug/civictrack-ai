import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function Analytics() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    critical: 0,
    inProgress: 0,
  });

  const [chartData, setChartData] = useState([]);

  const COLORS = ["#f59e0b", "#0ea5e9", "#16a34a"];

  useEffect(() => {
    fetch("https://civictrack-ai-3.onrender.com/api/issues")
      .then((res) => res.json())
      .then((data) => {
        const pending = data.filter(
          (issue) => issue.status === "Pending"
        ).length;

        const inProgress = data.filter(
          (issue) => issue.status === "In Progress"
        ).length;

        const resolved = data.filter(
          (issue) => issue.status === "Resolved"
        ).length;

        const critical = data.filter(
          (issue) =>
            issue.severity === "Critical" ||
            issue.severity === "High"
        ).length;

        setStats({
          total: data.length,
          pending,
          resolved,
          critical,
          inProgress,
        });

        setChartData([
          {
            name: "Pending",
            value: pending,
          },
          {
            name: "In Progress",
            value: inProgress,
          },
          {
            name: "Resolved",
            value: resolved,
          },
        ]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <h1
          style={{
            fontSize: "34px",
            fontWeight: "700",
            marginBottom: "30px",
          }}
        >
          📊 Analytics Dashboard
        </h1>

        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              background: "#1e293b",
              padding: "25px",
              borderRadius: "15px",
            }}
          >
            <h3>Total Issues</h3>
            <h1>{stats.total}</h1>
          </div>

          <div
            style={{
              background: "#1e293b",
              padding: "25px",
              borderRadius: "15px",
            }}
          >
            <h3>Pending Issues</h3>
            <h1>{stats.pending}</h1>
          </div>

          <div
            style={{
              background: "#1e293b",
              padding: "25px",
              borderRadius: "15px",
            }}
          >
            <h3>In Progress</h3>
            <h1>{stats.inProgress}</h1>
          </div>

          <div
            style={{
              background: "#1e293b",
              padding: "25px",
              borderRadius: "15px",
            }}
          >
            <h3>Resolved Issues</h3>
            <h1>{stats.resolved}</h1>
          </div>

          <div
            style={{
              background: "#1e293b",
              padding: "25px",
              borderRadius: "15px",
            }}
          >
            <h3>Critical Issues</h3>
            <h1>{stats.critical}</h1>
          </div>
        </div>

        {/* Summary */}
        <div
          style={{
            background: "#1e293b",
            padding: "25px",
            borderRadius: "15px",
            marginBottom: "30px",
          }}
        >
          <h2>📈 Analytics Summary</h2>

          <p>Total Issues Reported: {stats.total}</p>
          <p>Pending Issues: {stats.pending}</p>
          <p>In Progress Issues: {stats.inProgress}</p>
          <p>Resolved Issues: {stats.resolved}</p>
          <p>Critical Issues: {stats.critical}</p>
        </div>

        {/* Charts */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(450px,1fr))",
            gap: "20px",
          }}
        >
          {/* Pie Chart */}
          <div
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "15px",
              height: "450px",
            }}
          >
            <h2>📊 Issue Status Distribution</h2>

            <ResponsiveContainer
              width="100%"
              height="90%"
            >
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  dataKey="value"
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[index % COLORS.length]
                      }
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "15px",
              height: "450px",
            }}
          >
            <h2>📈 Status Comparison</h2>

            <ResponsiveContainer
              width="100%"
              height="90%"
            >
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#2563eb"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Analytics;