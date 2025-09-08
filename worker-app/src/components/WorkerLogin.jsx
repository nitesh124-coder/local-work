import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import WorkerAuthService from '../services/workerAuthService';

const WorkerLogin = () => {
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
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
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to verify OTP');
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
              <h1 className="card-title text-center">Worker Login</h1>
              
              {error && <div className="alert alert-danger">{error}</div>}
              
              {step === 'phone' ? (
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
              ) : (
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
              
              <p className="mt-3 text-center">
                Don't have an account? <Link to="/register">Register here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerLogin;
