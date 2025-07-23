import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUserCheck,
  FaUserClock,
  FaUsers,
  FaNewspaper,
} from "react-icons/fa";

export default function NavBar() {
  const links = [
    { name: "Dashboard", path: "/", icon: <FaHome /> },
    { name: "Pending Lawyers", path: "/request", icon: <FaUserClock /> },
    { name: "Lawyers", path: "/accepted", icon: <FaUserCheck /> },
    { name: "Clients", path: "/clients", icon: <FaUsers /> },
    { name: "Articles", path: "/articles", icon: <FaNewspaper /> },
  ];

  return (
    <aside className="h-screen w-64 bgSecondary text-grayLight fixed flex flex-col p-4">
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
      </nav>
    </aside>
  );
}
