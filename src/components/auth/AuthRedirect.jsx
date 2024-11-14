import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

function AuthRedirect({ children }) {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (currentUser.user || currentUser.userData) {
    return <Navigate to="/" />; // if logged in, send them to home page
  }

  return children;
}

export default AuthRedirect;
