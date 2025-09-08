import React, { useState, useEffect } from 'react';
import WorkerJobService from '../services/workerJobService';
import WorkerPaymentService from '../services/workerPaymentService';
import WorkerAuthService from '../services/workerAuthService';

const WorkerDashboard = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [jobAlerts, setJobAlerts] = useState([]);
  const [upcomingJobs, setUpcomingJobs] = useState([]);
  const [jobHistory, setJobHistory] = useState([]);
  const [earnings, setEarnings] = useState({
    weekly: 0,
    monthly: 0,
    total: 0
  });
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Fetch job alerts (available jobs)
      const availableJobs = await WorkerJobService.getAvailableJobs();
      setJobAlerts(availableJobs.jobs || []);
      
      // Fetch worker job history
      const jobHistoryData = await WorkerJobService.getJobHistory();
      // Separate upcoming and past jobs
      const upcoming = jobHistoryData.jobs.filter(job => 
        job.status === 'confirmed' || job.status === 'assigned' || job.status === 'in_progress'
      );
      const past = jobHistoryData.jobs.filter(job => 
        job.status === 'completed' || job.status === 'cancelled'
      );
      
      setUpcomingJobs(upcoming);
      setJobHistory(past);
      
      // Fetch earnings data
      const earningsData = await WorkerPaymentService.getEarnings();
      setEarnings({
        weekly: earningsData.weekly || 0,
        monthly: earningsData.monthly || 0,
        total: earningsData.total || 0
      });
      
      // Fetch payment history
      const paymentData = await WorkerPaymentService.getWalletBalance();
      setPaymentHistory(paymentData.history || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptJob = async (jobId) => {
    try {
      await WorkerJobService.acceptJob(jobId);
      // Refresh dashboard data
      fetchDashboardData();
      alert('Job accepted successfully!');
    } catch (err) {
      setError(err.message || 'Failed to accept job');
    }
  };

  const handleRejectJob = async (jobId) => {
    try {
      await WorkerJobService.rejectJob(jobId);
      // Refresh dashboard data
      fetchDashboardData();
      alert('Job rejected successfully!');
    } catch (err) {
      setError(err.message || 'Failed to reject job');
    }
  };

  if (loading && (!jobAlerts.length && !upcomingJobs.length && !jobHistory.length)) {
    return (
      <div id="main">
        <div className="inner">
          <h1>Worker Dashboard</h1>
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div id="main">
      <div className="inner">
        <h1>Worker Dashboard</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="tabs">
          <ul className="tab-list">
            <li className={activeTab === 'jobs' ? 'active' : ''}>
              <button onClick={() => setActiveTab('jobs')}>Job Alerts</button>
            </li>
            <li className={activeTab === 'upcoming' ? 'active' : ''}>
              <button onClick={() => setActiveTab('upcoming')}>Upcoming Jobs</button>
            </li>
            <li className={activeTab === 'history' ? 'active' : ''}>
              <button onClick={() => setActiveTab('history')}>Job History</button>
            </li>
            <li className={activeTab === 'earnings' ? 'active' : ''}>
              <button onClick={() => setActiveTab('earnings')}>Earnings</button>
            </li>
          </ul>
        </div>

        {activeTab === 'jobs' && (
          <section>
            <h2>New Job Alerts</h2>
            {jobAlerts.length > 0 ? (
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Description</th>
                      <th>Address</th>
                      <th>Date & Time</th>
                      <th>Distance</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobAlerts.map(job => (
                      <tr key={job.id}>
                        <td>{job.service?.name || 'N/A'}</td>
                        <td>{job.description || 'N/A'}</td>
                        <td>{job.address || 'N/A'}</td>
                        <td>
                          {job.scheduledDate ? new Date(job.scheduledDate).toLocaleDateString() : 'N/A'} at {job.scheduledTime || 'N/A'}
                        </td>
                        <td>{job.distance ? `${job.distance} miles` : 'N/A'}</td>
                        <td>
                          <button 
                            className="button small" 
                            onClick={() => handleAcceptJob(job.id)}
                          >
                            Accept
                          </button>
                          <button 
                            className="button small" 
                            onClick={() => handleRejectJob(job.id)}
                          >
                            Decline
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No new job alerts at this time.</p>
            )}
          </section>
        )}

        {activeTab === 'upcoming' && (
          <section>
            <h2>Upcoming Jobs</h2>
            {upcomingJobs.length > 0 ? (
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Description</th>
                      <th>Address</th>
                      <th>Date & Time</th>
                      <th>Customer</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcomingJobs.map(job => (
                      <tr key={job.id}>
                        <td>{job.service?.name || 'N/A'}</td>
                        <td>{job.description || 'N/A'}</td>
                        <td>{job.address || 'N/A'}</td>
                        <td>
                          {job.scheduledDate ? new Date(job.scheduledDate).toLocaleDateString() : 'N/A'} at {job.scheduledTime || 'N/A'}
                        </td>
                        <td>{job.customer?.name || 'N/A'}</td>
                        <td>
                          <span className={`status ${job.status}`}>
                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>You have no upcoming jobs.</p>
            )}
          </section>
        )}

        {activeTab === 'history' && (
          <section>
            <h2>Job History</h2>
            {jobHistory.length > 0 ? (
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Description</th>
                      <th>Address</th>
                      <th>Date</th>
                      <th>Customer</th>
                      <th>Status</th>
                      <th>Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobHistory.map(job => (
                      <tr key={job.id}>
                        <td>{job.service?.name || 'N/A'}</td>
                        <td>{job.description || 'N/A'}</td>
                        <td>{job.address || 'N/A'}</td>
                        <td>{job.scheduledDate ? new Date(job.scheduledDate).toLocaleDateString() : 'N/A'}</td>
                        <td>{job.customer?.name || 'N/A'}</td>
                        <td>
                          <span className={`status ${job.status}`}>
                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                          </span>
                        </td>
                        <td>
                          {job.rating ? '★'.repeat(job.rating) : 'Not rated'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>You have no past jobs.</p>
            )}
          </section>
        )}

        {activeTab === 'earnings' && (
          <section>
            <h2>Earnings Summary</h2>
            <div className="box alt">
              <div className="row gtr-uniform">
                <div className="col-4 col-12-medium">
                  <h3>This Week</h3>
                  <p className="large">${earnings.weekly.toFixed(2)}</p>
                </div>
                <div className="col-4 col-12-medium">
                  <h3>This Month</h3>
                  <p className="large">${earnings.monthly.toFixed(2)}</p>
                </div>
                <div className="col-4 col-12-medium">
                  <h3>Total Earnings</h3>
                  <p className="large">${earnings.total.toFixed(2)}</p>
                </div>
              </div>
            </div>
            
            <h3>Payment History</h3>
            {paymentHistory.length > 0 ? (
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory.map((payment, index) => (
                      <tr key={index}>
                        <td>{payment.date ? new Date(payment.date).toLocaleDateString() : 'N/A'}</td>
                        <td>${payment.amount ? payment.amount.toFixed(2) : '0.00'}</td>
                        <td>
                          <span className={`status ${payment.status}`}>
                            {payment.status ? payment.status.charAt(0).toUpperCase() + payment.status.slice(1) : 'N/A'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No payment history available.</p>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default WorkerDashboard;