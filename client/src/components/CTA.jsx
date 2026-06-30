import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function CTA() {
  return (
    <section
      style={{
        padding: "120px 8%",
        textAlign: "center",
        background:
          "linear-gradient(135deg,#2563eb,#1d4ed8)",
      }}
    >
      {/* Stats */}
     <div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "80px",
    marginBottom: "80px",
    flexWrap: "wrap",
  }}
>
  <div>
    <h3 style={{ fontSize: "72px",maxWidth: "1000px",margin: "0 auto 30px", color: "white" }}>
      500+
    </h3>
    <p style={{ color: "#dbeafe" }}>
      Issues Reported
    </p>
  </div>

  <div>
    <h3 style={{ fontSize: "72px",maxWidth: "1000px",margin: "0 auto 30px", color: "white" }}>
      120+
    </h3>
    <p style={{ color: "#dbeafe" }}>
      Issues Resolved
    </p>
  </div>

  <div>
    <h3 style={{ fontSize: "72px", maxWidth: "1000px",margin: "0 auto 30px",color: "white" }}>
      15+
    </h3>
    <p style={{ color: "#dbeafe" }}>
      Communities Covered
    </p>
  </div>
</div>

      {/* Heading */}
      <h2
        style={{
          fontSize: "56px",
          marginBottom: "25px",
          color: "white",
          fontWeight: "bold",
        }}
      >
        🚀 Ready to Improve Your Community?
      </h2>

      {/* Description */}
      <p
        style={{
          color: "#dbeafe",
          maxWidth: "800px",
          margin: "0 auto 50px",
          fontSize: "22px",
          lineHeight: "1.8",
        }}
      >
        Report civic issues, track complaint
        progress, and help local authorities
        build cleaner, safer, and smarter
        communities with AI-powered monitoring.
      </p>

      {/* Button */}
      <Link
        to="/report"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          background: "white",
          color: "#2563eb",
          padding: "18px 40px",
          borderRadius: "14px",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "18px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        Report an Issue
        <FaArrowRight />
      </Link>
    </section>
  );
}

export default CTA;