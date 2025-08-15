import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './Login';
import LoginUser from './LoginUser';
import SignUpAsAdmin from './SignUpAsAdmin';
import Communication1 from './Communication1';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import Settings from './Settings';
import ViewerDashboard from './ViewerDashboard';
import Report from './Report';
import ResetPassword from './ResetPassword';
import Verified from './Verified';
import MeetingRoom from './Meetings';
import BackHeader from './BackHeader';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      const userData = localStorage.getItem("userData");

      setIsAuthenticated(!!userData);
    };

    handleStorageChange(); // Ensure state is updated on initial render
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

    // ✅ Define username here
    const username = JSON.parse(localStorage.getItem("userData"))?.username || "guest";

  const AppContent = () => {
    const location = useLocation();
    const hideNavbarOnLanding = location.pathname === "/";
    const loginPaths = new Set([
      "/login",
      "/loginuser",
      "/signup",
      "/resetpassword",
      "/verified",
  "/report",
  "/Communication1",
  "/meetings",
      "/settings",
    ]);
    const isAuthPage = loginPaths.has(location.pathname);

    return (
      <>
        {!hideNavbarOnLanding && !isAuthPage && (
          <Navbar showAuthButtons={!isAuthenticated} />
        )}
  {isAuthPage && <BackHeader />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginuser" element={<LoginUser />} />
          <Route path="/signup" element={<SignUpAsAdmin />} />
          {/* Legacy routes redirects to unified signup */}
          <Route path="/select-role" element={<Navigate to="/signup" replace />} />
          <Route path="/signupuser" element={<Navigate to="/signup" replace />} />

          {/* Dashboard access based on authentication */}
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/viewerdashboard"
            element={isAuthenticated ? <ViewerDashboard /> : <Navigate to="/loginuser" />}
          />

          {/* Restricted routes requiring authentication */}
          <Route
            path="/Communication1"
            element={isAuthenticated ? <Communication1 /> : <Navigate to="/login" />}
          />
          <Route
            path="/settings"
            element={isAuthenticated ? <Settings /> : <Navigate to="/login" />}
          />
          <Route
            path="/meetings"
            element={isAuthenticated ? <MeetingRoom username={username} /> : <Navigate to="/login" />}
          />

          <Route path='/report' element={<Report />} />
          <Route path='/resetpassword' element={<ResetPassword />} />
          <Route path='/verified' element={<Verified />} />
        </Routes>
      </>
    );
  };

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
