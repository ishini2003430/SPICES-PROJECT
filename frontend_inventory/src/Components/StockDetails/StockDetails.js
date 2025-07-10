import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/logo.png';
import profileIcon from '../../assets/profile.png';
import './StockDetails.css';

function StockDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    quantity: '',
    reorderlevel: '',
    location: '',
    supplier: ''
  });

  useEffect(() => {
    const fetchStockDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/stocks/${id}`);
        setStock(response.data.stock);
        setFormData({
          quantity: response.data.stock.quantity,
          reorderlevel: response.data.stock.reorderlevel,
          location: response.data.stock.location,
          supplier: response.data.stock.supplier
        });
        setLoading(false);
      } catch (error) {
        setError('Error fetching stock details');
        setLoading(false);
      }
    };

    fetchStockDetails();
  }, [id]);

  const handleLogout = () => {
    navigate('/admin-login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/stocks/${id}`, formData);
      // Refresh stock details after update
      const response = await axios.get(`http://localhost:5000/stocks/${id}`);
      setStock(response.data.stock);
      alert('Stock updated successfully!');
    } catch (error) {
      alert('Error updating stock');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!stock) return <div className="error">Stock not found</div>;

  return (
    <div className="stock-details-container">
      {/* Navbar */}
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

      {/* Stock Details Content */}
      <div className="stock-details-content">
        <div className="details-header">
          <h1>Stock Details</h1>
          <div className="status-badge">
            {stock.quantity <= stock.reorderlevel ? 'Low Stock' : 'In Stock'}
          </div>
        </div>

        <div className="details-grid">
          <div className="details-card">
            <h2>Current Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Product Name</label>
                <span>{stock.name}</span>
              </div>
              <div className="info-item">
                <label>Category</label>
                <span>{stock.category}</span>
              </div>
              <div className="info-item">
                <label>Current Stock</label>
                <span>{stock.quantity} kg</span>
              </div>
              <div className="info-item">
                <label>Reorder Level</label>
                <span>{stock.reorderlevel} kg</span>
              </div>
              <div className="info-item">
                <label>Location</label>
                <span>{stock.location}</span>
              </div>
              <div className="info-item">
                <label>Supplier</label>
                <span>{stock.supplier}</span>
              </div>
              <div className="info-item">
                <label>Last Updated</label>
                <span>{new Date(stock.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="update-card">
            <h2>Update Stock</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Quantity (kg)</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Reorder Level (kg)</label>
                <input
                  type="number"
                  name="reorderlevel"
                  value={formData.reorderlevel}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Supplier</label>
                <input
                  type="text"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="button-group">
                <button type="submit" className="update-button">Update Stock</button>
                <button type="button" className="cancel-button" onClick={() => navigate('/stock-details')}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockDetails; 