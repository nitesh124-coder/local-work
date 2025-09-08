import React, { useState, useEffect } from 'react';
import JobService from '../services/jobService';
import AuthService from '../services/authService';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Fetch profile
      const profileData = await AuthService.getProfile();
      setProfile({
        name: profileData.name || '',
        email: profileData.email || '',
        phone: profileData.phone || '',
        address: profileData.address || ''
      });
      
      // Fetch job history
      const jobHistory = await JobService.getJobHistory();
      // Separate upcoming and past bookings
      const upcoming = jobHistory.jobs.filter(job => 
        job.status === 'confirmed' || job.status === 'assigned' || job.status === 'in_progress'
      );
      const past = jobHistory.jobs.filter(job => 
        job.status === 'completed' || job.status === 'cancelled'
      );
      
      setUpcomingBookings(upcoming);
      setBookingHistory(past);
    } catch (err) {
      setError(err.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await AuthService.updateProfile(profile);
      alert('Profile updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading && (!upcomingBookings.length && !bookingHistory.length)) {
    return (
      <div id="main">
        <div className="inner">
          <h1>Customer Dashboard</h1>
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div id="main">
      <div className="inner">
        <h1>Customer Dashboard</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="tabs">
          <ul className="tab-list">
            <li className={activeTab === 'bookings' ? 'active' : ''}>
              <button onClick={() => setActiveTab('bookings')}>Upcoming Bookings</button>
            </li>
            <li className={activeTab === 'history' ? 'active' : ''}>
              <button onClick={() => setActiveTab('history')}>Booking History</button>
            </li>
            <li className={activeTab === 'profile' ? 'active' : ''}>
              <button onClick={() => setActiveTab('profile')}>Profile</button>
            </li>
          </ul>
        </div>

        {activeTab === 'bookings' && (
          <section>
            <h2>Upcoming Bookings</h2>
            {upcomingBookings.length > 0 ? (
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Worker</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcomingBookings.map(booking => (
                      <tr key={booking.id}>
                        <td>{booking.service?.name || 'N/A'}</td>
                        <td>{new Date(booking.scheduledDate).toLocaleDateString()}</td>
                        <td>{booking.scheduledTime}</td>
                        <td>{booking.worker?.name || 'TBD'}</td>
                        <td>
                          <span className={`status ${booking.status}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                        <td>
                          <button className="button small">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>You have no upcoming bookings.</p>
            )}
          </section>
        )}

        {activeTab === 'history' && (
          <section>
            <h2>Booking History</h2>
            {bookingHistory.length > 0 ? (
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Worker</th>
                      <th>Status</th>
                      <th>Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingHistory.map(booking => (
                      <tr key={booking.id}>
                        <td>{booking.service?.name || 'N/A'}</td>
                        <td>{new Date(booking.scheduledDate).toLocaleDateString()}</td>
                        <td>{booking.scheduledTime}</td>
                        <td>{booking.worker?.name || 'N/A'}</td>
                        <td>
                          <span className={`status ${booking.status}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                        <td>
                          {booking.rating ? '★'.repeat(booking.rating) : 'Not rated'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>You have no past bookings.</p>
            )}
          </section>
        )}

        {activeTab === 'profile' && (
          <section>
            <h2>Profile Information</h2>
            <form method="post" onSubmit={handleProfileSubmit}>
              <div className="row gtr-uniform">
                <div className="col-6 col-12-xsmall">
                  <input
                    type="text"
                    name="name"
                    id="profile-name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    placeholder="Full Name"
                  />
                </div>
                <div className="col-6 col-12-xsmall">
                  <input
                    type="email"
                    name="email"
                    id="profile-email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    placeholder="Email"
                  />
                </div>
                <div className="col-6 col-12-xsmall">
                  <input
                    type="tel"
                    name="phone"
                    id="profile-phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    placeholder="Phone Number"
                  />
                </div>
                <div className="col-6 col-12-xsmall">
                  <input
                    type="text"
                    name="address"
                    id="profile-address"
                    value={profile.address}
                    onChange={handleProfileChange}
                    placeholder="Address"
                  />
                </div>
                <div className="col-12">
                  <ul className="actions">
                    <li><input type="submit" value={loading ? "Updating..." : "Update Profile"} className="primary" disabled={loading} /></li>
                  </ul>
                </div>
              </div>
            </form>
          </section>
        )}
      </div>
    </div>
  );
};

export default Dashboard;