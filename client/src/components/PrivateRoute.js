// src/components/PrivateRoute.js
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setUnauthorized(true);
    }
  }, [loading, user]);

  if (loading) return <div>Loading...</div>;

  if (unauthorized) {
    window.alert("Please register or log in to access the Library.");
    return null; // Prevent rendering child content
  }

  return children;
};

export default PrivateRoute;
