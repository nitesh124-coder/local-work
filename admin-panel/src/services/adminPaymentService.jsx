import apiClient from './apiClient';

// Admin Payment Service
const AdminPaymentService = {
  // Get all payments
  getAllPayments: async (filters = {}) => {
    try {
      const response = await apiClient.get('/admin/payments', { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch payments' };
    }
  }
};

export default AdminPaymentService;