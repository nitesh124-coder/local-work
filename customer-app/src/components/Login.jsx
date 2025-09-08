import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';

const Login = () => {
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
      // Redirect to dashboard after successful login
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="main">
      <div className="inner">
        <h1>Login to Your Account</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        {step === 'phone' ? (
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
        ) : (
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
        
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;