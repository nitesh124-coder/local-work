import React, { createContext, useState, useContext, useEffect } from 'react';
import WorkerAuthService from '../services/workerAuthService';

// Create context
const WorkerAuthContext = createContext();

// Auth provider component
export const WorkerAuthProvider = ({ children }) => {
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
        const userData = await WorkerAuthService.getProfile();
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

  const login = async (phone, otp) => {
    try {
      const response = await WorkerAuthService.verifyOTP(phone, otp);
      if (response.token) {
        setUser(response.user);
        setIsAuthenticated(true);
        return response;
      }
    } catch (err) {
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const response = await WorkerAuthService.register(userData);
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
      await WorkerAuthService.logout();
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
    register,
    logout,
    updateUser
  };

  return (
    <WorkerAuthContext.Provider value={value}>
      {!loading && children}
    </WorkerAuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useWorkerAuth = () => {
  const context = useContext(WorkerAuthContext);
  if (context === undefined) {
    throw new Error('useWorkerAuth must be used within a WorkerAuthProvider');
  }
  return context;
};

export default WorkerAuthContext;