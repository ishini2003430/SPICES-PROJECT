import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/logo.png';
import profileIcon from '../../assets/profile.png';
import './Alert.css';

function Alert() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchLowStockItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/stocks/');
        const stocks = response.data.stocks;
        const lowStock = stocks.filter(stock => stock.quantity <= stock.reorderlevel);
        setLowStockItems(lowStock);
      } catch (error) {
        console.error('Error fetching low stock items:', error);
      }
    };

    fetchLowStockItems();
  }, []);

  const handleLogout = () => {
    navigate('/admin-login');
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedItem(null);
  };

  return (
    <div className="alert-container">
      {/* Original Navbar */}
      <nav className="navbar">
        <div className="sidebar-logo">
          <img src={logo} alt="Company Logo" />
        </div>

        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/add-stock">Add Stock</Link></li>
          <li><Link to="/stock-details">Stock Details</Link></li>
          <li><Link to="/alert">Alert</Link></li>
        </ul>

        <form className="search-form">
          <input type="text" placeholder="Search Product" onChange={(e) => console.log('Search:', e.target.value)} />
          <div className="searchbutton">
            <button type="button">Search</button>
          </div>
        </form>

        <div className="profile-section">
          <img
            src={profileIcon}
            alt="Profile"
            className="profile-icon"
            onClick={() => setShowDropdown(!showDropdown)}
          />
          {showDropdown && (
            <div className="dropdown-menu">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </nav>

      {/* Alert Content */}
      <div className="alert-content">
        <h1>Low Stock Alerts</h1>
        <div className="alert-table-container">
          <table className="alert-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Current Stock</th>
                <th>Reorder Level</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lowStockItems.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity} kg</td>
                  <td>{item.reorderlevel} kg</td>
                  <td>
                    <span className={`status-badge ${item.quantity <= item.reorderlevel ? 'low' : 'normal'}`}>
                      {item.quantity <= item.reorderlevel ? 'Low Stock' : 'Normal'}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="view-button"
                      onClick={() => handleViewDetails(item)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && selectedItem && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Stock Details</h2>
              <button className="close-button" onClick={handleCloseDetails}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <span className="detail-label">Product Name:</span>
                <span className="detail-value">{selectedItem.name}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Category:</span>
                <span className="detail-value">{selectedItem.category}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Current Stock:</span>
                <span className="detail-value">{selectedItem.quantity} kg</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Reorder Level:</span>
                <span className="detail-value">{selectedItem.reorderlevel} kg</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Supplier:</span>
                <span className="detail-value">{selectedItem.supplier}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Location:</span>
                <span className="detail-value">{selectedItem.location}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Last Updated:</span>
                <span className="detail-value">
                  {new Date(selectedItem.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="update-button"
                onClick={() => navigate(`/stock-details/${selectedItem._id}`)}
              >
                Update Stock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Alert;