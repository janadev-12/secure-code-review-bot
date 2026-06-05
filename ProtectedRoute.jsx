import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  // Check login status
  const isAuthenticated =
    localStorage.getItem("isAuthenticated");

  // If not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Allow access
  return children;
};

export default ProtectedRoute;