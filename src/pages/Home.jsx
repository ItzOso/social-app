import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";

function Home() {
  return (
    <>
      <Feed />
      <Sidebar />
    </>
  );
}

export default Home;
