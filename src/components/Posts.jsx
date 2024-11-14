import React, { useContext } from "react";
import { PostsContext } from "../context/postsContext";
import Post from "./Post";

function Posts() {
  const { posts, loading } = useContext(PostsContext);

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
