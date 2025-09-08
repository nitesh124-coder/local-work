import apiClient from './apiClient';

// Worker Payment Service
const WorkerPaymentService = {
  // Get earnings history
  getEarnings: async () => {
    try {
      const response = await apiClient.get('/worker/earnings');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch earnings' };
    }
  },

  // Get wallet balance
  getWalletBalance: async () => {
    try {
      const response = await apiClient.get('/worker/wallet');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch wallet balance' };
    }
  },

  // Request withdrawal
  requestWithdrawal: async (withdrawalData) => {
    try {
      const response = await apiClient.post('/worker/wallet/withdraw', withdrawalData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to request withdrawal' };
    }
  }
};

export default WorkerPaymentService;