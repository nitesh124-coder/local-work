import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JobService from '../services/jobService';
import ServiceService from '../services/serviceService';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [services, setServices] = useState([]);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    serviceType: id || '',
    date: '',
    time: '',
    description: ''
  });

  useEffect(() => {
    // Fetch available services
    const fetchServices = async () => {
      try {
        const servicesData = await ServiceService.getAllServices();
        setServices(servicesData.services || []);
      } catch (err) {
        setError('Failed to load services');
      }
    };
    
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const jobData = {
        serviceId: bookingData.serviceType,
        customerName: bookingData.name,
        customerEmail: bookingData.email,
        customerPhone: bookingData.phone,
        address: bookingData.address,
        scheduledDate: bookingData.date,
        scheduledTime: bookingData.time,
        description: bookingData.description
      };
      
      const response = await JobService.createJob(jobData);
      // Redirect to dashboard after successful booking
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to submit booking request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="main">
      <div className="inner">
        <h1>Book a Service</h1>
        <p>Fill out the form below to book your service. Our team will contact you to confirm the details.</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form method="post" onSubmit={handleSubmit}>
          <div className="row gtr-uniform">
            <div className="col-6 col-12-xsmall">
              <input
                type="text"
                name="name"
                id="name"
                value={bookingData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />
            </div>
            <div className="col-6 col-12-xsmall">
              <input
                type="email"
                name="email"
                id="email"
                value={bookingData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="col-6 col-12-xsmall">
              <input
                type="tel"
                name="phone"
                id="phone"
                value={bookingData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
              />
            </div>
            <div className="col-6 col-12-xsmall">
              <input
                type="text"
                name="address"
                id="address"
                value={bookingData.address}
                onChange={handleChange}
                placeholder="Service Address"
                required
              />
            </div>
            <div className="col-12">
              <select
                name="serviceType"
                id="serviceType"
                value={bookingData.serviceType}
                onChange={handleChange}
                required
              >
                <option value="">- Select Service Type -</option>
                {services.map(service => (
                  <option key={service.id} value={service.id}>{service.name}</option>
                ))}
              </select>
            </div>
            <div className="col-6 col-12-small">
              <input
                type="date"
                name="date"
                id="date"
                value={bookingData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-6 col-12-small">
              <input
                type="time"
                name="time"
                id="time"
                value={bookingData.time}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12">
              <textarea
                name="description"
                id="description"
                value={bookingData.description}
                onChange={handleChange}
                placeholder="Describe your service requirements"
                rows="6"
              ></textarea>
            </div>
            <div className="col-12">
              <ul className="actions">
                <li><input type="submit" value={loading ? "Submitting..." : "Submit Booking Request"} className="primary" disabled={loading} /></li>
                <li><input type="reset" value="Reset" /></li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;