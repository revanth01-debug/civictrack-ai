import { useEffect, useState } from "react";

function IssueAnalytics() {
  const [stats, setStats] = useState({
    potholes: 0,
    garbage: 0,
    streetLights: 0,
  });

  const [analytics, setAnalytics] = useState({
    topArea: "N/A",
    topIssue: "N/A",
    critical: 0,
    resolutionRate: 0,
  });

  useEffect(() => {
    fetch("https://civictrack-ai-3.onrender.com/api/issues")
      .then((res) => res.json())
      .then((data) => {
        const total = data.length || 1;

        const potholes = data.filter(
          (issue) =>
            issue.issueType?.toLowerCase() === "pothole"
        ).length;

        const garbage = data.filter(
          (issue) =>
            issue.issueType?.toLowerCase() === "garbage"
        ).length;

        const streetLights = data.filter(
          (issue) =>
            issue.issueType?.toLowerCase() === "street light"
        ).length;

        setStats({
          potholes: Math.round((potholes / total) * 100),
          garbage: Math.round((garbage / total) * 100),
          streetLights: Math.round((streetLights / total) * 100),
        });

        const locations = {};
        const issueCounts = {};

        data.forEach((issue) => {
          locations[issue.location] =
            (locations[issue.location] || 0) + 1;

          issueCounts[issue.issueType] =
            (issueCounts[issue.issueType] || 0) + 1;
        });

        const topArea =
          Object.keys(locations).length > 0
            ? Object.keys(locations).reduce((a, b) =>
                locations[a] > locations[b] ? a : b
              )
            : "N/A";

        const topIssue =
          Object.keys(issueCounts).length > 0
            ? Object.keys(issueCounts).reduce((a, b) =>
                issueCounts[a] > issueCounts[b] ? a : b
              )
            : "N/A";

        setAnalytics({
          topArea,
          topIssue,
          critical: data.filter(
            (issue) =>
              issue.severity === "Critical"
          ).length,

          resolutionRate: Math.round(
            (
              data.filter(
                (issue) =>
                  issue.status === "Resolved"
              ).length /
              total
            ) * 100
          ),
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      style={{
        marginTop: "30px",
        background: "#1e293b",
        padding: "25px",
        borderRadius: "15px",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          fontSize: "24px",
        }}
      >
        📈 Issue Analytics
      </h2>

      {/* KPI Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "#0f172a",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h4>📍 Most Reported Area</h4>
          <p
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            {analytics.topArea}
          </p>
        </div>

        <div
          style={{
            background: "#0f172a",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h4>🗑 Most Common Issue</h4>
          <p
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            {analytics.topIssue}
          </p>
        </div>

        <div
          style={{
            background: "#0f172a",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h4>🚨 Critical Issues</h4>
          <p
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            {analytics.critical}
          </p>
        </div>

        <div
          style={{
            background: "#0f172a",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h4>🏆 Resolution Rate</h4>
          <p
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            {analytics.resolutionRate}%
          </p>
        </div>
      </div>

      {/* Progress Bars */}

      <p>🕳️ Potholes - {stats.potholes}%</p>
      <div
        style={{
          height: "10px",
          background: "#2563eb",
          width: `${stats.potholes}%`,
          borderRadius: "10px",
          marginBottom: "15px",
        }}
      />

      <p>🗑️ Garbage - {stats.garbage}%</p>
      <div
        style={{
          height: "10px",
          background: "#22c55e",
          width: `${stats.garbage}%`,
          borderRadius: "10px",
          marginBottom: "15px",
        }}
      />

      <p>💡 Street Lights - {stats.streetLights}%</p>
      <div
        style={{
          height: "10px",
          background: "#f59e0b",
          width: `${stats.streetLights}%`,
          borderRadius: "10px",
        }}
      />
    </div>
  );
}

export default IssueAnalytics;