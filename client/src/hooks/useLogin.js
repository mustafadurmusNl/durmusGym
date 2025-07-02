import { useState, useContext } from "react";
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useContext(AuthContext); // get login function from context

  const performLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser({ email, password });
      login(response.token, response.user); // set context state here
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.message || "Login failed");
      setLoading(false);
      return null;
    }
  };

  return { login: performLogin, loading, error };
};

export default useLogin;
