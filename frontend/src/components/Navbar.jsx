import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">BootstrapLab</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample" aria-controls="navbarsExample" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className="nav-link" to="/learn">Learn</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/practice">Practice</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/projects">Projects</NavLink></li>
            {user && <li className="nav-item"><NavLink className="nav-link" to="/dashboard">Dashboard</NavLink></li>}
            {user?.role === 'admin' && <li className="nav-item"><NavLink className="nav-link" to="/admin/lessons">Admin</NavLink></li>}
          </ul>
          <div className="d-flex">
            {user ? (
              <>
                <span className="navbar-text text-light me-3">Hi, {user.name || user.email}</span>
                <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <NavLink className="btn btn-outline-light" to="/">Login</NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
