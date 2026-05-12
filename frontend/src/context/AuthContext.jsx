// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { getMe, loginUser, logoutUser } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // null = logged out
  const [loading, setLoading] = useState(true); // true while /me is in-flight on mount

  // On app load, ask the server if there's a valid session cookie
  useEffect(() => {
    getMe()
      .then((res) => {
        if (res.success) setUser(res.data.user);
        else setUser(null);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (credentials) => {
    const response = await loginUser(credentials);
    if (response.success) {
      setUser(response.data.user);
    }
    return response; // caller handles redirect / error display
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}