import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaMapMarkedAlt,
  FaClipboardList,
  FaHistory,
  FaChartBar,
} from "react-icons/fa";

function Sidebar() {
 const isAdmin =
localStorage.getItem("isAdmin");

  const menus = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      title: "Report Issue",
      path: "/report",
      icon: <FaClipboardList />,
    },
    {
      title: "Community Map",
      path: "/map",
      icon: <FaMapMarkedAlt />,
    },
    {
      title: "Issue History",
      path: "/history",
      icon: <FaHistory />,
    },
  {
  title: "Analytics",
  path: "/analytics",
      icon: <FaChartBar />,
    },
  ];

  return (
    <aside className="w-80 bg-slate-950 border-r border-slate-800 flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-blue-500">
          CivicTrack AI
        </h1>

        <p className="text-sm text-slate-400 mt-2">
          Smart Community Monitoring
        </p>
      </div>

      <nav className="flex-1 mt-6">
        {menus.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-4 transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            {item.icon}
            {item.title}
          </NavLink>
        ))}
      </nav>

     <div className="p-6 border-t border-slate-800">
  {isAdmin ? (
    <>
      <h3 className="font-semibold text-white">
        Revanth
      </h3>

      <p className="text-sm text-slate-400">
        Administrator
      </p>
    </>
  ) : (
    <NavLink
      to="/login"
      className="bg-blue-600 text-white px-4 py-2 rounded block text-center"
    >
      Login
    </NavLink>
  )}
</div>
    </aside>
  );
}

export default Sidebar;