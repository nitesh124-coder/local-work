import apiClient from './apiClient';

// Admin Authentication Service
const AdminAuthService = {
  // Admin login
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      // Save token to localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to login' };
    }
  },

  // Get profile
  getProfile: async () => {
    try {
      const response = await apiClient.get('/auth/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch profile' };
    }
  },

  // Logout
  logout: async () => {
    try {
      await apiClient.post('/auth/logout');
      // Remove token from localStorage
      localStorage.removeItem('token');
      return { success: true };
    } catch (error) {
      // Still remove token even if logout fails
      localStorage.removeItem('token');
      throw error.response?.data || { message: 'Failed to logout' };
    }
  }
};

export default AdminAuthService;