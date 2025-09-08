import apiClient from './apiClient';

// Service Service
const ServiceService = {
  // Get all services
  getAllServices: async () => {
    try {
      const response = await apiClient.get('/services');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch services' };
    }
  },

  // Get service details
  getServiceDetails: async (serviceId) => {
    try {
      const response = await apiClient.get(`/services/${serviceId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch service details' };
    }
  }
};

export default ServiceService;