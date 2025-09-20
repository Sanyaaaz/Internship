import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import PostInternship from './pages/dashboard/industry/PostInternship';
import MyInternships from './pages/dashboard/industry/MyInternships';

// Services
import { isAuthenticated } from './services/authService';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const authenticated = isAuthenticated();
  
  if (!authenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated on app load
    setAuthenticated(isAuthenticated());
  }, []);
  
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <div className="dashboard-container">
                <h1>Dashboard</h1>
                <nav>
                  <ul>
                    <li><a href="/dashboard/post-internship">Post Internship</a></li>
                    <li><a href="/dashboard/my-internships">My Internships</a></li>
                  </ul>
                </nav>
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/post-internship" element={
            <ProtectedRoute>
              <PostInternship />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/my-internships" element={
            <ProtectedRoute>
              <MyInternships />
            </ProtectedRoute>
          } />
          
          {/* Redirect to login if not authenticated, otherwise to dashboard */}
          <Route path="/" element={
            authenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
