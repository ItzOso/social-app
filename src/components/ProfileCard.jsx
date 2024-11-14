import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { followUser, unfollowUser } from "../firebase/follow";

function ProfileCard({ user }) {
  const [isFollowing, setIsFollowing] = useState();
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        // Unfollow the user
        await unfollowUser(currentUser.user.uid, user.uid);
        setIsFollowing(false);
      } else {
        // Follow the user
        await followUser(currentUser.user.uid, user.uid);
        setIsFollowing(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      key={user.uid}
      className="flex mb-4 justify-between items-center bg-background px-4 py-2 rounded-md"
    >
      <div className="flex items-center gap-2">
        <img
          src={user.profilePic}
          alt=""
          className="w-[35px] h-[35px] rounded-full"
        />
        <p
          onClick={() => navigate(`/profile/${user.uid}`)}
          className="text-lg cursor-pointer"
        >
          {user.username}
        </p>
      </div>
      <button
        onClick={handleFollowToggle}
        className="bg-primary rounded-md px-2 py-1 text-white hover:brightness-95"
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
}

export default ProfileCard;
