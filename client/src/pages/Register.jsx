function Register() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Register</h1>

      <div
        style={{
          maxWidth: "400px",
          marginTop: "30px",
          background: "#1e293b",
          padding: "25px",
          borderRadius: "15px",
        }}
      >
        <input
          type="text"
          placeholder="Full Name"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <input
          type="email"
          placeholder="Email"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <button
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;