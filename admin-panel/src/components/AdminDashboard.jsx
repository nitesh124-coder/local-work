import React, { useState, useEffect } from 'react';
import AdminAnalyticsService from '../services/adminAnalyticsService';

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
      const analyticsData = await AdminAnalyticsService.getAnalytics();
      setStats({
        totalWorkers: analyticsData.totalWorkers || 0,
        totalCustomers: analyticsData.totalCustomers || 0,
        totalJobs: analyticsData.totalJobs || 0,
        completedJobs: analyticsData.completedJobs || 0,
        pendingJobs: analyticsData.pendingJobs || 0,
        totalRevenue: analyticsData.totalRevenue || 0
      });
      
      const mockActivity = [
        { id: 1, activity: 'New worker registered', user: 'John Smith', time: '10 minutes ago' },
        { id: 2, activity: 'New job booking', user: 'Jane Doe', time: '25 minutes ago' },
        { id: 3, activity: 'Job completed', user: 'Mike Johnson', time: '1 hour ago' },
        { id: 4, activity: 'New customer registered', user: 'Sarah Williams', time: '2 hours ago' }
      ];
      setRecentActivity(mockActivity);
    } catch (err) {
      setError(err.message || 'Failed to fetch dashboard data');
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
      <div className="container mt-5">
        <h1>Admin Dashboard</h1>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <header className="mb-4">
        <h1>Admin Dashboard</h1>
        <p>Welcome to the Local Skill Alerts administration panel.</p>
      </header>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title">Total Workers</h5>
              <p className="card-text fs-4">{stats.totalWorkers}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5 className="card-title">Total Customers</h5>
              <p className="card-text fs-4">{stats.totalCustomers}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card text-white bg-info">
            <div className="card-body">
              <h5 className="card-title">Total Jobs</h5>
              <p className="card-text fs-4">{stats.totalJobs}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Completed Jobs</h5>
              <p className="card-text fs-4">{stats.completedJobs}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Pending Jobs</h5>
              <p className="card-text fs-4">{stats.pendingJobs}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Revenue</h5>
              <p className="card-text fs-4">${stats.totalRevenue}</p>
            </div>
          </div>
        </div>
      </div>
      
      <section className="mt-5">
        <h2>Recent Activity</h2>
        <div className="table-responsive">
          <table className="table table-striped">
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
  );
};

export default AdminDashboard;
