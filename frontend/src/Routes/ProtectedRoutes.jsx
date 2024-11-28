import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { email } = useSelector((state) => state.user);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!email) {
      const timer = setTimeout(() => setRedirect(true), 700);
      return () => clearTimeout(timer);
    }
  }, [email]);

  if (redirect) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
