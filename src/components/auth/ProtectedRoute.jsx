import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

function ProtectedRoute({ children }) {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!currentUser.user && !currentUser.userData) {
    return <Navigate to="/signin" />;
  }

  return children;
}

export default ProtectedRoute;
