import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"; // Make sure logo path is correct

const HomeSite = () => {
  return (
    <div className="home-site-container">
      {/* Internal CSS */}
      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
          background-color: #fffbea;
          color: #4e342e;
        }

        .home-site-container {
          padding: 30px;
          max-width: 1200px;
          margin: auto;
        }

        .admin-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .admin-logo {
          height: 80px;
          margin-bottom: 15px;
        }

        .admin-header h1 {
          font-size: 32px;
          color: #bf360c;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 30px;
        }

        .dashboard-card {
          background-color: #ffe082;
          padding: 30px 20px;
          border-radius: 15px;
          text-align: center;
          text-decoration: none;
          color: #3e2723;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease, background-color 0.3s ease;
        }

        .dashboard-card:hover {
          background-color: #ffd54f;
          transform: translateY(-5px);
        }

        .dashboard-card h2 {
          font-size: 22px;
          margin-bottom: 10px;
        }

        .dashboard-card p {
          font-size: 16px;
          color: #5d4037;
        }

        @media (max-width: 768px) {
          .admin-header h1 {
            font-size: 24px;
          }

          .dashboard-card {
            padding: 20px 15px;
          }

          .dashboard-card h2 {
            font-size: 20px;
          }

          .dashboard-card p {
            font-size: 14px;
          }
        }
      `}</style>

      {/* Header */}
      <div className="admin-header">
        <img src={logo} alt="Logo" className="admin-logo" />
        <h1>Welcome to Aroma Spices Admin Dashboard</h1>
        <p>Manage all systems from one central dashboard</p>
      </div>

      {/* Dashboard Cards */}
      <div className="dashboard-grid">
        <Link to="/finance" className="dashboard-card">
          <h2>Finance Management</h2>
          <p>Monitor revenue, expenses, and generate reports.</p>
        </Link>

        <Link to="/inventory" className="dashboard-card">
          <h2>Inventory Management</h2>
          <p>Track stock levels, set reorder alerts, and manage warehouse.</p>
        </Link>

        <Link to="/supply" className="dashboard-card">
          <h2>Supply Management</h2>
          <p>Oversee suppliers, procurement orders, and deliveries.</p>
        </Link>

        <Link to="/sales" className="dashboard-card">
          <h2>Sales & Order Management</h2>
          <p>Handle customer orders, track sales and manage fulfillment.</p>
        </Link>

        <Link to="/products" className="dashboard-card">
          <h2>Product Management</h2>
          <p>Add, edit or remove product listings and categories.</p>
        </Link>
      </div>
    </div>
  );
};

export default HomeSite;
