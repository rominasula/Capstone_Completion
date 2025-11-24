import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  let username = null;

  // Safe JSON parsing
  try {
    const stored = localStorage.getItem("user");
    if (stored && stored !== "undefined") {
      const userObj = JSON.parse(stored);
      username = userObj?.username || null;
    }
  } catch (err) {
    console.error("Failed to read user from localStorage:", err);
    username = null;
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar-jira">
      <Link to="/projects" className="logo-compact">TaskFlow</Link>

      <div className="nav-right">
        {username ? (
          <>
            <div className="nav-user">{username}</div>
            <button onClick={logout} className="btn ghost">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn ghost">Login</Link>
            <Link to="/register" className="btn ghost">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
