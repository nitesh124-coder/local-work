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
      // Take first 6 services as featured
      const featured = (servicesData.services || []).slice(0, 6);
      setFeaturedServices(featured);
    } catch (err) {
      setError(err.message || 'Failed to fetch services');
      // Fallback to default services if API fails
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

  // Function to assign categories for styling
  const getCategoryStyle = (index) => {
    const styles = ['style1', 'style2', 'style3', 'style4', 'style5', 'style6'];
    return styles[index % styles.length];
  };

  return (
    <div id="main">
      <div className="inner">
        <header>
          <h1>Find Skilled Workers Near You<br />
          Get Your Job Done Fast</h1>
          <p>Local Skill Alerts connects you with verified professionals for all your home and business needs. From plumbing to painting, we've got you covered.</p>
        </header>
        <section className="tiles">
          {featuredServices.map((service, index) => (
            <article className={getCategoryStyle(index)} key={service.id}>
              <span className="image">
                <img src={getServiceImagePath(service.name, index)} alt={service.name} />
              </span>
              <Link to={`/services`}>
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

export default Home;