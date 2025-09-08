import React, { createContext, useState, useContext, useEffect } from 'react';
import AdminAuthService from '../services/adminAuthService';

// Create context
const AdminAuthContext = createContext();

// Auth provider component
export const AdminAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated on app load
  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      // Check if token exists in localStorage
      const token = localStorage.getItem('token');
      if (token) {
        // Try to fetch user profile
        const userData = await AdminAuthService.getProfile();
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (err) {
      // If token is invalid, remove it
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await AdminAuthService.login(credentials);
      if (response.token) {
        setUser(response.user);
        setIsAuthenticated(true);
        return response;
      }
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await AdminAuthService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      // Even if logout fails, clear local state
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateUser = (userData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...userData
    }));
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUser
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {!loading && children}
    </AdminAuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export default AdminAuthContext;