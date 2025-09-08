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
      
      // Process revenue data
      setRevenueData(analyticsData.revenueData || [
        { month: 'January', revenue: 35000, bookings: 240 },
        { month: 'February', revenue: 38000, bookings: 265 },
        { month: 'March', revenue: 42000, bookings: 298 },
        { month: 'April', revenue: 39000, bookings: 276 },
        { month: 'May', revenue: 45000, bookings: 320 },
        { month: 'June', revenue: 48000, bookings: 342 }
      ]);
      
      // Process worker performance data
      setWorkerPerformance(analyticsData.workerPerformance || [
        { name: 'John Smith', jobs: 42, rating: 4.8, revenue: 8400 },
        { name: 'Mike Johnson', jobs: 38, rating: 4.9, revenue: 7980 },
        { name: 'Sarah Williams', jobs: 29, rating: 4.7, revenue: 6090 },
        { name: 'Robert Brown', jobs: 35, rating: 4.6, revenue: 7350 }
      ]);
      
      // Process booking statistics
      setBookingStats({
        total: analyticsData.totalBookings || 842,
        completed: analyticsData.completedBookings || 789,
        pending: analyticsData.pendingBookings || 53,
        completionRate: analyticsData.completionRate || 93.7
      });
      
      // Process service bookings
      setServiceBookings(analyticsData.serviceBookings || [
        { service: 'Plumbing', bookings: 126, percentage: 15 },
        { service: 'Electrical', bookings: 98, percentage: 11.6 },
        { service: 'Carpentry', bookings: 84, percentage: 10 },
        { service: 'Painting', bookings: 112, percentage: 13.3 }
      ]);
    } catch (err) {
      setError(err.message || 'Failed to fetch report data');
      // Fallback to mock data if API fails
      setRevenueData([
        { month: 'January', revenue: 35000, bookings: 240 },
        { month: 'February', revenue: 38000, bookings: 265 },
        { month: 'March', revenue: 42000, bookings: 298 },
        { month: 'April', revenue: 39000, bookings: 276 },
        { month: 'May', revenue: 45000, bookings: 320 },
        { month: 'June', revenue: 48000, bookings: 342 }
      ]);
      
      setWorkerPerformance([
        { name: 'John Smith', jobs: 42, rating: 4.8, revenue: 8400 },
        { name: 'Mike Johnson', jobs: 38, rating: 4.9, revenue: 7980 },
        { name: 'Sarah Williams', jobs: 29, rating: 4.7, revenue: 6090 },
        { name: 'Robert Brown', jobs: 35, rating: 4.6, revenue: 7350 }
      ]);
      
      setBookingStats({
        total: 842,
        completed: 789,
        pending: 53,
        completionRate: 93.7
      });
      
      setServiceBookings([
        { service: 'Plumbing', bookings: 126, percentage: 15 },
        { service: 'Electrical', bookings: 98, percentage: 11.6 },
        { service: 'Carpentry', bookings: 84, percentage: 10 },
        { service: 'Painting', bookings: 112, percentage: 13.3 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading && revenueData.length === 0) {
    return (
      <div id="main">
        <div className="inner">
          <header>
            <h1>Reports & Analytics</h1>
            <p>View detailed reports and analytics for your platform.</p>
          </header>
          <p>Loading report data...</p>
        </div>
      </div>
    );
  }

  return (
    <div id="main">
      <div className="inner">
        <header>
          <h1>Reports & Analytics</h1>
          <p>View detailed reports and analytics for your platform.</p>
        </header>
        
        {error && <div className="error-message">{error}</div>}
        
        <section>
          <div className="row gtr-uniform">
            <div className="col-12">
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="revenue">Revenue Report</option>
                <option value="performance">Worker Performance</option>
                <option value="bookings">Booking Statistics</option>
              </select>
            </div>
          </div>
        </section>
        
        {reportType === 'revenue' && (
          <section>
            <h2>Revenue Report</h2>
            <div className="table-wrapper">
              <table>
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
            
            <h3>Revenue Chart</h3>
            <div className="chart-placeholder">
              <p>Revenue chart visualization would appear here</p>
              <div className="chart-bar">
                {revenueData.map((data, index) => (
                  <div key={index} className="bar" style={{ height: `${(data.revenue / 50000) * 200}px` }}>
                    <span className="bar-value">${data.revenue?.toLocaleString()}</span>
                    <span className="bar-label">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {reportType === 'performance' && (
          <section>
            <h2>Worker Performance</h2>
            <div className="table-wrapper">
              <table>
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
          </section>
        )}
        
        {reportType === 'bookings' && (
          <section>
            <h2>Booking Statistics</h2>
            <div className="box alt">
              <div className="row gtr-uniform">
                <div className="col-3 col-12-medium">
                  <h3>Total Bookings</h3>
                  <p className="large">{bookingStats.total}</p>
                </div>
                <div className="col-3 col-12-medium">
                  <h3>Completed</h3>
                  <p className="large">{bookingStats.completed}</p>
                </div>
                <div className="col-3 col-12-medium">
                  <h3>Pending</h3>
                  <p className="large">{bookingStats.pending}</p>
                </div>
                <div className="col-3 col-12-medium">
                  <h3>Completion Rate</h3>
                  <p className="large">{bookingStats.completionRate}%</p>
                </div>
              </div>
            </div>
            
            <h3>Bookings by Service</h3>
            <div className="table-wrapper">
              <table>
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
          </section>
        )}
      </div>
    </div>
  );
};

export default AdminReports;