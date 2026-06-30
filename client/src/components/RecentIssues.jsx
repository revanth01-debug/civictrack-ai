import { useEffect, useState } from "react";

function RecentIssues() {
const [issues, setIssues] = useState([]);
const [selectedIssue, setSelectedIssue] = useState(null);
const [search, setSearch] = useState("");
const [filterStatus, setFilterStatus] = useState("All");
const deleteIssue = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this issue?"
  );

  if (!confirmDelete) return;

  try {
    await fetch(`https://civictrack-ai-3.onrender.com/api/issues/${id}`, {
      method: "DELETE",
    });

    setIssues((prev) =>
      prev.filter((issue) => issue._id !== id)
    );

    alert("Issue Deleted Successfully");
  } catch (error) {
    console.error(error);
    alert("Delete Failed");
  }
};
const updateStatus = async (id, status) => {
  try {
    const response = await fetch(
      `https://civictrack-ai-3.onrender.com/api/issues/${id}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    if (!response.ok) {
      throw new Error("Status update failed");
    }

    setIssues((prev) =>
      prev.map((issue) =>
        issue._id === id
          ? { ...issue, status }
          : issue
      )
    );
  } catch (error) {
    console.error(error);
    alert("Update Failed");
  }
};
const fetchIssues = () => {
  fetch("https://civictrack-ai-3.onrender.com/api/issues")
    .then((res) => res.json())
    .then((data) => {
      setIssues(data.slice(0, 5));
    })
    .catch((err) => console.log(err));
};

useEffect(() => {
  fetchIssues();

  const interval = setInterval(() => {
    fetchIssues();
  }, 5000);

  return () => clearInterval(interval);
}, []);
  return (
    <div
      style={{
        marginTop: "30px",
        background: "#1e293b",
        padding: "20px",
        borderRadius: "15px",
      }}
    >
      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  }}
>
  <div>
    <h2
      style={{
        fontSize: "26px",
        color: "white",
        marginBottom: "5px",
      }}
    >
      📋 Recent Community Issues
    </h2>

    <p
      style={{
        color: "#94a3b8",
        fontSize: "14px",
      }}
    >
      Latest complaints reported by citizens.
    </p>
  </div>
</div>
<input
  type="text"
  placeholder="🔍 Search Issues..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "none",
     background: "#0f172a",
    color: "white",
  }}
/>
<select
  value={filterStatus}
  onChange={(e) => setFilterStatus(e.target.value)}
  style={{
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "20px",
    marginLeft: "10px",
  }}
>
  <option value="All">All Issues</option>
  <option value="Pending">Pending</option>
  <option value="In Progress">In Progress</option>
  <option value="Resolved">Resolved</option>
</select>
      <table
        style={{
          width: "100%",
          marginTop: "20px",
          borderCollapse: "collapse",
        }}
      >
      <thead>
  <tr
    style={{
      borderBottom: "2px solid #334155",
      color: "#cbd5e1",
    }}
  >
    <th style={{ padding: "15px" }}>Image</th>

    <th style={{ padding: "15px" }}>Title</th>

    <th style={{ padding: "15px" }}>Issue Type</th>

    <th style={{ padding: "15px" }}>Location</th>

    <th style={{ padding: "15px" }}>Severity</th>

    <th style={{ padding: "15px" }}>Status</th>

    <th style={{ padding: "15px" }}>Reported On</th>

    <th style={{ padding: "15px" }}>Actions</th>
  </tr>
</thead>

        <tbody>
          {issues.length > 0 ? (
            issues
 .filter(
  (issue) =>
    issue.title
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    issue.issueType
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    issue.location
      .toLowerCase()
      .includes(search.toLowerCase())
)
  .filter((issue) => {
    if (filterStatus === "All") return true;
    return issue.status === filterStatus;
  })
  .map((issue, index) => (
             <tr
  key={issue._id}
  style={{
    background:
      index % 2 === 0
        ? "#1e293b"
        : "#172033",
    borderBottom: "1px solid #334155",
  }}
  
><td style={{ padding: "15px" }}>
  {issue.image ? (
    <img
      src={`https://civictrack-ai-3.onrender.com/uploads/${issue.image}`}
      alt="Issue"
      style={{
        width: "80px",
        height: "80px",
        objectFit: "cover",
        borderRadius: "8px",
      }}
    />
  ) : (
    <span>No Image</span>
  )}
</td>
  <td style={{ padding: "15px" }}>
  {issue.title}
</td>

<td style={{ padding: "15px" }}>
  {issue.issueType}
</td>

<td style={{ padding: "15px" }}>
  {issue.location}
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
      fontSize: "13px",
      fontWeight: "600",
    }}
  >
    {issue.severity}
  </span>
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
      fontSize: "13px",
      fontWeight: "600",
    }}
  >
    {issue.status}
  </span>
</td>
<td style={{ padding: "15px" }}>
  {new Date(issue.createdAt).toLocaleDateString()}
</td>

<td style={{ padding: "15px" }}>
<div style={{ display: "flex", gap: "8px" }}>

  <button
    onClick={() => setSelectedIssue(issue)}
    style={{
      background: "#2563eb",
      color: "white",
      border: "none",
      padding: "6px 10px",
      borderRadius: "6px",
      cursor: "pointer",
    }}
  >
    👁
  </button>

  <button
    onClick={() =>
      updateStatus(issue._id, "In Progress")
    }
    style={{
    
      background: "#f59e0b",
      color: "white",
      border: "none",
      padding: "6px 10px",
      borderRadius: "6px",
      cursor: "pointer",
    }}
  >
    🚧
  </button>

  <button
    onClick={() =>
      updateStatus(issue._id, "Resolved")
    }
    style={{
      background: "#16a34a",
      color: "white",
      border: "none",
      padding: "6px 10px",
      borderRadius: "6px",
      cursor: "pointer",
    }}
  >
    ✅
  </button>

  <button
    onClick={() => deleteIssue(issue._id)}
    style={{
      background: "#dc2626",
      color: "white",
      border: "none",
      padding: "6px 10px",
      borderRadius: "6px",
      cursor: "pointer",
    }}
  >
    🗑
  </button>

</div>
</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ padding: "20px" }}>
            📭 No community issues have been reported yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
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
        width: "600px",
      }}
    >
      <h2>📋 Issue Details</h2>

      <p><b>Title:</b> {selectedIssue.title}</p>
      <p><b>Issue Type:</b> {selectedIssue.issueType}</p>
      <p><b>Description:</b> {selectedIssue.description}</p>
      {selectedIssue.image && (
  <div style={{ margin: "15px 0" }}>
    <img
      src={`https://civictrack-ai-3.onrender.com/uploads/${selectedIssue.image}`}
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
      <p><b>Location:</b> {selectedIssue.location}</p>
      <p><b>Severity:</b> {selectedIssue.severity}</p>
      <p><b>Status:</b> {selectedIssue.status}</p>
      <p><b>Latitude:</b> {selectedIssue.latitude}</p>
      <p><b>Longitude:</b> {selectedIssue.longitude}</p>
      <p>
        <b>Suggested Action:</b>{" "}
        {selectedIssue.suggestedAction}
      </p>

      <button
        onClick={() => setSelectedIssue(null)}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#dc2626",
          color: "white",
          border: "none",
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

export default RecentIssues;