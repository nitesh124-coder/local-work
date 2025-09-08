import React, { useState, useEffect } from 'react';
import apiClient from '../services/apiClient';

const AdminCustomers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    filterCustomers();
  }, [searchTerm, customers]);

  const fetchCustomers = async () => {
    setLoading(true);
    setError('');
    
    try {
      const mockCustomers = [
        {
          id: 1,
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
          phone: '+1 (555) 111-2222',
          address: '123 Main St, City',
          status: 'Active',
          totalBookings: 12
        },
        {
          id: 2,
          name: 'Robert Brown',
          email: 'robert.brown@example.com',
          phone: '+1 (555) 333-4444',
          address: '456 Oak Ave, City',
          status: 'Active',
          totalBookings: 8
        },
        {
          id: 3,
          name: 'Emily Davis',
          email: 'emily.davis@example.com',
          phone: '+1 (555) 555-6666',
          address: '789 Pine St, City',
          status: 'Inactive',
          totalBookings: 3
        }
      ];
      setCustomers(mockCustomers);
    } catch (err) {
      setError(err.message || 'Failed to fetch customers');
      const mockCustomers = [
        {
          id: 1,
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
          phone: '+1 (555) 111-2222',
          address: '123 Main St, City',
          status: 'Active',
          totalBookings: 12
        },
        {
          id: 2,
          name: 'Robert Brown',
          email: 'robert.brown@example.com',
          phone: '+1 (555) 333-4444',
          address: '456 Oak Ave, City',
          status: 'Active',
          totalBookings: 8
        },
        {
          id: 3,
          name: 'Emily Davis',
          email: 'emily.davis@example.com',
          phone: '+1 (555) 555-6666',
          address: '789 Pine St, City',
          status: 'Inactive',
          totalBookings: 3
        }
      ];
      setCustomers(mockCustomers);
    } finally {
      setLoading(false);
    }
  };

  const filterCustomers = () => {
    if (!searchTerm) {
      setFilteredCustomers(customers);
      return;
    }
    
    const filtered = customers.filter(customer =>
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.address?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredCustomers(filtered);
  };

  if (loading && customers.length === 0) {
    return (
      <div className="container mt-5">
        <h1>Manage Customers</h1>
        <p>Loading customers...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <header className="mb-4">
        <h1>Manage Customers</h1>
        <p>View and manage all registered customers.</p>
      </header>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="d-flex justify-content-between mb-4">
        <input
          type="text"
          className="form-control w-50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search customers..."
        />
        <button className="btn btn-primary" onClick={fetchCustomers}>Refresh</button>
      </div>
      
      <h2>Customers List</h2>
      {filteredCustomers.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Status</th>
                <th>Bookings</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map(customer => (
                <tr key={customer.id}>
                  <td>{customer.name || 'N/A'}</td>
                  <td>{customer.email || 'N/A'}</td>
                  <td>{customer.phone || 'N/A'}</td>
                  <td>{customer.address || 'N/A'}</td>
                  <td>
                    <span className={`badge bg-${customer.status?.toLowerCase() === 'active' ? 'success' : 'danger'}`}>
                      {customer.status || 'Active'}
                    </span>
                  </td>
                  <td>{customer.totalBookings || 0}</td>
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
        <p>No customers found.</p>
      )}
    </div>
  );
};

export default AdminCustomers;
