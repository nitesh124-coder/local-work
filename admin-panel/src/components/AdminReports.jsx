import React, { useState, useEffect } from 'react';
import AdminAnalyticsService from '../services/adminAnalyticsService';

const AdminReports = () => {
  const [reportType, setReportType] = useState('revenue');
  const [revenueData, setRevenueData] = useState([]);
  const [workerPerformance, setWorkerPerformance] = useState([]);
  const [bookingStats, setBookingStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    completionRate: 0
  });
  const [serviceBookings, setServiceBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    setLoading(true);
    setError('');
    
    try {
      const analyticsData = await AdminAnalyticsService.getAnalytics();
      
      setRevenueData(analyticsData.revenueData || [
        { month: 'January', revenue: 35000, bookings: 240 },
        { month: 'February', revenue: 38000, bookings: 265 },
        { month: 'March', revenue: 42000, bookings: 298 },
        { month: 'April', revenue: 39000, bookings: 276 },
        { month: 'May', revenue: 45000, bookings: 320 },
        { month: 'June', revenue: 48000, bookings: 342 }
      ]);
      
      setWorkerPerformance(analyticsData.workerPerformance || [
        { name: 'John Smith', jobs: 42, rating: 4.8, revenue: 8400 },
        { name: 'Mike Johnson', jobs: 38, rating: 4.9, revenue: 7980 },
        { name: 'Sarah Williams', jobs: 29, rating: 4.7, revenue: 6090 },
        { name: 'Robert Brown', jobs: 35, rating: 4.6, revenue: 7350 }
      ]);
      
      setBookingStats({
        total: analyticsData.totalBookings || 842,
        completed: analyticsData.completedBookings || 789,
        pending: analyticsData.pendingBookings || 53,
        completionRate: analyticsData.completionRate || 93.7
      });
      
      setServiceBookings(analyticsData.serviceBookings || [
        { service: 'Plumbing', bookings: 126, percentage: 15 },
        { service: 'Electrical', bookings: 98, percentage: 11.6 },
        { service: 'Carpentry', bookings: 84, percentage: 10 },
        { service: 'Painting', bookings: 112, percentage: 13.3 }
      ]);
    } catch (err) {
      setError(err.message || 'Failed to fetch report data');
    } finally {
      setLoading(false);
    }
  };

  if (loading && revenueData.length === 0) {
    return (
      <div className="container mt-5">
        <h1>Reports & Analytics</h1>
        <p>Loading report data...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <header className="mb-4">
        <h1>Reports & Analytics</h1>
        <p>View detailed reports and analytics for your platform.</p>
      </header>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="mb-4">
        <select
          className="form-select"
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="revenue">Revenue Report</option>
          <option value="performance">Worker Performance</option>
          <option value="bookings">Booking Statistics</option>
        </select>
      </div>
      
      {reportType === 'revenue' && (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Revenue Report</h2>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Revenue ($)</th>
                    <th>Bookings</th>
                    <th>Avg. Booking Value ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {revenueData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.month}</td>
                      <td>{data.revenue?.toLocaleString()}</td>
                      <td>{data.bookings}</td>
                      <td>{data.revenue && data.bookings ? (data.revenue / data.bookings).toFixed(2) : '0.00'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {reportType === 'performance' && (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Worker Performance</h2>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Worker Name</th>
                    <th>Jobs Completed</th>
                    <th>Avg. Rating</th>
                    <th>Revenue Generated ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {workerPerformance.map((worker, index) => (
                    <tr key={index}>
                      <td>{worker.name || 'N/A'}</td>
                      <td>{worker.jobs || 0}</td>
                      <td>{worker.rating || 'N/A'}</td>
                      <td>{worker.revenue ? worker.revenue.toLocaleString() : '0'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {reportType === 'bookings' && (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Booking Statistics</h2>
            <div className="row text-center mb-4">
              <div className="col-md-3">
                <div className="card bg-light">
                  <div className="card-body">
                    <h5 className="card-title">Total Bookings</h5>
                    <p className="card-text fs-4">{bookingStats.total}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-light">
                  <div className="card-body">
                    <h5 className="card-title">Completed</h5>
                    <p className="card-text fs-4">{bookingStats.completed}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-light">
                  <div className="card-body">
                    <h5 className="card-title">Pending</h5>
                    <p className="card-text fs-4">{bookingStats.pending}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-light">
                  <div className="card-body">
                    <h5 className="card-title">Completion Rate</h5>
                    <p className="card-text fs-4">{bookingStats.completionRate}%</p>
                  </div>
                </div>
              </div>
            </div>
            
            <h3>Bookings by Service</h3>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Bookings</th>
                    <th>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceBookings.map((service, index) => (
                    <tr key={index}>
                      <td>{service.service || 'N/A'}</td>
                      <td>{service.bookings || 0}</td>
                      <td>{service.percentage ? `${service.percentage}%` : 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReports;
