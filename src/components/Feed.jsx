import React, { useContext } from "react";
import { FaImage } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import IconButton from "./IconButton";
import CreatePost from "./CreatePost";
import Posts from "./Posts";
import { PostsContext } from "../context/postsContext";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function Feed() {
  const { posts, loading } = useContext(PostsContext);
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const followedPosts = posts.filter((post) =>
    currentUser.userData.following.includes(post.uid)
  );

  return (
    <div className="flex-[3] bg-background p-6">
      <CreatePost />
      {followedPosts.length !== 0 ? (
        <Posts posts={followedPosts} loading={loading} />
      ) : (
        <div className="text-center mt-6 text-lg">
          No posts to show. Check out the{" "}
          <span
            onClick={() => navigate("/explore")}
            className="text-primary cursor-pointer"
          >
            Explore
          </span>{" "}
          page for more content!
        </div>
      )}
    </div>
  );
}

export default Feed;
