// src/hooks/useLogin.js
import { useState } from "react";
import { loginUser } from "../services/authService";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser({ email, password });
      localStorage.setItem("token", response.token); // veya cookie varsa gerek yok
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  return { login, loading, error };
};

export default useLogin;
