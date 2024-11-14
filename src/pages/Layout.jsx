import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

function Layout() {
  return (
    <div>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex grow">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
