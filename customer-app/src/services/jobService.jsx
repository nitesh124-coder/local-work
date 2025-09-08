import apiClient from './apiClient';

// Customer Job Service
const JobService = {
  // Create new job
  createJob: async (jobData) => {
    try {
      const response = await apiClient.post('/jobs/create', jobData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create job' };
    }
  },

  // Get job details
  getJobDetails: async (jobId) => {
    try {
      const response = await apiClient.get(`/jobs/${jobId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch job details' };
    }
  },

  // Cancel job
  cancelJob: async (jobId) => {
    try {
      const response = await apiClient.put(`/jobs/${jobId}/cancel`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to cancel job' };
    }
  },

  // Get customer job history
  getJobHistory: async () => {
    try {
      const response = await apiClient.get('/jobs/customer/history');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch job history' };
    }
  }
};

export default JobService;