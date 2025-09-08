import apiClient from './apiClient';

// Admin Job Service
const AdminJobService = {
  // Get all jobs
  getAllJobs: async (filters = {}) => {
    try {
      const response = await apiClient.get('/admin/jobs', { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch jobs' };
    }
  },

  // Reassign job
  reassignJob: async (jobId, reassignmentData) => {
    try {
      const response = await apiClient.put(`/admin/jobs/${jobId}/reassign`, reassignmentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to reassign job' };
    }
  }
};

export default AdminJobService;