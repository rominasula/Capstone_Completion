import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

