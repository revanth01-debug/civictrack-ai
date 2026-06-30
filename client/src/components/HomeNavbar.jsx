import { Link } from "react-router-dom";

function HomeNavbar() {
  return (
    <nav
      style={{
        height: "80px",
        background: "rgba(2,6,23,0.9)",
backdropFilter: "blur(10px)",
        borderBottom: "1px solid #1e293b",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 50px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <div>
        <h1
          style={{
            color: "#3b82f6",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          🛡️ CivicTrack AI
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "32px",
          }}
        >
          Smart Community Monitoring
        </p>
      </div>

      {/* Menu */}
      <div
        style={{
          display: "flex",
          gap: "35px",
          alignItems: "center",
        }}
      >
        <a href="#features" style={linkStyle}>
          Features
        </a>

        <a href="#stats" style={linkStyle}>
          Statistics
        </a>

        <Link to="/map" style={linkStyle}>
          Community Map
        </Link>

{localStorage.getItem("isAdmin") ? (
  <>
   <Link
  to="/dashboard"
  style={{
    background: "#2563eb",
    color: "white",
    padding: "10px 18px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
    boxShadow: "0 4px 10px rgba(37,99,235,0.4)",
  }}
>
  Dashboard
</Link>
<Link to="/home" style={linkStyle}>
  Home
</Link>
    <button
      onClick={() => {
        localStorage.removeItem("isAdmin");
        window.location.href = "/home";
      }}
      style={{
        background: "transparent",
        border: "none",
        color: "white",
        cursor: "pointer",
        fontWeight: "500",
      }}
    >
      Logout
    </button>
  </>
) : (
  <Link to="/login" style={linkStyle}>
    Login
  </Link>
)}
<Link
  to="/report"
  style={{
    background: "#2563eb",
    color: "white",
    padding: "10px 20px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
  }}
>
  Report Issue →
</Link>
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "500",
  transition: "0.3s",
};

export default HomeNavbar;