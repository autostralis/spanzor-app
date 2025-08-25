import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { auth } from './firebase';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Analytics from './components/Analytics';
import './App.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Persist auth state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Spanzor Full Stack Demo</h1>
          {user && (
            <nav className="main-navigation">
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/profile" className="nav-link">Profile</Link>
              <Link to="/analytics" className="nav-link">Analytics</Link>
              <Link to="/settings" className="nav-link">Settings</Link>
              <button 
                onClick={() => auth.signOut()} 
                className="logout-btn"
              >
                Logout
              </button>
            </nav>
          )}
        </header>

        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/login" 
              element={
                !user ? (
                  <Login setUser={setUser} />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              } 
            />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                user ? (
                  <Dashboard user={user} />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            
            <Route 
              path="/profile" 
              element={
                user ? (
                  <Profile user={user} />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            
            <Route 
              path="/analytics" 
              element={
                user ? (
                  <Analytics user={user} />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            
            <Route 
              path="/settings" 
              element={
                user ? (
                  <Settings user={user} />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            
            {/* Default redirects */}
            <Route 
              path="/" 
              element={
                user ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            
            {/* Catch all route - 404 */}
            <Route 
              path="*" 
              element={
                <div className="not-found">
                  <h2>Page Not Found</h2>
                  <p>The page you're looking for doesn't exist.</p>
                  <Link to={user ? "/dashboard" : "/login"} className="home-link">
                    Go {user ? "to Dashboard" : "to Login"}
                  </Link>
                </div>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
