// src/components/PrivateRoute.js
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      const confirmed = window.confirm(
        "👋 Please log in or try free trial to access the training library."
      );
      if (confirmed) {
        navigate("/free-trial-page");
      }
    }
  }, [loading, user, navigate]);

  if (loading || (!user && !loading)) return null;

  return children;
};

export default PrivateRoute;
