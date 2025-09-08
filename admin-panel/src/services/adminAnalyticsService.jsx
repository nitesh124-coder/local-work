import apiClient from './apiClient';

// Admin Analytics Service
const AdminAnalyticsService = {
  // Get analytics data
  getAnalytics: async () => {
    try {
      const response = await apiClient.get('/admin/analytics');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch analytics' };
    }
  },

  // Get audit logs
  getAuditLogs: async () => {
    try {
      const response = await apiClient.get('/admin/audit-logs');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch audit logs' };
    }
  }
};

export default AdminAnalyticsService;