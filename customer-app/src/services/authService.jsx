import apiClient from './apiClient';

// Authentication Service
const AuthService = {
  // Request OTP
  requestOTP: async (phone) => {
    try {
      const response = await apiClient.post('/auth/request-otp', { phone });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to request OTP' };
    }
  },

  // Verify OTP
  verifyOTP: async (phone, otp) => {
    try {
      const response = await apiClient.post('/auth/verify-otp', { phone, otp });
      // Save token to localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to verify OTP' };
    }
  },

  // Register new user
  register: async (userData) => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      // Save token to localStorage if provided
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to register user' };
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

  // Update profile
  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put('/auth/profile', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update profile' };
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

export default AuthService;