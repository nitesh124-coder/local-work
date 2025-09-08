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
      // Refresh the worker list
      fetchWorkers();
      alert(`Worker ${isVerified ? 'verified' : 'rejected'} successfully!`);
    } catch (err) {
      setError(err.message || `Failed to ${isVerified ? 'verify' : 'reject'} worker`);
    }
  };

  if (loading && workers.length === 0) {
    return (
      <div id="main">
        <div className="inner">
          <header>
            <h1>Manage Workers</h1>
            <p>View and manage all registered workers.</p>
          </header>
          <p>Loading workers...</p>
        </div>
      </div>
    );
  }

  return (
    <div id="main">
      <div className="inner">
        <header>
          <h1>Manage Workers</h1>
          <p>View and manage all registered workers.</p>
        </header>
        
        {error && <div className="error-message">{error}</div>}
        
        <section>
          <div className="row gtr-uniform">
            <div className="col-6 col-12-xsmall">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search workers..."
              />
            </div>
            <div className="col-6 col-12-xsmall">
              <button className="button primary" onClick={fetchWorkers}>Refresh</button>
            </div>
          </div>
        </section>
        
        <section>
          <h2>Workers List</h2>
          {filteredWorkers.length > 0 ? (
            <div className="table-wrapper">
              <table>
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
                        <span className={`status ${worker.status?.toLowerCase() || 'pending'}`}>
                          {worker.status || 'Pending'}
                        </span>
                      </td>
                      <td>{worker.rating || 'N/A'}</td>
                      <td>{worker.jobsCompleted || 0}</td>
                      <td>
                        {worker.status === 'pending' && (
                          <>
                            <button 
                              className="button small" 
                              onClick={() => handleVerifyWorker(worker.id, true)}
                            >
                              Verify
                            </button>
                            <button 
                              className="button small" 
                              onClick={() => handleVerifyWorker(worker.id, false)}
                            >
                              Reject
                            </button>
                          </>
                        )}
                        <button className="button small">View</button>
                        <button className="button small">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No workers found.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminWorkers;