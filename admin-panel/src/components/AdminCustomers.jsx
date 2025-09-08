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
      // Since there's no specific endpoint for customers in the admin API list,
      // we'll use a generic approach. In a real implementation, you would have
      // a specific endpoint like /admin/customers
      const response = await apiClient.get('/admin/analytics');
      // For now, we'll use mock data since there's no specific API
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
      // Fallback to mock data if API fails
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
      <div id="main">
        <div className="inner">
          <header>
            <h1>Manage Customers</h1>
            <p>View and manage all registered customers.</p>
          </header>
          <p>Loading customers...</p>
        </div>
      </div>
    );
  }

  return (
    <div id="main">
      <div className="inner">
        <header>
          <h1>Manage Customers</h1>
          <p>View and manage all registered customers.</p>
        </header>
        
        {error && <div className="error-message">{error}</div>}
        
        <section>
          <div className="row gtr-uniform">
            <div className="col-6 col-12-xsmall">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search customers..."
              />
            </div>
            <div className="col-6 col-12-xsmall">
              <button className="button primary" onClick={fetchCustomers}>Refresh</button>
            </div>
          </div>
        </section>
        
        <section>
          <h2>Customers List</h2>
          {filteredCustomers.length > 0 ? (
            <div className="table-wrapper">
              <table>
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
                        <span className={`status ${customer.status?.toLowerCase() || 'active'}`}>
                          {customer.status || 'Active'}
                        </span>
                      </td>
                      <td>{customer.totalBookings || 0}</td>
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
            <p>No customers found.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminCustomers;