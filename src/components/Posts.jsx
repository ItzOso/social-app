import React, { useContext } from "react";
import { PostsContext } from "../context/postsContext";
import Post from "./Post";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function Posts({ posts, loading }) {
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="mt-6 space-y-6">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Posts;
