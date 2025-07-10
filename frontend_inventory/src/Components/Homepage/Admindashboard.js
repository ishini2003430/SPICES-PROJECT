import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png";
import { FaBox, FaMoneyBill, FaTruck, FaShoppingCart, FaCubes } from 'react-icons/fa';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function AdminDashboard() {
  const navigate = useNavigate();

  const modules = [
    {
      label: 'Inventory Management',
      icon: <FaBox />,
      path: '/inventory-login',
      bgColor: '#fef3c7',
      description: 'Track and manage spice inventory levels',
    },
    {
      label: 'Order Management',
      icon: <FaShoppingCart />,
      path: '/sales-login',
      bgColor: '#dbeafe',
      description: 'Process and fulfill customer orders',
    },
    {
      label: 'Supplier Management',
      icon: <FaTruck />,
      path: '/supply-login',
      bgColor: '#d1fae5',
      description: 'Manage supplier relationships and procurement',
    },
    {
      label: 'Finance Management',
      icon: <FaMoneyBill />,
      path: '/finance-login',
      bgColor: '#ede9fe',
      description: 'Track expenses, revenue, and financial reports',
    },
    {
      label: 'Product Management',
      icon: <FaCubes />,
      path: '/product-login',
      bgColor: '#fee2e2',
      description: 'Manage your product catalog and offerings',
    },
  ];

  const data = [
    { name: 'Jan', stock: 400, orders: 240 },
    { name: 'Feb', stock: 300, orders: 139 },
    { name: 'Mar', stock: 200, orders: 980 },
    { name: 'Apr', stock: 278, orders: 390 },
    { name: 'May', stock: 189, orders: 480 },
  ];

  const handleNavigate = (path) => () => navigate(path);
  const handleGoHome = () => navigate('/'); // Handle navigation to home page

  return (
    <>
      <style>
        {`
        .admin-container {
          min-height: 100vh;
          background-color: #f8f4e9;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 30px;
          position: relative;
        }
        .admin-logo {
          height: 150px;
          margin-bottom: 20px;
          margin-left:500px;
        }
        .admin-heading {
          font-size: 2em;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 5px;
        }
        .admin-subheading {
          font-size: 1.1em;
          color: #6b7280;
          margin-bottom: 30px;
        }
        .admin-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
        .admin-module-card {
          border-radius: 12px;
          padding: 20px;
          cursor: pointer;
          transition: transform 0.2s;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }
        .admin-icon {
          font-size: 2em;
          margin-bottom: 10px;
          color: #374151;
        }
        .admin-module-title {
          font-size: 1.1em;
          font-weight: 600;
          margin-bottom: 5px;
          color: #111827;
        }
        .admin-module-description {
          font-size: 0.9em;
          color: #4b5563;
          margin-bottom: 15px;
        }
        .admin-access-button {
          padding: 8px 12px;
          background-color: #1f2937;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 0.85em;
          cursor: pointer;
        }
        .admin-graph-section {
          background-color: #f3f4f6;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 40px;
        }
        .admin-graph-title {
          font-size: 1.2em;
          font-weight: bold;
          margin-bottom: 10px;
          color: #111827;
        }
        .admin-footer {
          background-color: #f3f4f6;
          padding: 20px;
          border-radius: 12px;
        }
        .admin-getting-started {
          font-size: 1.2em;
          font-weight: bold;
          margin-bottom: 10px;
          color: #111827;
        }

        /* Back to Home Button */
        .back-to-home-button {
          position: absolute;
          top: 20px;
          left: 20px;
          background-color:rgb(161, 103, 53);
          color: white;
          padding: 10px 20px;
          font-size: 1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .back-to-home-button:hover {
          background-color:rgb(230, 183, 108);
        }
        `}
      </style>

      <div className="admin-container">
        {/* Back to Home Button */}
        <button className="back-to-home-button" onClick={handleGoHome}>
          Back to Home
        </button>

        <div className="admin-card">
          <img src={logo} alt="Aroma Logo" className="admin-logo" />
          <h1 className="admin-heading">Welcome to AROMA, Admin!</h1>
          <p className="admin-subheading">Spice Manufacturing Management System</p>

          <div className="admin-grid">
            {modules.map((module, index) => (
              <div
                key={index}
                className="admin-module-card"
                style={{ backgroundColor: module.bgColor }}
                onClick={handleNavigate(module.path)}
              >
                <div className="admin-icon">{module.icon}</div>
                <h3 className="admin-module-title">{module.label}</h3>
                <p className="admin-module-description">{module.description}</p>
                <button className="admin-access-button">Access Module</button>
              </div>
            ))}
          </div>

          <div className="admin-graph-section">
            <h2 className="admin-graph-title">Stock Movement Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="stock" stroke="#8884d8" name="Stock" />
                <Line type="monotone" dataKey="orders" stroke="#82ca9d" name="Orders" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="admin-footer">
            <h2 className="admin-getting-started">Getting Started</h2>
            <p>
              AROMA is a comprehensive spice manufacturing management system designed to help you track inventory,
              manage orders, handle supplier relationships, monitor finances, and organize your product catalog.
              Select one of the modules above to get started with managing your spice manufacturing business.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
