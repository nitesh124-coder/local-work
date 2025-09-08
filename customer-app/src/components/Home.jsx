import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ServiceService from '../services/serviceService';
import { getServiceImagePath } from '../services/serviceImages';

const Home = () => {
  const [featuredServices, setFeaturedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFeaturedServices();
  }, []);

  const fetchFeaturedServices = async () => {
    try {
      const servicesData = await ServiceService.getAllServices();
      const featured = (servicesData.services || []).slice(0, 6);
      setFeaturedServices(featured);
    } catch (err) {
      setError(err.message || 'Failed to fetch services');
      const defaultServices = [
        { id: 1, name: "Plumbing", description: "Expert plumbers for all your piping and water system needs." },
        { id: 2, name: "Electrical", description: "Licensed electricians for wiring, installations and repairs." },
        { id: 3, name: "Carpentry", description: "Skilled carpenters for furniture, fixtures and structural work." },
        { id: 4, name: "Painting", description: "Professional painters for interiors and exteriors." },
        { id: 5, name: "Cleaning", description: "Reliable cleaning services for homes and offices." },
        { id: 6, name: "Mechanics", description: "Qualified mechanics for vehicle repairs and maintenance." }
      ];
      setFeaturedServices(defaultServices);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container-fluid bg-light p-5 text-center">
        <h1 className="display-4">Find Skilled Workers Near You</h1>
        <p className="lead">Get Your Job Done Fast. Local Skill Alerts connects you with verified professionals for all your home and business needs.</p>
        <Link className="btn btn-primary btn-lg" to="/services" role="button">Browse Services</Link>
      </div>

      <div className="container mt-5">
        <h2 className="text-center mb-4">Featured Services</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}
        <div className="row">
          {featuredServices.map((service, index) => (
            <div className="col-md-4 mb-4" key={service.id}>
              <div className="card h-100">
                <img src={getServiceImagePath(service.name, index)} className="card-img-top" alt={service.name} style={{height: '200px', objectFit: 'cover'}} />
                <div className="card-body">
                  <h5 className="card-title">{service.name}</h5>
                  <p className="card-text">{service.description}</p>
                  <Link to={`/services`} className="btn btn-primary">Learn More</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
