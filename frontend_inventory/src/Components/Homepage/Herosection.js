import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png"; // Import your logo image

function HeroSection() {
  const navigate = useNavigate();

  const handleUserLoginClick = () => {
    navigate('/login');
  };

  const handleAdminLoginClick = () => {
    navigate('/admin-login');
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 20px', width: '100%' }}>
      
      {/* Back Button */}
      <button 
        onClick={handleBackClick}
        style={{
          alignSelf: 'flex-start',
          marginBottom: '20px',
          marginLeft: '20px',
          backgroundColor: '#fff',
          color: '#d97706',
          border: '1px solid #d97706',
          padding: '10px 20px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        ← Back to Home
      </button>

      {/* Hero Card */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '40px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '600px',
        width: '90%'
      }}>
        <div style={{
          backgroundColor: '#f8f4e9',
          borderRadius: '50%',
          width: '100px',
          height: '100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto 20px'
        }}>
          <img src={logo} alt="Aroma Spices Logo" style={{ maxWidth: '80%', maxHeight: '100%' }} />
        </div>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#27272a', marginBottom: '15px' }}>
          <span style={{ color: '#d97706' }}>AROMA</span><span style={{ color: '#27272a' }}>SPICES</span>
        </h1>
        <p style={{ color: '#52525b', fontSize: '18px', lineHeight: '1.6', marginBottom: '30px' }}>
          The complete management system for your spice business. Track inventory, manage suppliers, handle orders, and more.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button 
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              border: 'none',
              backgroundColor: '#d97706',
              color: '#fff',
              marginRight: '15px',
              display: 'flex',
              alignItems: 'center'
            }}
            onClick={handleUserLoginClick}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '20px', height: '20px', marginRight: '8px' }}>
              <path d="M12 4a4 4 0 100 8 4 4 0 000-8zm0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z" />
            </svg>
            User Login
          </button>
          <button 
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              border: '1px solid #d97706',
              backgroundColor: '#fff',
              color: '#d97706',
              display: 'flex',
              alignItems: 'center'
            }}
            onClick={handleAdminLoginClick}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '20px', height: '20px', marginRight: '8px' }}>
              <path d="M12 2a5 5 0 00-5 5v11a5 5 0 0010 0V7a5 5 0 00-5-5zm0 12.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
            </svg>
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
