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
        skills: [...skills], // Ensure we're sending a clean array
        role: 'worker' // Default role for worker app
      };
      
      await WorkerAuthService.register(workerData);
      // Redirect to dashboard after successful registration
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="main">
      <div className="inner">
        <h1>Register as a Worker</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        {step === 'phone' && (
          <form method="post" onSubmit={handlePhoneSubmit}>
            <div className="row gtr-uniform">
              <div className="col-12">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  required
                />
              </div>
              <div className="col-12">
                <ul className="actions">
                  <li><input type="submit" value={loading ? "Sending OTP..." : "Send OTP"} className="primary" disabled={loading} /></li>
                </ul>
              </div>
            </div>
          </form>
        )}
        
        {step === 'otp' && (
          <form method="post" onSubmit={handleOtpSubmit}>
            <div className="row gtr-uniform">
              <div className="col-12">
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  required
                />
              </div>
              <div className="col-12">
                <ul className="actions">
                  <li><input type="submit" value={loading ? "Verifying..." : "Verify OTP"} className="primary" disabled={loading} /></li>
                  <li><button type="button" onClick={() => setStep('phone')} className="button">Change Number</button></li>
                </ul>
              </div>
            </div>
          </form>
        )}
        
        {step === 'details' && (
          <form method="post" onSubmit={handleDetailsSubmit}>
            <div className="row gtr-uniform">
              <div className="col-12">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  required
                />
              </div>
              <div className="col-12">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="col-12">
                <ul className="actions">
                  <li><input type="submit" value="Next" className="primary" /></li>
                </ul>
              </div>
            </div>
          </form>
        )}
        
        {step === 'skills' && (
          <form method="post" onSubmit={handleSkillsSubmit}>
            <div className="row gtr-uniform">
              <div className="col-12">
                <h3>Skills</h3>
                <div className="skills-container">
                  {skills.map((skill, index) => (
                    <span key={`${skill}-${index}`} className="skill-tag">
                      {skill}
                      <button
                        type="button"
                        className="remove-skill"
                        onClick={() => handleRemoveSkill(skill)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="add-skill">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill (e.g., Plumbing, Electrical)"
                  />
                  <button type="button" onClick={handleAddSkill} className="button small">
                    Add Skill
                  </button>
                </div>
              </div>
              <div className="col-12">
                <ul className="actions">
                  <li><input type="submit" value={loading ? "Registering..." : "Register"} className="primary" disabled={loading} /></li>
                </ul>
              </div>
            </div>
          </form>
        )}
        
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default WorkerRegister;