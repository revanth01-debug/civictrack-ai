import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function IssueCharts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/issues")
      .then((res) => res.json())
      .then((issues) => {
        const pending = issues.filter(
          (i) => i.status === "Pending"
        ).length;

        const progress = issues.filter(
          (i) => i.status === "In Progress"
        ).length;

        const resolved = issues.filter(
          (i) => i.status === "Resolved"
        ).length;

        setData([
          { name: "Pending", value: pending },
          { name: "In Progress", value: progress },
          { name: "Resolved", value: resolved },
        ]);
      });
  }, []);

  const COLORS = ["#f59e0b", "#0ea5e9", "#16a34a"];

  return (
    <div
      style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "15px",
        marginTop: "30px",
      }}
    >
      <h2>📊 Issue Status Analytics</h2>

      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={140}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default IssueCharts;