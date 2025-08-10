import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserCheck,
  FaUserClock,
  FaUsers,
  FaNewspaper,
  FaUnlock,
  FaSignOutAlt
} from "react-icons/fa";
  
export default function NavBar() {
  let navigate = useNavigate()
  const isLogged = localStorage.getItem("uid");

  const handleLogout = () => {
    localStorage.removeItem("uid");
    navigate("/login");
  };
  const links = isLogged
    ? [
        { name: "Dashboard", path: "/", icon: <FaHome /> },
        { name: "Pending Lawyers", path: "/request", icon: <FaUserClock /> },
        { name: "Lawyers", path: "/accepted", icon: <FaUserCheck /> },
        { name: "Clients", path: "/clients", icon: <FaUsers /> },
        { name: "Articles", path: "/articles", icon: <FaNewspaper /> },
      ]
    : [{ name: "login", path: "/login", icon: <FaUnlock /> }];

  return (
    <aside className="h-screen w-64 bgSecondary text-white fixed flex flex-col p-4">
      <h1 className="goldTxt  text-xl font-bold mb-8 text-center">
        Law Counsel
      </h1>
      <nav className="flex flex-col gap-2">
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? "goldTxt font-bold hover:bg-[#262b3e]"
                  : " hover:bg-[#262b3e]"
              }`
            }
          >
            <span className="text-lg">{link.icon}</span>
            <span>{link.name}</span>
          </NavLink>
          
        ))}
        {isLogged && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#262b3e] transition-all text-left mt-4"
          >
            <FaSignOutAlt className="text-lg" />
            <span>Logout</span>
          </button>
        )}
      </nav>
    </aside>
  );
}
