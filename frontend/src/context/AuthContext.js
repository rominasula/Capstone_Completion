import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let storedUser = null;

  try {
    const rawUser = localStorage.getItem("user");
    // Only parse if it exists and is not the string "undefined"
    storedUser = rawUser && rawUser !== "undefined" ? JSON.parse(rawUser) : null;
  } catch (error) {
    console.error("Failed to parse user from localStorage:", error);
    storedUser = null;
  }

  const [user, setUser] = useState(storedUser);

  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
