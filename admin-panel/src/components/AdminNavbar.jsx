import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <header id="header">
      <div className="inner">
        <Link to="/" className="logo">
          <span className="symbol"><img src="/images/logo.png" alt="Local Skill Alerts" /></span>
          <span className="title">Local Skill Alerts - Admin Panel</span>
        </Link>
        <nav>
          <ul>
            <li><a href="#menu">Menu</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AdminNavbar;