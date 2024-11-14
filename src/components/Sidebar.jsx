import React, { useContext, useEffect, useState } from "react";
import { signout } from "../firebase/auth";
import { AuthContext } from "../context/authContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { followUser, unfollowUser } from "../firebase/follow";
import ProfileCard from "./ProfileCard";

function Sidebar() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    // Fetch all users and the current user's following list
    const fetchUsers = async () => {
      try {
        // Fetch all users
        const usersRef = collection(db, "users");
        const querySnapshot = await getDocs(usersRef);
        const usersData = querySnapshot.docs.map((doc) => doc.data());

        // Get current user's following list
        const following = currentUser.userData.following || [];

        // Filter out the current user and users already followed by the current user
        const notFollowedUsers = usersData.filter(
          (user) =>
            user.uid !== currentUser.user.uid && // Exclude the current user
            !following.includes(user.uid) // Exclude already followed users
        );
        setFilteredUsers(notFollowedUsers);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const handleSignout = async () => {
    try {
      await signout();
      console.log("Successfully signed out");
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };

  return (
    <div className="flex-[1] bg-secondary p-6">
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex items-center gap-2">
          <img
            src={currentUser.userData.profilePic}
            className="w-[35px] h-[35px] bg-black rounded-full"
            alt=""
          />
          <p className="text-lg">{currentUser.userData.username}</p>
        </div>
        <button
          onClick={handleSignout}
          className="bg-primary rounded-md px-2 py-1 text-white hover:brightness-95"
        >
          Logout
        </button>
      </div>

      <p className="my-6 font-semibold">Suggested</p>
      {filteredUsers &&
        filteredUsers.map((user) => <ProfileCard user={user} />)}
    </div>
  );
}

export default Sidebar;
