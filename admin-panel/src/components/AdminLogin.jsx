import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminAuthService from '../services/adminAuthService';

const AdminLogin = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await AdminAuthService.login(loginData);
      // Redirect to dashboard after successful login
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="main">
      <div className="inner">
        <h1>Admin Login</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form method="post" onSubmit={handleSubmit}>
          <div className="row gtr-uniform">
            <div className="col-12">
              <input
                type="email"
                name="email"
                id="email"
                value={loginData.email}
                onChange={handleChange}
                placeholder="Admin Email"
                required
              />
            </div>
            <div className="col-12">
              <input
                type="password"
                name="password"
                id="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Admin Password"
                required
              />
            </div>
            <div className="col-12">
              <ul className="actions">
                <li><input type="submit" value={loading ? "Logging in..." : "Login"} className="primary" disabled={loading} /></li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;