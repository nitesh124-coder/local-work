import apiClient from './apiClient';

// Worker Job Service
const WorkerJobService = {
  // Get available jobs
  getAvailableJobs: async () => {
    try {
      const response = await apiClient.get('/jobs/available');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch available jobs' };
    }
  },

  // Accept job
  acceptJob: async (jobId) => {
    try {
      const response = await apiClient.post(`/jobs/${jobId}/accept`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to accept job' };
    }
  },

  // Reject job
  rejectJob: async (jobId) => {
    try {
      const response = await apiClient.post(`/jobs/${jobId}/reject`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to reject job' };
    }
  },

  // Update job status
  updateJobStatus: async (jobId, statusData) => {
    try {
      const response = await apiClient.post(`/jobs/${jobId}/status`, statusData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update job status' };
    }
  },

  // Get worker job history
  getJobHistory: async () => {
    try {
      const response = await apiClient.get('/jobs/worker/history');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch job history' };
    }
  }
};

export default WorkerJobService;