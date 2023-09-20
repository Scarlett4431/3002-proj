import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  element: Element,
  isAuthenticated,
  isLoading,
}) => {
  return isLoading ? (
        <div />
      ) : isAuthenticated ? (
        <Element />
      ) : (
        <Navigate to="/signin" />
      );
  };

export default ProtectedRoute;
