// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { getMe, loginUser, logoutUser } from "../services/api";

const AuthContext = createContext(null);

function getStoredPaymentMethod(user) {
  if (typeof window === "undefined" || !user) return null;
  const userId = user.id || user._id || user.email;
  if (!userId) return null;
  return window.localStorage.getItem(`flashio_payment_method_${userId}`);
}

function savePaymentMethodForUser(user, method) {
  if (typeof window === "undefined" || !user) return;
  const userId = user.id || user._id || user.email;
  if (!userId) return;
  window.localStorage.setItem(`flashio_payment_method_${userId}`, method);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // null = logged out
  const [loading, setLoading] = useState(true); // true while /me is in-flight on mount

  // On app load, ask the server if there's a valid session cookie
  useEffect(() => {
    getMe()
      .then((res) => {
        if (res.success) {
          const savedMethod = getStoredPaymentMethod(res.data.user);
          setUser({
            ...res.data.user,
            paymentMethod:
              savedMethod || res.data.user?.paymentMethod || "card",
          });
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (credentials) => {
    const response = await loginUser(credentials);
    if (response.success) {
      const savedMethod = getStoredPaymentMethod(response.data.user);
      setUser({
        ...response.data.user,
        paymentMethod:
          savedMethod || response.data.user?.paymentMethod || "card",
      });
    }
    return response; // caller handles redirect / error display
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  const setPaymentMethod = (method) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, paymentMethod: method };
      savePaymentMethodForUser(prev, method);
      return next;
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, setPaymentMethod }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}