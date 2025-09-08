import apiClient from './apiClient';

// Payment Service
const PaymentService = {
  // Mark job as paid
  markPaid: async (jobId) => {
    try {
      const response = await apiClient.post('/payments/mark-paid', { jobId });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to mark payment' };
    }
  },

  // Initiate payment
  initiatePayment: async (paymentData) => {
    try {
      const response = await apiClient.post('/payments/initiate', paymentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to initiate payment' };
    }
  },

  // Get payment status
  getPaymentStatus: async (jobId) => {
    try {
      const response = await apiClient.get(`/payments/status/${jobId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch payment status' };
    }
  },

  // Release payment to worker
  releasePayment: async (jobId) => {
    try {
      const response = await apiClient.post('/payments/release', { jobId });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to release payment' };
    }
  }
};

export default PaymentService;