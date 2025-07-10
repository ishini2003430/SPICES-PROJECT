import React from 'react';
import '../Styles/Header.css';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

const Header = () => {
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <header className="header">
      <div className="header-left">
        <img src="./assets/logo.jpg" alt="Aroma Logo" className="logo" />
        <span className="brand">AROMA</span>
      </div>
      <nav className="header-nav">
        <a href="/">Home</a>
        <Link to="http://localhost:3001/products">Products</Link>
        <a href="/about">About</a>
        <Link to="/admin">Admin</Link>
      </nav>
      <div className="header-actions">
        <button className="login-btn">Login</button>
        <button className="register-btn">Register</button>
        <Link to="/cart" className="cart-link" style={{position:'relative', display:'inline-block'}}>
          <span className="cart-icon" title="Cart">🛒</span>
          {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-10px',
              background: '#ffa600',
              color: '#fff',
              borderRadius: '50%',
              minWidth: 20,
              height: 20,
              fontSize: '0.95rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
              zIndex: 2
            }}>{cartCount}</span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header; 