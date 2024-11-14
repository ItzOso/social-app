import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-[4] flex-col items-center justify-center min-h-screen bg-background text-text">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-primary text-white rounded hover:brightness-95"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
