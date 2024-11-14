import React, { useContext, useState } from "react";
import { IoHome } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import IconButton from "./IconButton";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="bg-secondary p-6 w-[300px]">
      <div className="space-y-1">
        <IconButton icon={IoHome} text="Home" onClick={() => navigate("/")} />
        <IconButton
          icon={MdOutlineExplore}
          text="Explore"
          onClick={() => navigate("/explore")}
        />
        <IconButton
          icon={IoPerson}
          text="Profile"
          onClick={() => navigate(`/profile/${currentUser.user.uid}`)}
        />
      </div>
    </div>
  );
}

export default Navbar;
