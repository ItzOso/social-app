import React, { useContext } from "react";
import IconButton from "./IconButton";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { AuthContext } from "../context/authContext";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase/firebaseConfig";
import { deleteObject, ref } from "firebase/storage";
import { clickLike, deletePost } from "../firebase/posts";
import { useNavigate } from "react-router-dom";

function Post({ post }) {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  // Convert to JavaScript Date object
  const date = post.createdAt.toDate();

  // Format using JavaScript's Date methods
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();

  const formattedCreatedAt = formattedDate + " " + formattedTime;

  const hasliked = post.likes.includes(currentUser.user.uid);

  const handleDeletePost = async () => {
    try {
      await deletePost(post);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickLike = async () => {
    try {
      await clickLike(post, currentUser.user.uid, hasliked);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-secondary p-6 rounded-md flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <img
            className="rounded-full w-[50px] h-[50px]"
            src={post.profilePic}
            alt=""
          />
          <div>
            <p
              onClick={() => navigate(`/profile/${post.uid}`)}
              className="font-semibold cursor-pointer"
            >
              {post.username}
            </p>
            <p className="text-sm">{formattedCreatedAt}</p>
          </div>
        </div>
        {currentUser.user.uid === post.uid && (
          <button
            onClick={handleDeletePost}
            className="bg-red-600 rounded-md text-sm px-4 py-2 text-white hover:brightness-95"
          >
            DELETE
          </button>
        )}
      </div>

      {post.caption && <p>{post.caption}</p>}
      {post.image && <img className="w-1/2" src={post.image} alt="" />}

      <div className="flex items-center gap-2">
        <IconButton
          onClick={handleClickLike}
          icon={FaHeart}
          text={post.likes.length}
          className={`flex gap-2 justify-center items-center p-2 ${
            hasliked && "text-red-600"
          } rounded-md hover:bg-red-600 hover:text-white cursor-pointer`}
        />
        <IconButton
          icon={FaComment}
          text={post.comments.length}
          fontSize={"base"}
        />
      </div>
    </div>
  );
}

export default Post;
