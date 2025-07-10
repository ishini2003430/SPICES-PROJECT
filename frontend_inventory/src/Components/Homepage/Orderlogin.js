import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShieldAlt } from 'react-icons/fa';
import logo from "../../assets/logo.png";

function OrderLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8f4e9',
    padding: '20px',
  };

  const loginCardStyle = {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '50px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '700px', // Increased width
    width: '300px',
  };

  const logoContainerStyle = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    overflow: 'hidden',
    margin: '0 auto 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f4e9',
  };

  const logoStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  };

  const titleStyle = {
    fontSize: '1.8em',
    fontWeight: 'bold',
    color: '#27272a',
    marginBottom: '10px',
  };

  const subtitleStyle = {
    color: '#52525b',
    fontSize: '0.9em',
    marginBottom: '20px',
  };

  const inputGroupStyle = {
    marginBottom: '15px',
    textAlign: 'left',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    color: '#27272a',
    fontSize: '0.9em',
    fontWeight: 'bold',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #d4d4d8',
    fontSize: '1em',
    boxSizing: 'border-box',
  };

  const forgotPasswordStyle = {
    textAlign: 'right',
    fontSize: '0.8em',
    color: '#d97706',
    cursor: 'pointer',
  };

  const loginButtonStyle = {
    backgroundColor: '#d97706',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '1em',
    cursor: 'pointer',
    border: 'none',
    width: '100%',
    marginTop: '20px',
  };

  const errorTextStyle = {
    color: 'red',
    fontSize: '0.8em',
    marginTop: '10px',
  };

  const linkTextStyle = {
    marginTop: '20px',
    fontSize: '0.9em',
    color: '#52525b',
  };

  const linkStyle = {
    color: '#d97706',
    cursor: 'pointer',
    marginLeft: '5px',
  };

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleAdminLogin = () => {
    if (username === 'order' && password === 'order@123') {
      window.location.href = 'http://localhost:3001/';
    } else {
      setError('Invalid username or password');
    }
  };

  const handleUserLoginClick = () => navigate('/');
  const handleBackToHomeClick = () => navigate('/');

  return (
    <div style={containerStyle}>
      <div style={loginCardStyle}>
        <div style={logoContainerStyle}>
          <img src={logo} alt="Aroma Spices Logo" style={logoStyle} />
        </div>
        <h2 style={titleStyle}>Sales & Order Manager Login</h2>
        <p style={subtitleStyle}>Sign in to access the admin panel</p>

        <div style={inputGroupStyle}>
          <label htmlFor="username" style={labelStyle}>Username</label>
          <input
            type="text"
            id="username"
            style={inputStyle}
            value={username}
            onChange={handleUsernameChange}
          />
        </div>

        <div style={inputGroupStyle}>
          <label htmlFor="password" style={labelStyle}>Password</label>
          <input
            type="password"
            id="password"
            style={inputStyle}
            value={password}
            onChange={handlePasswordChange}
          />
          <p style={forgotPasswordStyle}>Forgot password?</p>
        </div>

        {error && <p style={errorTextStyle}>{error}</p>}

        <button style={loginButtonStyle} onClick={handleAdminLogin}>
          Sign in as Admin
        </button>

        <p style={linkTextStyle}>
          Not an admin?
          <span style={linkStyle} onClick={handleUserLoginClick}>
            User login
          </span>
        </p>
        <p style={linkTextStyle}>
          <span style={linkStyle} onClick={handleBackToHomeClick}>
            Back to home
          </span>
        </p>
      </div>
    </div>
  );
}

export default OrderLoginPage;
