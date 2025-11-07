import { useState, useEffect, useCallback, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { type CustomUser } from "@/lib/types";
import Axios from "@/lib/axiosConfig";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);

  const accessToken = localStorage.getItem("access");
  const isAuthenticated = !!accessToken;

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  const getUser = useCallback(async () => {
    if (!accessToken) return;
    try {
      const res = await Axios.get<CustomUser>("users/me/");
      setUser(res.data);
    } catch (err) {
      console.error("Ошибка при загрузке пользователя:", err);
      logout();
    }
  }, [accessToken]);

  const login = async (username: string, password: string) => {
    try {
      const res = await Axios.post("http://localhost:8000/api/token/", { username, password });
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      await getUser();
    } catch (err) {
      console.error("Ошибка при входе:", err);
      throw err;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      await Axios.post("http://localhost:8000/api/users/", { username, email, password });
      await login(username, password);
    } catch (err) {
      console.error("Ошибка при регистрации:", err);
      throw err;
    }
  };

  useEffect(() => {
    (async () => {
      if (accessToken) await getUser();
      setLoading(false);
    })();
  }, [accessToken, getUser]);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, register, logout, getUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
