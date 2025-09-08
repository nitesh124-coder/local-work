import React from 'react';
import { Link } from 'react-router-dom';

const WorkerHome = () => {
  return (
    <div id="main">
      <div className="inner">
        <header>
          <h1>Join Our Network of Skilled Workers<br />
          Get More Jobs, Earn More</h1>
          <p>Local Skill Alerts connects you with customers in your area who need your skills. Register today to start receiving job alerts.</p>
        </header>
        
        <section>
          <h2>How It Works</h2>
          <div className="box alt">
            <div className="row gtr-uniform">
              <div className="col-4 col-12-medium">
                <h3>1. Register</h3>
                <p>Create your profile and specify your skills and service areas.</p>
              </div>
              <div className="col-4 col-12-medium">
                <h3>2. Get Alerts</h3>
                <p>Receive notifications when customers request services you provide.</p>
              </div>
              <div className="col-4 col-12-medium">
                <h3>3. Earn</h3>
                <p>Complete jobs and get paid directly through our secure platform.</p>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <h2>Why Join Local Skill Alerts?</h2>
          <ul>
            <li><strong>More Jobs:</strong> Access to a steady stream of customers in your area</li>
            <li><strong>Fair Payments:</strong> Competitive pricing with quick payments</li>
            <li><strong>Verified Customers:</strong> All customers are verified for your safety</li>
            <li><strong>Support:</strong> Dedicated support team to help with any issues</li>
            <li><strong>Flexible Schedule:</strong> Work when it's convenient for you</li>
          </ul>
          
          <ul className="actions">
            <li><Link to="/register" className="button primary">Register as a Worker</Link></li>
            <li><Link to="/login" className="button">Worker Login</Link></li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default WorkerHome;