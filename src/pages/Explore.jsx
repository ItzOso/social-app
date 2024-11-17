import React, { useContext } from "react";
import Posts from "../components/Posts";
import { PostsContext } from "../context/postsContext";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";

function Explore() {
  const { posts, loading } = useContext(PostsContext);

  const { currentUser } = useContext(AuthContext);

  const explorePosts = posts.filter(
    (post) =>
      !currentUser.userData.following.includes(post.uid) &&
      post.uid !== currentUser.user.uid
  );

  return explorePosts.length !== 0 ? (
    <div className="p-6 pt-0 w-full">
      <Posts posts={explorePosts} loading={loading} />
    </div>
  ) : (
    <div className="flex flex-[4] flex-col items-center justify-center min-h-screen bg-background text-text">
      <h1 className="text-4xl font-bold mb-4">No Posts to Explore</h1>
      <p className="text-xl mb-6">
        It looks like there are no posts to show right now. Check back later for
        more updates!
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-primary text-white rounded hover:brightness-95"
      >
        Go Home
      </Link>
    </div>
  );
}

export default Explore;
