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
      <div className="container mt-5">
        <h1>Manage Services</h1>
        <p>Loading services...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <header className="mb-4">
        <h1>Manage Services</h1>
        <p>View and manage all available services.</p>
      </header>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="d-flex justify-content-between mb-4">
        <input
          type="text"
          className="form-control w-50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search services..."
        />
        <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Cancel' : 'Add New Service'}
        </button>
      </div>
      
      {showAddForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="card-title">Add New Service</h2>
            <form onSubmit={handleAddService}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="name" className="form-label">Service Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={newService.name}
                    onChange={handleNewServiceChange}
                    placeholder="e.g., Plumbing"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="category" className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    name="category"
                    value={newService.category}
                    onChange={handleNewServiceChange}
                    placeholder="e.g., Home Maintenance"
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={newService.description}
                  onChange={handleNewServiceChange}
                  rows="3"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Adding...' : 'Add Service'}
              </button>
            </form>
          </div>
        </div>
      )}
      
      <h2>Services List</h2>
      {filteredServices.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped">
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
                    <span className={`badge bg-${service.status?.toLowerCase() === 'active' ? 'success' : 'danger'}`}>
                      {service.status || 'Active'}
                    </span>
                  </td>
                  <td>{service.workers || 0}</td>
                  <td>{service.bookings || 0}</td>
                  <td>
                    <button className="btn btn-sm btn-info me-2">View</button>
                    <button className="btn btn-sm btn-warning me-2">Edit</button>
                    <button className="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No services found.</p>
      )}
    </div>
  );
};

export default AdminServices;
