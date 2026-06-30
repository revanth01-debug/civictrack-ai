import { useEffect, useState } from "react";

function IssueHistory() {
const [issues, setIssues] = useState([]);
const [selectedIssue, setSelectedIssue] = useState(null);
const [severityFilter, setSeverityFilter] =
  useState("All");

const [statusFilter, setStatusFilter] =
  useState("All");

const [search, setSearch] = useState("");
  const fetchIssues = () => {
    fetch("http://localhost:5000/api/issues")
      .then((res) => res.json())
      .then((data) => {
  console.log(data);
  setIssues(data);
})
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:5000/api/issues/${id}`, 
        {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      fetchIssues();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
     <h1
  style={{
    marginBottom: "20px",
    fontSize: "30px",
    fontWeight: "bold",
  }}
>
  📋 Issue History ({issues.length})
</h1>
<div
  style={{
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
  }}
>
  <input
    type="text"
    placeholder="Search issue or location..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      padding: "10px",
    width: "350px",
background: "#0f172a",
color: "white",
border: "1px solid #334155",
      borderRadius: "8px",
    }}
  />

  <select
    value={statusFilter}
    onChange={(e) =>
      setStatusFilter(e.target.value)
    }
    style={{
      padding: "10px",
      borderRadius: "8px",
    }}
  >
    <option value="All">All Status</option>
    <option value="Pending">Pending</option>
    <option value="In Progress">In Progress</option>
    <option value="Resolved">Resolved</option>
  </select>
  <select
  value={severityFilter}
  onChange={(e) =>
    setSeverityFilter(e.target.value)
  }
  style={{
    padding: "10px",
    borderRadius: "8px",
  }}
>
  <option value="All">
    All Severity
  </option>

  <option value="Low">Low</option>

  <option value="Medium">
    Medium
  </option>

  <option value="High">
    High
  </option>

  <option value="Critical">
    Critical
  </option>
</select>
</div>
      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "15px",
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
         <thead>
  <tr
    style={{
      position: "sticky",
      top: 0,
      background: "#0f172a",
      zIndex: 10,
    }}
  >
              <th style={{ padding: "12px" }}>ID</th>
              <th style={{ padding: "12px" }}>Issue Type</th>
              <th style={{ padding: "12px" }}>Location</th>
              <th style={{ padding: "12px" }}>Status</th>
              <th style={{ padding: "12px" }}>Severity</th>
              <th style={{ padding: "12px" }}>Reported On</th>
              <th style={{ padding: "12px" }}>View</th>
              <th style={{ padding: "12px" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {issues.length > 0 ? (
           issues
.filter(
  (issue) =>
    !search ||
    issue.issueType
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||
    issue.location
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||
    issue.title
      ?.toLowerCase()
      .includes(search.toLowerCase())
)
  .filter(
    (issue) =>
      statusFilter === "All" ||
      issue.status === statusFilter
  )
  .filter(
  (issue) =>
    severityFilter === "All" ||
    issue.severity === severityFilter
)
.map((issue, index) => (
  <tr
    key={issue._id}
    style={{
      background:
        index % 2 === 0
          ? "#1e293b"
          : "#172033",
      transition: "0.3s",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background =
        "#273449";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background =
        index % 2 === 0
          ? "#1e293b"
          : "#172033";
    }}
  >
                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #334155",
                    }}
                  >
                    {issue._id.slice(-5)}
                  </td>

                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #334155",
                    }}
                  >
                    {issue.issueType}
                  </td>

                <td
  style={{
    padding: "15px",
    maxWidth: "220px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }}
  title={issue.location}
>
  {issue.location}
</td>

                 <td style={{ padding: "15px" }}>
  <span
    style={{
      background:
        issue.status === "Resolved"
          ? "#16a34a"
          : issue.status === "In Progress"
          ? "#0ea5e9"
          : "#f59e0b",

      color: "white",
      padding: "6px 14px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600",
    }}
  >
    {issue.status}
  </span>
</td>
                 <td style={{ padding: "15px" }}>
  <span
    style={{
      background:
        issue.severity === "Critical"
          ? "#dc2626"
          : issue.severity === "High"
          ? "#ea580c"
          : issue.severity === "Medium"
          ? "#ca8a04"
          : "#16a34a",

      color: "white",
      padding: "6px 14px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600",
    }}
  >
    {issue.severity}
  </span>
</td>

                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #334155",
                    }}
                  >
                    {new Date(issue.createdAt).toLocaleDateString()}
                  </td>

                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #334155",
                    }}
                  > <button
    onClick={() => setSelectedIssue(issue)}
    style={{
      background: "#2563eb",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "6px",
      cursor: "pointer",
    }}
  >
    👁 View
  </button>
</td>

<td
  style={{
    padding: "12px",
    borderBottom: "1px solid #334155",
  }}
>
  <select
    value={issue.status}
    onChange={(e) =>
      updateStatus(issue._id, e.target.value)
    }
    style={{
      padding: "8px",
      borderRadius: "6px",
    }}
  >
    <option value="Pending">Pending</option>
    <option value="In Progress">In Progress</option>
    <option value="Resolved">Resolved</option>
  </select>
</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ padding: "20px" }}>
                  📭 No Issues Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedIssue && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
  >
    <div
      style={{
        background: "#1e293b",
        padding: "25px",
        borderRadius: "15px",
        width: "700px",
        maxHeight: "80vh",
        overflowY: "auto",
      }}
    >
      <h2
  style={{
    fontSize: "24px",
    marginBottom: "15px",
    color: "#60a5fa",
  }}
>
  📋 Issue Details
</h2>

      <p><strong>Title:</strong> {selectedIssue.title}</p>

      <p><strong>Issue Type:</strong> {selectedIssue.issueType}</p>

      <p><strong>Description:</strong> {selectedIssue.description}</p>
      {selectedIssue.image && (
  <div style={{ margin: "15px 0" }}>
    <img
      src={`http://localhost:5000/uploads/${selectedIssue.image}`}
      alt="Issue"
      style={{
        width: "100%",
        maxHeight: "300px",
        objectFit: "cover",
        borderRadius: "10px",
      }}
    />
  </div>
)}

      <p><strong>Location:</strong> {selectedIssue.location}</p>

      <p><strong>Severity:</strong> {selectedIssue.severity}</p>

      <p><strong>Status:</strong> {selectedIssue.status}</p>

      <p><strong>Latitude:</strong> {selectedIssue.latitude}</p>

      <p><strong>Longitude:</strong> {selectedIssue.longitude}</p>

      <p>
        <strong>Suggested Action:</strong>{" "}
        {selectedIssue.suggestedAction}
      </p>

      <p>
        <strong>Reported On:</strong>{" "}
        {new Date(
          selectedIssue.createdAt
        ).toLocaleString()}
      </p>

      <button
        onClick={() =>
          setSelectedIssue(null)
        }
        style={{
          marginTop: "20px",
          background: "#dc2626",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Close
      </button>
    </div>
  </div>
)}
    </div>
  );
}

export default IssueHistory;