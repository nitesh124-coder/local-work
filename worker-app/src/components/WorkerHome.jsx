import React from 'react';
import { Link } from 'react-router-dom';

const WorkerHome = () => {
  return (
    <div>
      <div className="container-fluid bg-light p-5 text-center">
        <h1 className="display-4">Join Our Network of Skilled Workers</h1>
        <p className="lead">Get More Jobs, Earn More. Local Skill Alerts connects you with customers in your area who need your skills.</p>
        <Link className="btn btn-primary btn-lg" to="/register" role="button">Register Today</Link>
      </div>

      <div className="container mt-5">
        <h2 className="text-center mb-4">How It Works</h2>
        <div className="row text-center">
          <div className="col-md-4">
            <h3>1. Register</h3>
            <p>Create your profile and specify your skills and service areas.</p>
          </div>
          <div className="col-md-4">
            <h3>2. Get Alerts</h3>
            <p>Receive notifications when customers request services you provide.</p>
          </div>
          <div className="col-md-4">
            <h3>3. Earn</h3>
            <p>Complete jobs and get paid directly through our secure platform.</p>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <h2 className="text-center mb-4">Why Join Local Skill Alerts?</h2>
        <div className="row">
          <div className="col-md-6">
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><strong>More Jobs:</strong> Access to a steady stream of customers in your area</li>
              <li className="list-group-item"><strong>Fair Payments:</strong> Competitive pricing with quick payments</li>
              <li className="list-group-item"><strong>Verified Customers:</strong> All customers are verified for your safety</li>
            </ul>
          </div>
          <div className="col-md-6">
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><strong>Support:</strong> Dedicated support team to help with any issues</li>
              <li className="list-group-item"><strong>Flexible Schedule:</strong> Work when it's convenient for you</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-4">
            <Link to="/register" className="btn btn-primary me-2">Register as a Worker</Link>
            <Link to="/login" className="btn btn-secondary">Worker Login</Link>
        </div>
      </div>
    </div>
  );
};

export default WorkerHome;
