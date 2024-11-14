import React from "react";
import { FaImage } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import IconButton from "./IconButton";
import CreatePost from "./CreatePost";
import Posts from "./Posts";

function Feed() {
  return (
    <div className="flex-[3] bg-background p-6">
      <CreatePost />
      <Posts />
    </div>
  );
}

export default Feed;
