import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WorkerAuthProvider } from './contexts/WorkerAuthContext';
import WorkerHome from './components/WorkerHome.jsx';
import WorkerDashboard from './components/WorkerDashboard.jsx';
import WorkerProfile from './components/WorkerProfile.jsx';
import WorkerLogin from './components/WorkerLogin.jsx';
import WorkerRegister from './components/WorkerRegister.jsx';
import WorkerNavbar from './components/WorkerNavbar.jsx';
import WorkerFooter from './components/WorkerFooter.jsx';
import './App.css';

function App() {
  return (
    <WorkerAuthProvider>
      <Router>
        <div className="App">
          <WorkerNavbar />
          <main>
            <Routes>
              <Route path="/" element={<WorkerHome />} />
              <Route path="/dashboard" element={<WorkerDashboard />} />
              <Route path="/profile" element={<WorkerProfile />} />
              <Route path="/login" element={<WorkerLogin />} />
              <Route path="/register" element={<WorkerRegister />} />
            </Routes>
          </main>
          <WorkerFooter />
        </div>
      </Router>
    </WorkerAuthProvider>
  );
}

export default App;