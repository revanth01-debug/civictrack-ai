import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import RecentIssues from "../components/RecentIssues";
import IssueAnalytics from "../components/IssueAnalytics";
import IssueCharts from "../components/IssueCharts";
import DownloadReport from "../components/DownloadReport";
function Dashboard() {
  const [stats, setStats] = useState({
  total: 0,
  pending: 0,
  inProgress: 0,
  resolved: 0,
  critical: 0,
});
  const [resolutionRate, setResolutionRate] =
    useState(0);
const [issues, setIssues] = useState([]);
const [topIssue, setTopIssue] = useState("");
const [notifications, setNotifications] = useState(0);
  const fetchStats = () => {
    fetch("http://localhost:5000/api/issues")
      .then((res) => res.json())
      .then((data) => {
        setNotifications(
  data.filter(
    (issue) => issue.status === "Pending"
  ).length
);
        setIssues(data);
        const counts = {};

data.forEach((issue) => {
  counts[issue.issueType] =
    (counts[issue.issueType] || 0) + 1;
});

const mostReported =
  Object.keys(counts).length > 0
    ? Object.keys(counts).reduce((a, b) =>
        counts[a] > counts[b] ? a : b
      )
    : "No Issues";

setTopIssue(
  `${mostReported} (${counts[mostReported] || 0} Reports)`
);
const resolutionRate =
  data.length > 0
    ? Math.round(
        (data.filter(
          (issue) => issue.status === "Resolved"
        ).length /
          data.length) *
          100
      )
    : 0;

setResolutionRate(resolutionRate);
        setStats({
          total: data.length,
          pending: data.filter(
            (issue) => issue.status === "Pending"
          ).length,
          

          inProgress: data.filter(
            (issue) => issue.status === "In Progress"
          ).length,

          resolved: data.filter(
            (issue) => issue.status === "Resolved"
          ).length,

        critical: data.filter(
  (issue) =>
    issue.severity === "Critical" ||
    issue.severity === "High"
).length,
        });
      })
      .catch((err) => console.log(err));
  };

useEffect(() => {
  fetchStats();

  const interval = setInterval(() => {
    fetchStats();
  }, 5000);

  return () => clearInterval(interval);
}, []);
  const cards = [
    {
      title: "Total Issues",
      value: stats.total,
      icon: "📊",
    },
    {
      title: "Pending Issues",
      value: stats.pending,
      icon: "⏳",
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      icon: "🚧",
    },
    {
      title: "Resolved Issues",
      value: stats.resolved,
      icon: "✅",
    },
    {
      title: "Critical Issues",
      value: stats.critical,
      icon: "🚨",
    },
    {
  title: "Resolution Rate",
  value: `${resolutionRate}%`,
  icon: "🏆",
},
  ];

 return (
  <Layout>
    <div
  style={{
    padding: "20px",
    maxWidth: "1600px",
    margin: "0 auto",
  }}
>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "34px",
              fontWeight: "700",
              color: "white",
            }}
          >
            CivicTrack AI Dashboard
      
          </h1>
          <div
  style={{
    background: "#1e293b",
    padding: "20px",
    borderRadius: "15px",
    marginBottom: "20px",
  }}
>
  <h2>👋 Welcome Back, Revanth</h2>

  <p
    style={{
      color: "#94a3b8",
      marginTop: "10px",
    }}
  >
    Monitor community complaints,
    track AI analysis, and manage
    citizen reports in real time.
  </p>
</div>
          <div
>
  <p
    style={{
      color: "#94a3b8",
      marginTop: "10px",
    }}
  >
    Monitor community complaints,
    track AI analysis, and manage
    citizen reports in real time.
  </p>
</div>

          <p
            style={{
              color: "#94a3b8",
              marginTop: "5px",
              fontSize: "14px",
            }}
          >
            {new Date().toDateString()}
          </p>

          <p
            style={{
              color: "#94a3b8",
              marginTop: "8px",
              fontSize: "16px",
            }}
          >
            Monitor and manage community issues in real time.
          </p>
        </div>

        <button
          onClick={fetchStats}
          style={{
            padding: "12px 22px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🔄 Refresh
        </button>
      </div>

      {/* Cards */}
   <div
  style={{
    display: "grid",
    gridTemplateColumns:
  "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "30px",
  }}
>
        {cards.map((item, index) => (
      <div
  key={index}
  style={{
    background: "...",
    borderRadius: "18px",
    padding: "25px",
    cursor: "pointer",
    transition: "0.3s",
  }}

  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      "translateY(-8px)";
  }}

  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      "translateY(0)";
  }}
>
<div
  style={{
    fontSize: "30px",
    marginBottom: "15px",
  }}
>
  {item.icon}
</div>

            <h2
              style={{
                fontSize: "34px",
                marginBottom: "10px",
              }}
            >
              {item.value}
            </h2>

            <p
              style={{
                color: "#94a3b8",
                fontSize: "15px",
              }}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* Most Reported Issue */}
      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "15px",
          marginBottom: "20px",
        }}
      >
        <h2>🏆 Most Reported Issue</h2>

        <p
          style={{
            fontSize: "20px",
            marginTop: "10px",
            color: "#22c55e",
            fontWeight: "bold",
          }}
        >
          {topIssue}
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <DownloadReport issues={issues} />
      </div>

      <RecentIssues />

      <IssueAnalytics />

      <IssueCharts />
    </div>
  </Layout>
);
}

export default Dashboard;