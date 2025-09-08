import apiClient from './apiClient';

// Worker Authentication Service
const WorkerAuthService = {
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

  // Register new worker
  register: async (workerData) => {
    try {
      const response = await apiClient.post('/worker/register', workerData);
      // Save token to localStorage if provided
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to register worker' };
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

  // Update worker profile
  updateProfile: async (profileData) => {
    try {
      // Prepare data to ensure skills is properly formatted
      const dataToSend = {
        ...profileData,
        skills: Array.isArray(profileData.skills) ? [...profileData.skills] : []
      };
      
      const response = await apiClient.put('/worker/profile', dataToSend);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update profile' };
    }
  },

  // Upload documents
  uploadDocuments: async (formData) => {
    try {
      const response = await apiClient.post('/worker/upload-docs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to upload documents' };
    }
  },

  // Get verification status
  getVerificationStatus: async () => {
    try {
      const response = await apiClient.get('/worker/status');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch verification status' };
    }
  },

  // Update location
  updateLocation: async (locationData) => {
    try {
      const response = await apiClient.post('/worker/location/update', locationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update location' };
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

export default WorkerAuthService;