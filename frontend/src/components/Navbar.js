import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar-jira">
      <div className="nav-left">
        <Link to="/projects" className="logo-compact">
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
            <g fill="none" stroke="currentColor" strokeWidth="1.4">
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="6" r="3"></circle>
              <circle cx="18" cy="18" r="3"></circle>
            </g>
          </svg>
          <span>TaskFlow</span>
        </Link>
      </div>

      <div className="nav-right">
        {user ? (
          <>
            <span className="nav-user">{user.username}</span>
            <button className="btn ghost" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/" className="link-muted">Login</Link>
            <Link to="/register" className="link-muted">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}
