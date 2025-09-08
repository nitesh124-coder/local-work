import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import AdminDashboard from './components/AdminDashboard.jsx';
import AdminWorkers from './components/AdminWorkers.jsx';
import AdminCustomers from './components/AdminCustomers.jsx';
import AdminServices from './components/AdminServices.jsx';
import AdminReports from './components/AdminReports.jsx';
import AdminLogin from './components/AdminLogin.jsx';
import AdminNavbar from './components/AdminNavbar.jsx';
import AdminFooter from './components/AdminFooter.jsx';
import './App.css';

function App() {
  return (
    <AdminAuthProvider>
      <Router>
        <div className="App">
          <AdminNavbar />
          <main>
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/workers" element={<AdminWorkers />} />
              <Route path="/customers" element={<AdminCustomers />} />
              <Route path="/services" element={<AdminServices />} />
              <Route path="/reports" element={<AdminReports />} />
              <Route path="/login" element={<AdminLogin />} />
            </Routes>
          </main>
          <AdminFooter />
        </div>
      </Router>
    </AdminAuthProvider>
  );
}

export default App;