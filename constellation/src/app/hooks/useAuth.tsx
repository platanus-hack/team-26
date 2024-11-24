"use client";
// hooks/useAuth.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (token && username) {
      setUser({ username });
    }
  }, []);

  const login = async (
    loginUsername: string,
    password: string,
    setError: (error: string) => void
  ): Promise<boolean> => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "users/login",
        {
          username: loginUsername,
          password,
        }
      );
      const token = response.data.access;
      const refreshToken = response.data.refresh;

      // Store tokens in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("username", loginUsername);

      setUser({ username: loginUsername });
      return true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400 || error.response.status === 401) {
          setError("Invalid credentials");
        } else {
          setError("An unexpected error occurred");
        }
      } else {
        setError("An unexpected error occurred");
      }
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    setUser(null);
    router.push("/login"); // Redirect to login after logout
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  return { user, login, logout, isAuthenticated };
};

export default useAuth;
