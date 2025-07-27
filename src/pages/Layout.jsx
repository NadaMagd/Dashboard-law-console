import React from "react";
import NavBar from "../Components/NavBar";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <div className="flex">
        <NavBar />
        <div className="ml-64 p-6 w-full min-h-screen bgPrimary text-white">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}
