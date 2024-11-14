import React, { useContext, useEffect, useState } from "react";
import defaultPfp from "../images/defaultPfp.jpeg";
import { AuthContext } from "../context/authContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useParams } from "react-router-dom";
import { updateUserProfile, uploadprofilePic } from "../firebase/auth";
import { PostsContext } from "../context/postsContext";
import { followUser, unfollowUser } from "../firebase/follow";
import PostModal from "../components/PostModal";

function Profile() {
  const { currentUser } = useContext(AuthContext);
  const { posts } = useContext(PostsContext);
  const { userId } = useParams();
  const profileUserId = userId || currentUser.user.uid; // Default to current user ID if no URL param
  const isCurrentUser = profileUserId === currentUser.user.uid;

  const [edit, setEdit] = useState(false);
  const [ogBio, setOgBio] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setprofilePic] = useState(defaultPfp);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profileUserData, setProfileUserData] = useState(null);

  const userPosts = posts.filter((post) => post.uid === userId);

  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    // get the user's information
    const getUserInfo = async () => {
      if (!profileUserId) return; // Exit if profileUserId is undefined
      try {
        const userRef = doc(db, "users", profileUserId);
        const profile = await getDoc(userRef);

        if (profile.exists()) {
          const data = profile.data();
          setProfileUserData(data);
          setOgBio(data.bio || "");
          setBio(data.bio || "");
          setprofilePic(data.profilePic || defaultPfp);
        } else {
          console.log("User does not exist");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserInfo();
  }, [profileUserId]); // Add profileUserId as dependency

  const userRef = doc(db, "users", currentUser.user.uid);

  const handleprofilePicPreview = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImage(file);
    setprofilePic(URL.createObjectURL(file));
  };

  // Main save function
  const handleSave = async () => {
    if (selectedImage || bio !== ogBio) {
      setLoading(true);
      try {
        let imageUrl = profilePic;
        // Upload image if selected
        if (selectedImage) {
          imageUrl = await uploadprofilePic(
            selectedImage,
            currentUser.user.uid
          );
          setprofilePic(imageUrl);
          setSelectedImage(null);
        }
        // Update Firestore with bio and/or image URL
        await updateUserProfile(bio, imageUrl, userRef, setProfileUserData);
        // Exit edit mode
        setEdit(false);
      } catch (error) {
        console.log("Error saving profile:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setEdit(false);
    }
  };

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Check if profileUserData is available before accessing followers
    if (profileUserData && profileUserData.followers) {
      setIsFollowing(profileUserData.followers.includes(currentUser.user.uid));
    }
  }, [profileUserData, currentUser.user.uid]);

  const handleFollowToggle = async () => {
    if (isFollowing) {
      await unfollowUser(currentUser.user.uid, profileUserId);
      setIsFollowing(false);

      // Update followers in state
      setProfileUserData((prevData) => ({
        ...prevData,
        followers: prevData.followers.filter(
          (uid) => uid !== currentUser.user.uid
        ),
      }));
    } else {
      await followUser(currentUser.user.uid, profileUserId);
      setIsFollowing(true);

      // Update followers in state
      setProfileUserData((prevData) => ({
        ...prevData,
        followers: [...prevData.followers, currentUser.user.uid],
      }));
    }
  };

  useEffect(() => {
    if (selectedPost) {
      const updatedPost = userPosts.find((post) => post.id === selectedPost.id);

      // Case 1: If selectedPost is not found in userPosts, reset it
      if (!updatedPost) {
        setSelectedPost(null);
      }
      // Case 2: If selectedPost is found and has changed, update it
      else if (updatedPost !== selectedPost) {
        setSelectedPost(updatedPost);
      }
    }
  }, [userPosts, selectedPost]);

  if (!profileUserData) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="w-[600px] h-full m-auto p-6">
      <div className="flex">
        <div className="flex flex-col gap-2">
          <img
            src={profilePic}
            alt="Profile"
            className="rounded-full w-[150px] h-[150px]"
          />
          {edit && isCurrentUser && (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleprofilePicPreview}
                className="hidden"
                id="profile-image-upload"
              />
              <label
                htmlFor="profile-image-upload"
                className="bg-primary rounded-md text-center text-lg px-4 py-1.5 text-white hover:brightness-95 cursor-pointer"
              >
                Update PFP
              </label>
            </>
          )}
        </div>

        <div className="flex flex-col p-6">
          <div className="flex gap-4">
            <p className="text-2xl">{profileUserData.username}</p>
            {isCurrentUser ? (
              edit ? (
                <button
                  onClick={handleSave}
                  className="bg-primary rounded-md text-lg px-4 py-1.5 text-white hover:brightness-95"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              ) : (
                <button
                  onClick={() => setEdit(true)}
                  className="bg-primary rounded-md text-lg px-4 py-1.5 text-white hover:brightness-95"
                >
                  Edit Profile
                </button>
              )
            ) : (
              <button
                onClick={handleFollowToggle}
                className="bg-primary rounded-md text-lg px-4 py-1.5 text-white hover:brightness-95"
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
          <div className="flex text-lg gap-4 mt-4">
            <p>
              {profileUserData.followers && profileUserData.followers.length}{" "}
              Followers
            </p>
            <p>
              {profileUserData.following && profileUserData.following.length}{" "}
              Following
            </p>
            <p>{userPosts && userPosts.length} Posts</p>
          </div>
        </div>
      </div>
      {!edit ? (
        <p className="text-lg py-6">{profileUserData.bio}</p>
      ) : (
        <textarea
          className="text-lg my-6 w-full resize-none h-[100px] border-2 rounded-md border-primary p-2"
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={150}
        ></textarea>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-2xl ">
        {userPosts.map((post) =>
          post.image ? (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="aspect-square rounded-md bg-gray-200 "
            >
              <img
                src={post.image}
                alt="Post 1"
                className="w-full h-full object-cover rounded-md hover:brightness-90 cursor-pointer"
              />
            </div>
          ) : (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="aspect-square rounded-md cursor-pointer hover:brightness-90 bg-gray-200 flex items-center justify-center text-center p-4 text-gray-600"
            >
              <p className="text-sm line-clamp-3">{post.caption}</p>
            </div>
          )
        )}

        {selectedPost && (
          <PostModal
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
          />
        )}
      </div>
    </div>
  );
}

export default Profile;
