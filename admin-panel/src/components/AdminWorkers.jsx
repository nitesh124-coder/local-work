import React, { useState, useEffect } from 'react';
import AdminWorkerService from '../services/adminWorkerService';

const AdminWorkers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWorkers();
  }, []);

  useEffect(() => {
    filterWorkers();
  }, [searchTerm, workers]);

  const fetchWorkers = async () => {
    setLoading(true);
    setError('');
    
    try {
      const workersData = await AdminWorkerService.getAllWorkers();
      setWorkers(workersData.workers || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch workers');
    } finally {
      setLoading(false);
    }
  };

  const filterWorkers = () => {
    if (!searchTerm) {
      setFilteredWorkers(workers);
      return;
    }
    
    const filtered = workers.filter(worker =>
      worker.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (worker.skills && Array.isArray(worker.skills) && 
       worker.skills.some(skill => 
         skill && skill.toLowerCase().includes(searchTerm.toLowerCase())
       ))
    );
    
    setFilteredWorkers(filtered);
  };

  const handleVerifyWorker = async (workerId, isVerified) => {
    try {
      await AdminWorkerService.verifyWorker(workerId, { status: isVerified ? 'verified' : 'rejected' });
      fetchWorkers();
      alert(`Worker ${isVerified ? 'verified' : 'rejected'} successfully!`);
    } catch (err) {
      setError(err.message || `Failed to ${isVerified ? 'verify' : 'reject'} worker`);
    }
  };

  if (loading && workers.length === 0) {
    return (
      <div className="container mt-5">
        <h1>Manage Workers</h1>
        <p>Loading workers...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <header className="mb-4">
        <h1>Manage Workers</h1>
        <p>View and manage all registered workers.</p>
      </header>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="d-flex justify-content-between mb-4">
        <input
          type="text"
          className="form-control w-50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search workers..."
        />
        <button className="btn btn-primary" onClick={fetchWorkers}>Refresh</button>
      </div>
      
      <h2>Workers List</h2>
      {filteredWorkers.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Skills</th>
                <th>Status</th>
                <th>Rating</th>
                <th>Jobs</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkers.map(worker => (
                <tr key={worker.id}>
                  <td>{worker.name || 'N/A'}</td>
                  <td>{worker.email || 'N/A'}</td>
                  <td>{worker.phone || 'N/A'}</td>
                  <td>{(worker.skills && Array.isArray(worker.skills) && worker.skills.length > 0) ? worker.skills.join(', ') : 'N/A'}</td>
                  <td>
                    <span className={`badge bg-${worker.status?.toLowerCase() === 'verified' ? 'success' : (worker.status?.toLowerCase() === 'pending' ? 'warning' : 'danger')}`}>
                      {worker.status || 'Pending'}
                    </span>
                  </td>
                  <td>{worker.rating || 'N/A'}</td>
                  <td>{worker.jobsCompleted || 0}</td>
                  <td>
                    {worker.status === 'pending' && (
                      <>
                        <button 
                          className="btn btn-sm btn-success me-2"
                          onClick={() => handleVerifyWorker(worker.id, true)}
                        >
                          Verify
                        </button>
                        <button 
                          className="btn btn-sm btn-danger me-2"
                          onClick={() => handleVerifyWorker(worker.id, false)}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button className="btn btn-sm btn-info me-2">View</button>
                    <button className="btn btn-sm btn-warning">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No workers found.</p>
      )}
    </div>
  );
};

export default AdminWorkers;
