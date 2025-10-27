// Layout.jsx - Main layout component

import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./Layout.css";

const Layout = ({ children }) => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="container">
          <div className="navbar-content">
            <Link to="/" className="navbar-brand">
              <h2>MERN Blog</h2>
            </Link>

            <ul className="navbar-menu">
              <li>
                <Link to="/">Home</Link>
              </li>
              {isAuthenticated && (
                <li>
                  <Link to="/posts/new">Create Post</Link>
                </li>
              )}
              {isAuthenticated ? (
                <>
                  <li>
                    <span className="navbar-user">Welcome, {user?.name}</span>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="btn btn-sm btn-outline"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register" className="btn btn-sm btn-primary">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <div className="container">{children}</div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 MERN Blog by Raheem. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
