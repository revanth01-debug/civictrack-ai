import {
  FaRobot,
  FaMapMarkedAlt,
  FaChartLine,
  FaUniversity,
  FaShieldAlt,
  FaMobileAlt,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaRobot />,
      title: "AI Issue Detection",
      desc: "Artificial Intelligence automatically identifies issue types and severity from uploaded images.",
      color: "#3b82f6",
    },
    {
      icon: <FaMapMarkedAlt />,
      title: "Live Community Maps",
      desc: "Locate issues on an interactive map with precise GPS coordinates.",
      color: "#22c55e",
    },
    {
      icon: <FaChartLine />,
      title: "Real-Time Analytics",
      desc: "Visual dashboards help monitor issue trends and resolution performance.",
      color: "#f59e0b",
    },
    {
      icon: <FaUniversity />,
      title: "Government Dashboard",
      desc: "Municipal officers can manage complaints and update issue status efficiently.",
      color: "#ef4444",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Platform",
      desc: "Role-based access ensures secure management for citizens and administrators.",
      color: "#8b5cf6",
    },
    {
      icon: <FaMobileAlt />,
      title: "Responsive Design",
      desc: "Use CivicTrack AI seamlessly on desktop, tablet, and mobile devices.",
      color: "#06b6d4",
    },
  ];

return (
  <section
    id="features"
    style={{
      padding: "100px 8%",
      background: "#0f172a",
    }}
  >
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h2
          style={{
            fontSize: "42px",
            marginBottom: "15px",
          }}
        >
          Why Choose CivicTrack AI?
        </h2>

        <p
          style={{
            color: "#94a3b8",
            maxWidth: "750px",
            margin: "auto",
            fontSize: "18px",
            lineHeight: "1.8",
          }}
        >
          A modern AI-powered platform that helps citizens report issues
          while enabling authorities to resolve them faster through
          intelligent analytics and live tracking.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
          gap: "30px",
        }}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            style={{
              background: "#111827",
              padding: "35px",
              borderRadius: "20px",
              border: "1px solid #1e293b",
              transition: "0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow =
                "0 20px 40px rgba(37,99,235,.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div
              style={{
                fontSize: "50px",
                color: feature.color,
                marginBottom: "20px",
              }}
            >
              {feature.icon}
            </div>

            <h3
              style={{
                marginBottom: "15px",
                fontSize: "24px",
              }}
            >
              {feature.title}
            </h3>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: "1.8",
              }}
            >
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;