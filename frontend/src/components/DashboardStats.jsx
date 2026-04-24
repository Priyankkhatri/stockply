import React from 'react';
import './DashboardStats.css';

const StatCard = ({ label, value, colorClass = 'text-text' }) => (
  <div className="stat-card">
    <p className="stat-label">{label}</p>
    <h3 className={`stat-value ${colorClass}`}>{value}</h3>
  </div>
);

const DashboardStats = ({ stats }) => {
  return (
    <div className="dashboard-stats-grid">
      {stats.map((stat, i) => (
        <StatCard key={i} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;
