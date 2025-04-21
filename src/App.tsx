import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import BookingPage from './pages/BookingPage';
import CustomerDashboard from './pages/dashboards/CustomerDashboard';
import TechnicianDashboard from './pages/dashboards/TechnicianDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import TechnicianApplicationPage from './pages/TechnicianApplicationPage';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />
          <main className={`flex-grow ${showMobileMenu ? 'hidden' : 'block'}`}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/apply" element={<TechnicianApplicationPage />} />
              
              <Route 
                path="/dashboard/customer/*" 
                element={
                  <ProtectedRoute role="customer">
                    <CustomerDashboard />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/dashboard/technician/*" 
                element={
                  <ProtectedRoute role="technician">
                    <TechnicianDashboard />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/dashboard/admin/*" 
                element={
                  <ProtectedRoute role="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;