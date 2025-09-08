import React from 'react';
import { Link } from 'react-router-dom';
import { useWorkerAuth } from '../contexts/WorkerAuthContext';

const WorkerNavbar = () => {
  const { isAuthenticated, logout } = useWorkerAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="/images/logo.png" alt="Local Skill Alerts" width="30" height="30" className="d-inline-block align-top" />
          Local Skill Alerts - Worker
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Profile</Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            {isAuthenticated ? (
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={logout}>Logout</button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default WorkerNavbar;
