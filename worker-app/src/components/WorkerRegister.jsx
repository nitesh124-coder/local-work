import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import WorkerAuthService from '../services/workerAuthService';

const WorkerRegister = () => {
  const [step, setStep] = useState('phone'); // 'phone', 'otp', 'details', 'skills'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await WorkerAuthService.requestOTP(phone);
      setStep('otp');
    } catch (err) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await WorkerAuthService.verifyOTP(phone, otp);
      setStep('details');
    } catch (err) {
      setError(err.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    setStep('skills');
  };

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSkillsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const workerData = {
        name,
        email,
        phone,
        skills: [...skills],
        role: 'worker'
      };
      
      await WorkerAuthService.register(workerData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">Register as a Worker</h1>
              
              {error && <div className="alert alert-danger">{error}</div>}
              
              {step === 'phone' && (
                <form onSubmit={handlePhoneSubmit}>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                  </div>
                </form>
              )}
              
              {step === 'otp' && (
                <form onSubmit={handleOtpSubmit}>
                  <div className="mb-3">
                    <label htmlFor="otp" className="form-label">Enter OTP</label>
                    <input
                      type="text"
                      className="form-control"
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter the OTP you received"
                      required
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                    <button type="button" onClick={() => setStep('phone')} className="btn btn-secondary">
                      Change Number
                    </button>
                  </div>
                </form>
              )}
              
              {step === 'details' && (
                <form onSubmit={handleDetailsSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Next</button>
                  </div>
                </form>
              )}
              
              {step === 'skills' && (
                <form onSubmit={handleSkillsSubmit}>
                    <div className="mb-3">
                        <h3>Your Skills</h3>
                        <div>
                            {skills.map((skill, index) => (
                                <span key={index} className="badge bg-primary me-2 mb-2">
                                    {skill}
                                    <button type="button" className="btn-close ms-1" aria-label="Remove" onClick={() => handleRemoveSkill(skill)}></button>
                                </span>
                            ))}
                        </div>
                        <div className="input-group mt-3">
                            <input
                                type="text"
                                className="form-control"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                placeholder="Add a skill (e.g., Plumbing, Electrical)"
                            />
                            <button type="button" onClick={handleAddSkill} className="btn btn-outline-secondary">Add Skill</button>
                        </div>
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                </form>
              )}
              
              <p className="mt-3 text-center">
                Already have an account? <Link to="/login">Login here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerRegister;
