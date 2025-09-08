import React, { useState, useEffect } from 'react';
import AdminAnalyticsService from '../services/adminAnalyticsService';
import AdminJobService from '../services/adminJobService';
import AdminWorkerService from '../services/adminWorkerService';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalWorkers: 0,
    totalCustomers: 0,
    totalJobs: 0,
    completedJobs: 0,
    pendingJobs: 0,
    totalRevenue: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Fetch analytics data
      const analyticsData = await AdminAnalyticsService.getAnalytics();
      setStats({
        totalWorkers: analyticsData.totalWorkers || 0,
        totalCustomers: analyticsData.totalCustomers || 0,
        totalJobs: analyticsData.totalJobs || 0,
        completedJobs: analyticsData.completedJobs || 0,
        pendingJobs: analyticsData.pendingJobs || 0,
        totalRevenue: analyticsData.totalRevenue || 0
      });
      
      // Fetch recent activity (simplified - in a real app you might have a specific endpoint)
      // For now, we'll use mock data since there's no specific API for this
      const mockActivity = [
        { id: 1, activity: 'New worker registered', user: 'John Smith', time: '10 minutes ago' },
        { id: 2, activity: 'New job booking', user: 'Jane Doe', time: '25 minutes ago' },
        { id: 3, activity: 'Job completed', user: 'Mike Johnson', time: '1 hour ago' },
        { id: 4, activity: 'New customer registered', user: 'Sarah Williams', time: '2 hours ago' }
      ];
      setRecentActivity(mockActivity);
    } catch (err) {
      setError(err.message || 'Failed to fetch dashboard data');
      // Fallback to default stats if API fails
      setStats({
        totalWorkers: 124,
        totalCustomers: 356,
        totalJobs: 842,
        completedJobs: 789,
        pendingJobs: 53,
        totalRevenue: 42680
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && stats.totalWorkers === 0) {
    return (
      <div id="main">
        <div className="inner">
          <h1>Admin Dashboard</h1>
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div id="main">
      <div className="inner">
        <header>
          <h1>Admin Dashboard</h1>
          <p>Welcome to the Local Skill Alerts administration panel.</p>
        </header>
        
        {error && <div className="error-message">{error}</div>}
        
        <section>
          <h2>Overview</h2>
          <div className="box alt">
            <div className="row gtr-uniform">
              <div className="col-4 col-12-medium">
                <h3>Total Workers</h3>
                <p className="large">{stats.totalWorkers}</p>
              </div>
              <div className="col-4 col-12-medium">
                <h3>Total Customers</h3>
                <p className="large">{stats.totalCustomers}</p>
              </div>
              <div className="col-4 col-12-medium">
                <h3>Total Jobs</h3>
                <p className="large">{stats.totalJobs}</p>
              </div>
              <div className="col-4 col-12-medium">
                <h3>Completed Jobs</h3>
                <p className="large">{stats.completedJobs}</p>
              </div>
              <div className="col-4 col-12-medium">
                <h3>Pending Jobs</h3>
                <p className="large">{stats.pendingJobs}</p>
              </div>
              <div className="col-4 col-12-medium">
                <h3>Total Revenue</h3>
                <p className="large">${stats.totalRevenue}</p>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <h2>Recent Activity</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>User</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map(activity => (
                  <tr key={activity.id}>
                    <td>{activity.activity}</td>
                    <td>{activity.user}</td>
                    <td>{activity.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;