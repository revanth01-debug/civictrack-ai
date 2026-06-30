import { FaClipboardList, FaCheckCircle, FaUsers, FaCity } from "react-icons/fa";

function Stats() {
  const stats = [
    {
      icon: <FaClipboardList />,
      number: "10,254+",
      title: "Issues Reported",
      color: "#2563eb",
    },
    {
      icon: <FaCheckCircle />,
      number: "95%",
      title: "Resolution Rate",
      color: "#22c55e",
    },
    {
      icon: <FaUsers />,
      number: "5,200+",
      title: "Active Citizens",
      color: "#f59e0b",
    },
    {
      icon: <FaCity />,
      number: "120+",
      title: "Communities",
      color: "#8b5cf6",
    },
  ];

  return (
    <section
      id="stats"
      style={{
        padding: "80px 8%",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "40px",
          marginBottom: "15px",
        }}
      >
        Trusted Across Communities
      </h2>

      <p
        style={{
          textAlign: "center",
          color: "#94a3b8",
          marginBottom: "50px",
          fontSize: "18px",
        }}
      >
        AI-powered issue management delivering faster resolutions.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "25px",
        }}
      >
        {stats.map((item, index) => (
          <div
            key={index}
            style={{
              background: "#111827",
              borderRadius: "18px",
              padding: "35px",
              border: "1px solid #1e293b",
              transition: ".3s",
            }}
          >
            <div
              style={{
                fontSize: "45px",
                color: item.color,
                marginBottom: "20px",
              }}
            >
              {item.icon}
            </div>

            <h1
              style={{
                fontSize: "42px",
                marginBottom: "10px",
              }}
            >
              {item.number}
            </h1>

            <p
              style={{
                color: "#94a3b8",
                fontSize: "18px",
              }}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;