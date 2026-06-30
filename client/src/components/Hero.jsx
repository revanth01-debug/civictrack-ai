import { FaArrowRight, FaMapMarkedAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      style={{
        minHeight: "75vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 8%",
        background: "radial-gradient(circle at top,#1e40af22,#020617)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gap: "60px",
          width: "100%",
          maxWidth: "1400px",
        }}
      >
        {/* Left */}
        <div>
          <span
            style={{
              color: "#38bdf8",
              fontWeight: "bold",
              letterSpacing: "2px",
            }}
          >
            AI Powered Smart Governance
          </span>

          <h1
            style={{
              fontSize: "64px",
              marginTop: "20px",
              lineHeight: "1.1",
            }}
          >AI-Powered Civic
Issue Management
Platform
          </h1>

          <p
            style={{
              color: "#94a3b8",
              marginTop: "25px",
              fontSize: "20px",
              lineHeight: "1.8",
            }}
          >
            CivicTrack AI enables citizens to report public issues,
track complaint status in real time, and assist authorities
with AI-powered analytics for faster resolution.
          </p>
<div
  style={{
    display: "flex",
    gap: "25px",
    marginTop: "30px",
    color: "#22c55e",
    fontWeight: "600",
  }}
>
  <span>✓ AI Classification</span>
  <span>✓ Live Tracking</span>
  <span>✓ Analytics Dashboard</span>
</div>
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "40px",
            }}
          >
            <Link
              to="/report"
              style={{
                background: "#2563eb",
                color: "white",
                padding: "15px 28px",
                borderRadius: "12px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Report Issue <FaArrowRight />
            </Link>

            <Link
              to="/map"
              style={{
                border: "1px solid #334155",
                color: "white",
                padding: "15px 28px",
                borderRadius: "12px",
                textDecoration: "none",
              }}
            >
              <FaMapMarkedAlt /> Explore Map
            </Link>
          </div>
        </div>

        {/* Right */}
        <div
          style={{
            textAlign: "center",
          }}
        >
       <img
  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
  alt="Dashboard"
            style={{
              width: "100%",
              maxWidth: "550px",
              borderRadius: "16px",
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;