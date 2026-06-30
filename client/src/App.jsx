import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ReportIssue from "./pages/ReportIssue";
import Map from "./pages/Map";
import IssueHistory from "./pages/IssueHistory";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Navigate } from "react-router-dom";
import Analytics from "./pages/Analytics";
function ProtectedRoute({ children }) {
  const isAdmin =
    localStorage.getItem("isAdmin");

  return isAdmin ? children : <Navigate to="/login" />;
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
<Route
path="/dashboard"
element={
<ProtectedRoute>
<Dashboard />
</ProtectedRoute>
}
/>
<Route path="/report" element={<ReportIssue />} />
<Route path="/map" element={<Map />} />
<Route
  path="/history"
  element={
    <ProtectedRoute>
      <IssueHistory />
    </ProtectedRoute>
  }
/>
<Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
  path="/analytics"
  element={
    <ProtectedRoute>
      <Analytics />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;