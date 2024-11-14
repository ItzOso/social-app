import React from "react";
import Post from "./post";

function PostModal({ post, onClose }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      {/* Modal content */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-lg shadow-lg p-6 max-w-lg w-full"
      >
        <button
          onClick={onClose}
          className="absolute text-lg top-0 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        {/* Render the Post component here */}
        <Post post={post} />
      </div>
    </div>
  );
}

export default PostModal;
