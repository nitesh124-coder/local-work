import React, { useState, useEffect } from 'react';
import AdminServiceService from '../services/adminServiceService';

const AdminServices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    category: '',
    description: ''
  });

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [searchTerm, services]);

  const fetchServices = async () => {
    setLoading(true);
    setError('');
    
    try {
      const servicesData = await AdminServiceService.getAllServices();
      setServices(servicesData.services || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  const filterServices = () => {
    if (!searchTerm) {
      setFilteredServices(services);
      return;
    }
    
    const filtered = services.filter(service =>
      service.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredServices(filtered);
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await AdminServiceService.addService(newService);
      setNewService({ name: '', category: '', description: '' });
      setShowAddForm(false);
      // Refresh the service list
      fetchServices();
      alert('Service added successfully!');
    } catch (err) {
      setError(err.message || 'Failed to add service');
    } finally {
      setLoading(false);
    }
  };

  const handleNewServiceChange = (e) => {
    setNewService({
      ...newService,
      [e.target.name]: e.target.value
    });
  };

  if (loading && services.length === 0) {
    return (
      <div id="main">
        <div className="inner">
          <header>
            <h1>Manage Services</h1>
            <p>View and manage all available services.</p>
          </header>
          <p>Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div id="main">
      <div className="inner">
        <header>
          <h1>Manage Services</h1>
          <p>View and manage all available services.</p>
        </header>
        
        {error && <div className="error-message">{error}</div>}
        
        <section>
          <div className="row gtr-uniform">
            <div className="col-6 col-12-xsmall">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search services..."
              />
            </div>
            <div className="col-6 col-12-xsmall">
              <button className="button primary" onClick={() => setShowAddForm(!showAddForm)}>
                {showAddForm ? 'Cancel' : 'Add New Service'}
              </button>
            </div>
          </div>
        </section>
        
        {showAddForm && (
          <section>
            <h2>Add New Service</h2>
            <form method="post" onSubmit={handleAddService}>
              <div className="row gtr-uniform">
                <div className="col-6 col-12-xsmall">
                  <input
                    type="text"
                    name="name"
                    value={newService.name}
                    onChange={handleNewServiceChange}
                    placeholder="Service Name"
                    required
                  />
                </div>
                <div className="col-6 col-12-xsmall">
                  <input
                    type="text"
                    name="category"
                    value={newService.category}
                    onChange={handleNewServiceChange}
                    placeholder="Category"
                    required
                  />
                </div>
                <div className="col-12">
                  <textarea
                    name="description"
                    value={newService.description}
                    onChange={handleNewServiceChange}
                    placeholder="Description"
                    rows="3"
                    required
                  ></textarea>
                </div>
                <div className="col-12">
                  <ul className="actions">
                    <li><input type="submit" value={loading ? "Adding..." : "Add Service"} className="primary" disabled={loading} /></li>
                  </ul>
                </div>
              </div>
            </form>
          </section>
        )}
        
        <section>
          <h2>Services List</h2>
          {filteredServices.length > 0 ? (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Workers</th>
                    <th>Bookings</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServices.map(service => (
                    <tr key={service.id}>
                      <td>{service.name || 'N/A'}</td>
                      <td>{service.category || 'N/A'}</td>
                      <td>{service.description || 'N/A'}</td>
                      <td>
                        <span className={`status ${service.status?.toLowerCase() || 'active'}`}>
                          {service.status || 'Active'}
                        </span>
                      </td>
                      <td>{service.workers || 0}</td>
                      <td>{service.bookings || 0}</td>
                      <td>
                        <button className="button small">View</button>
                        <button className="button small">Edit</button>
                        <button className="button small">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No services found.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminServices;