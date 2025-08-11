import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "../index.css";
import NavBar from "./../Components/NavBar";

export default function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    try {
      return localStorage.getItem("sidebarCollapsed") === "1";
    } catch (e) {
      console.log(e);
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("sidebarCollapsed", isCollapsed ? "1" : "0");
    } catch (e) {
      console.log(e);
    }
  }, [isCollapsed]);

  const sidebarWidth = isCollapsed ? "80px" : "256px";

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      style={{
        display: "grid",
        gridTemplateColumns: `${sidebarWidth} 1fr`, // NavBar + Main Content
        transition: "grid-template-columns 0.3s ease",
      }}
    >
      {/* NavBar في العمود الأول */}
      <NavBar
        collapsed={isCollapsed}
        onToggleCollapsed={() => setIsCollapsed(!isCollapsed)}
      />

      {/* المحتوى في العمود الثاني */}
      <main className="p-6 text-white relative z-10">
        <div className="fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
