import apiClient from './apiClient';

// Admin Worker Service
const AdminWorkerService = {
  // Get all workers
  getAllWorkers: async (filters = {}) => {
    try {
      const response = await apiClient.get('/admin/workers', { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch workers' };
    }
  },

  // Verify worker
  verifyWorker: async (workerId, verificationData) => {
    try {
      const response = await apiClient.put(`/admin/workers/${workerId}/verify`, verificationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to verify worker' };
    }
  }
};

export default AdminWorkerService;