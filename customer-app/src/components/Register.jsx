import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';

const Register = () => {
  const [step, setStep] = useState('phone'); // 'phone', 'otp', or 'details'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await AuthService.requestOTP(phone);
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
      await AuthService.verifyOTP(phone, otp);
      setStep('details');
    } catch (err) {
      setError(err.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const userData = {
        name,
        email,
        phone,
        role: 'customer'
      };
      
      await AuthService.register(userData);
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
              <h1 className="card-title text-center">Create an Account</h1>
              
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

export default Register;
