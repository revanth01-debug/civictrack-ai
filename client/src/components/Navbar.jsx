import { useEffect, useState } from "react";
import {
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const pageTitle =
    location.pathname === "/dashboard"
      ? "Dashboard"
      : location.pathname === "/analytics"
      ? "Analytics"
      : location.pathname === "/history"
      ? "Issue History"
      : location.pathname === "/map"
      ? "Community Map"
      : location.pathname === "/report"
      ? "Report Issue"
      : "Dashboard";
const [showNotifications, setShowNotifications] =
  useState(false);

const [pendingIssues, setPendingIssues] =
  useState([]);

const [notifications, setNotifications] =
  useState(0);

const [searchText, setSearchText] =
  useState("");


  useEffect(() => {
    fetch("https://civictrack-ai-3.onrender.com/api/issues")
      .then((res) => res.json())
     .then((data) => {

  const pending = data.filter(
    (issue) => issue.status === "Pending"
  ).length;

  setNotifications(pending);

  setPendingIssues(
    data.filter(
      (issue) => issue.status === "Pending"
    )
  );

})
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = () => {
    if (!searchText.trim()) {
      alert("Enter issue title");
      return;
    }

    alert(`Searching for: ${searchText}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    window.location.href = "/home";
  };

  return (
    <header className="h-20 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-8">

      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          {pageTitle}
        </h1>

        <p className="text-slate-400 text-sm">
          Welcome back, Revanth 👋
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        {/* Search */}
        <div className="relative flex items-center">
          <FaSearch className="absolute left-4 text-slate-500" />

          <input
            type="text"
            value={searchText}
            onChange={(e) =>
              setSearchText(e.target.value)
            }
            placeholder="Search issues..."
            className="bg-slate-800 text-white rounded-lg pl-12 pr-4 py-3 w-80 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSearch}
            className="ml-2 bg-blue-600 px-5 py-3 rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {/* Notification */}
        <div className="relative">
          <button
            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }
            className="relative bg-slate-800 p-3 rounded-full hover:bg-slate-700 transition"
          >
            <FaBell size={18} />

            <span className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full text-xs flex items-center justify-center">
              {notifications}
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-4 z-50">
            <h3 className="font-bold mb-3">
  Pending Issues
</h3>

{pendingIssues.length > 0 ? (
  pendingIssues.map((issue) => (
    <div
      key={issue._id}
      className="border-b border-slate-700 py-2"
    >
      <p className="font-semibold text-white">
        {issue.title}
      </p>

      <p className="text-xs text-slate-400">
        {issue.location}
      </p>
    </div>
  ))
) : (
  <p className="text-slate-400">
    No Pending Issues
  </p>
)}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3">

          <FaUserCircle
            size={40}
            className="text-blue-500"
          />

          <div>
            <h4 className="font-semibold">
              Revanth
            </h4>

            <p className="text-xs text-slate-400">
              Administrator
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded-lg text-sm hover:bg-red-700"
          >
            Logout
          </button>

        </div>

      </div>

    </header>
  );
}

export default Navbar;