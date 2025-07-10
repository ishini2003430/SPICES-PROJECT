import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import profileIcon from '../../assets/profile.png';
import './PrivacyPolicy.css';

function PrivacyPolicy() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    navigate('/admin-login');
  };

  return (
    <div className="privacy-policy-container">
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

      {/* Privacy Policy Content */}
      <div className="privacy-content">
        <div className="privacy-header">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="privacy-sections">
          <section className="policy-section">
            <h2>1. Information We Collect</h2>
            <div className="section-content">
              <p>We collect information that you provide directly to us, including:</p>
              <ul>
                <li>Account information (name, email, password)</li>
                <li>Inventory management data</li>
                <li>Transaction history</li>
                <li>Communication preferences</li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <h2>2. How We Use Your Information</h2>
            <div className="section-content">
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide and maintain our services</li>
                <li>Process your transactions</li>
                <li>Send you important updates</li>
                <li>Improve our services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <h2>3. Data Security</h2>
            <div className="section-content">
              <p>We implement appropriate security measures to protect your information:</p>
              <ul>
                <li>Encryption of sensitive data</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
                <li>Secure data storage</li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <h2>4. Your Rights</h2>
            <div className="section-content">
              <p>You have the right to:</p>
              <ul>
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of communications</li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <h2>5. Contact Us</h2>
            <div className="section-content">
              <p>If you have any questions about this Privacy Policy, please contact us:</p>
              <div className="contact-info">
                <p>Email: privacy@spicesmanagement.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Address: 123 Spice Street, Spice City, SC 12345</p>
              </div>
            </div>
          </section>
        </div>

        <div className="privacy-footer">
          <p>By using our services, you agree to this Privacy Policy.</p>
          <button className="accept-button" onClick={() => navigate('/home')}>
            I Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy; 