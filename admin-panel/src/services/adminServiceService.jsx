import apiClient from './apiClient';

// Admin Service Management Service
const AdminServiceService = {
  // Get all services
  getAllServices: async () => {
    try {
      const response = await apiClient.get('/services');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch services' };
    }
  },

  // Add new service
  addService: async (serviceData) => {
    try {
      const response = await apiClient.post('/services', serviceData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to add service' };
    }
  },

  // Update service
  updateService: async (serviceId, serviceData) => {
    try {
      const response = await apiClient.put(`/services/${serviceId}`, serviceData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update service' };
    }
  }
};

export default AdminServiceService;