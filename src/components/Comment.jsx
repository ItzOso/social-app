import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { deleteComment } from "../firebase/posts";

function Comment({ comment, post }) {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  // Format using JavaScript's Date methods
  const date = comment.createdAt.toDate();
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();

  const formattedCreatedAt = formattedDate + " " + formattedTime;

  const handleDeleteComment = async () => {
    try {
      await deleteComment(post, comment);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex bg-background p-4 rounded-md gap-3">
      <img
        className="rounded-full w-[30px] h-[30px]"
        src={comment.profilePic}
        alt=""
      />
      <div className="flex flex-col">
        <div className="flex gap-1 items-center">
          <p
            onClick={() => navigate(`/profile/${comment.uid}`)}
            className="cursor-pointer"
          >
            {comment.username}
          </p>
          <p className="text-sm text-gray-500">{formattedCreatedAt}</p>
          {currentUser.user.uid === comment.uid && (
            <button
              onClick={handleDeleteComment}
              className="bg-red-600 ml-2 rounded-md text-xs p-1 px-2 text-white hover:brightness-95"
            >
              Delete
            </button>
          )}
        </div>
        {comment.comment}
      </div>
    </div>
  );
}

export default Comment;
