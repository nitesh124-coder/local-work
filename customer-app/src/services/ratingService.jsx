import apiClient from './apiClient';

// Rating Service
const RatingService = {
  // Submit rating
  submitRating: async (ratingData) => {
    try {
      const response = await apiClient.post('/ratings', ratingData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to submit rating' };
    }
  },

  // Get worker ratings
  getWorkerRatings: async (workerId) => {
    try {
      const response = await apiClient.get(`/ratings/worker/${workerId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch worker ratings' };
    }
  },

  // Get customer feedback
  getCustomerFeedback: async (customerId) => {
    try {
      const response = await apiClient.get(`/ratings/customer/${customerId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch customer feedback' };
    }
  }
};

export default RatingService;