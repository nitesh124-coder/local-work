import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ServiceService from '../services/serviceService';
import { getServiceImagePath } from '../services/serviceImages';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const servicesData = await ServiceService.getAllServices();
      setServices(servicesData.services || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  // Function to assign categories for styling
  const getCategoryStyle = (index) => {
    const styles = ['style1', 'style2', 'style3', 'style4', 'style5', 'style6'];
    return styles[index % styles.length];
  };

  if (loading) {
    return (
      <div id="main">
        <div className="inner">
          <h1>Our Services</h1>
          <p>Loading services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="main">
        <div className="inner">
          <h1>Our Services</h1>
          <div className="error-message">{error}</div>
          <button onClick={fetchServices} className="button">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div id="main">
      <div className="inner">
        <h1>Our Services</h1>
        <p>We connect you with verified professionals for all your home and business needs.</p>
        <section className="tiles">
          {services.map((service, index) => (
            <article className={getCategoryStyle(index)} key={service.id}>
              <span className="image">
                <img src={getServiceImagePath(service.name, index)} alt={service.name} />
              </span>
              <Link to={`/booking/${service.id}`}>
                <h2>{service.name}</h2>
                <div className="content">
                  <p>{service.description}</p>
                </div>
              </Link>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Services;