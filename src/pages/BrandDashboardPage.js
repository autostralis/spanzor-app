import React from 'react';
import './BrandDashboardPage.css';

const BrandDashboardPage = () => {
  return (
    <div className="brand-dashboard">
      <header className="dashboard-header">
        <h1>Brand Dashboard</h1>
        <p>Welcome to your brand management dashboard</p>
      </header>
      
      <main className="dashboard-content">
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h2>Campaign Overview</h2>
            <p>Monitor your active campaigns</p>
          </div>
          
          <div className="dashboard-card">
            <h2>Analytics</h2>
            <p>View performance metrics</p>
          </div>
          
          <div className="dashboard-card">
            <h2>Brand Assets</h2>
            <p>Manage your brand resources</p>
          </div>
          
          <div className="dashboard-card">
            <h2>Settings</h2>
            <p>Configure your brand preferences</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BrandDashboardPage;
