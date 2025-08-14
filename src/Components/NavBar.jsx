import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserCheck,
  FaUserClock,
  FaUsers,
  FaNewspaper,
  FaUnlock,
  FaSignOutAlt,
  FaGavel,
  FaBars,
  FaChevronRight,
} from "react-icons/fa";
 
import logo from "/public/img1.svg";

export default function NavBar({
  collapsed = false,
  onToggleCollapsed = () => {},
}) {
  let navigate = useNavigate();
  const isLogged = localStorage.getItem("uid");

  const handleLogout = () => {
    localStorage.removeItem("uid");
    navigate("/login");
  };

  const links = isLogged
    ? [
        {
          name: "Dashboard",
          path: "/",
          icon: <FaHome />,
          color: "from-blue-500 to-cyan-500",
        },
        {
          name: "Pending Lawyers",
          path: "/request",
          icon: <FaUserClock />,
          color: "from-orange-500 to-red-500",
        },
        {
          name: "Lawyers",
          path: "/accepted",
          icon: <FaUserCheck />,
          color: "from-green-500 to-emerald-500",
        },
        {
          name: "Clients",
          path: "/clients",
          icon: <FaUsers />,
          color: "from-purple-500 to-pink-500",
        },
        {
          name: "Articles",
          path: "/articles",
          icon: <FaNewspaper />,
          color: "from-indigo-500 to-blue-500",
        },
      ]
    : [
        {
          name: "Login",
          path: "/login",
          icon: <FaUnlock />,
          color: "from-yellow-500 to-orange-500",
        },
      ];

  return (
    <aside
      className={`h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col p-4 shadow-2xl border-r border-slate-700/50 transition-all duration-300`}
      style={{ width: collapsed ? "80px" : "256px" }}
    >
      {/* Header / Toggle */}
      <div
        className={`mb-6 flex items-center ${
          collapsed ? "justify-center" : "justify-between"
        }`}
      >
        {/* <div
          className={`inline-flex items-center justify-center ${
            collapsed ? "w-12 h-12" : "w-16 h-16"
          } bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg`}
        >
          <FaGavel className={`${collapsed ? "text-xl" : "text-2xl"} text-white`} />
        </div> */}
        <div
          className={`inline-flex items-center justify-center ${
            collapsed ? "w-12 h-12" : "w-16 h-16"
          } bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 group-hover:from-blue-500/30 group-hover:to-purple-500/30 rounded-2xl shadow-lg overflow-hidden`}
        >
          <img src={logo} alt="Logo" />
        </div>
        {!collapsed && (
          <div className="ml-3 flex-1">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
              Law Counsel
            </h1>
            <p className="text-slate-400 text-[11px]">
              Legal Management System
            </p>
          </div>
        )}
        <button
          onClick={onToggleCollapsed}
          aria-label="Toggle sidebar"
          className="ml-2 p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
        >
          {collapsed ? <FaBars /> : <FaChevronRight className="rotate-180" />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2 flex-1">
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={({ isActive }) =>
              `group relative flex items-center ${
                collapsed ? "justify-center" : "gap-3"
              } px-3 py-2 rounded-xl transition-all duration-300 ${
                isActive
                  ? `bg-gradient-to-r ${link.color} text-white shadow-lg`
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
              }`
            }
          >
            {/* Icon */}
            <div
              className={`p-2 rounded-lg transition-all duration-300 ${
                collapsed
                  ? "bg-transparent"
                  : "bg-slate-700/50 group-hover:bg-slate-600/50"
              }`}
            >
              <span className="text-lg">{link.icon}</span>
            </div>

            {/* Label */}
            {!collapsed && (
              <span className="font-medium whitespace-nowrap">{link.name}</span>
            )}

            {/* Active dot when collapsed */}
            {collapsed && (
              <span className="absolute right-2 w-1.5 h-1.5 bg-white/70 rounded-full opacity-0 group-[.active]:opacity-100"></span>
            )}
          </NavLink>
        ))}

        {/* Logout Button */}
        {isLogged && (
          <div className="mt-auto pt-4 border-t border-slate-700/50">
            <button
              onClick={handleLogout}
              className={`w-full group flex items-center ${
                collapsed ? "justify-center" : "gap-3"
              } px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 transition-all duration-300`}
            >
              <div
                className={`p-2 rounded-lg ${
                  collapsed
                    ? "bg-transparent"
                    : "bg-slate-700/50 group-hover:bg-red-500/20"
                } transition-all duration-300`}
              >
                <FaSignOutAlt className="text-lg" />
              </div>
              {!collapsed && <span className="font-medium">Logout</span>}
            </button>
          </div>
        )}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="text-center text-slate-500 text-xs mt-4">
          <p>© 2024 Law Counsel</p>
          <p className="mt-1">Professional Legal Solutions</p>
        </div>
      )}
    </aside>
  );
}
