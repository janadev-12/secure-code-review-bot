import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <div className="home-container">
              <div className="hero-box">
                <h1>🔥 AI Secure Login System</h1>
                <p>
                  Cyber security powered authentication with AI threat detection,
                  bot analysis, anomaly detection, and secure session protection.
                </p>

                <div className="hero-buttons">
                  <a href="/register">Get Started</a>
                  <a href="/login">Login</a>
                </div>
              </div>

              <div className="feature-grid">
                <div className="feature-card">
                  <h3>🤖 AI Risk Analysis</h3>
                  <p>Detects suspicious login behavior using risk scoring.</p>
                </div>

                <div className="feature-card">
                  <h3>🛡️ Bot Detection</h3>
                  <p>Blocks brute-force and automated login attempts.</p>
                </div>

                <div className="feature-card">
                  <h3>🔐 Password Security</h3>
                  <p>Uses bcrypt hashing and strong password validation.</p>
                </div>

                <div className="feature-card">
                  <h3>📊 Secure Dashboard</h3>
                  <p>Shows AI security status and login activity insights.</p>
                </div>
              </div>
            </div>
          }
        />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;