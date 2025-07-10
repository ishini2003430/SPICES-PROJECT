import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; // Add this import

import logo from '../../assets/logo.png';
import product1 from '../../assets/turmericImg.jpeg';
import product2 from '../../assets/cinnomon.jpeg';
import product3 from '../../assets/blackpaper.jpeg';
import product4 from '../../assets/chilli.jpeg';
import product5 from '../../assets/curry.jpeg';
import product6 from '../../assets/meatcurry.jpeg';
import product7 from '../../assets/cinnomonstick.jpeg';
import product8 from '../../assets/pieces1.jpeg';


const HomeUserDashboard = ({ user }) => {
  return (
    <div className="user-dashboard">
      {/* Navbar */}
      <header className="navbar">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <nav className="navbar-links">
          <Link to="/dashboard">Home</Link>
          <Link to="/about">About Us</Link>
          <a href="http://localhost:3001/products" style={{ textDecoration: 'none', color: '#fff', fontWeight: 600, fontSize: '1.1rem', transition: 'all 0.3s ease' }}>Products</a>
          <Link to="/contact">Contact</Link>
          <a href="http://localhost:3001/cart" title="View Cart" style={{ textDecoration: 'none', color: '#fff', fontWeight: 600, fontSize: '1.1rem', transition: 'all 0.3s ease' }}>
            <FaShoppingCart size={22} color="white" />
          </a>
          <Link to="/herosection">Logout</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to AROMA Spices</h1>
        <p>Bringing rich flavors from farm to table with care and technology.</p>
        {user ? <p>Welcome back, {user.name}!</p> : <p>Please log in to see personalized content.</p>}
      </section>

      {/* Site Features */}
      <section className="site-features">
        <h2>Our Site Features</h2>
        <ul>
          <li><strong>Easy Product Browsing:</strong> Explore our wide variety of spices from the comfort of your home.</li>
          <li><strong>Simple Cart System:</strong> Add your favorite products to the cart and easily proceed to checkout.</li>
          <li><strong>Personalized Experience:</strong> Get personalized recommendations based on your preferences and purchase history.</li>
          <li><strong>Fast and Secure Checkout:</strong> Enjoy a quick and secure payment process for your convenience.</li>
        </ul>
      </section>

      {/* Scrollable Image Gallery */}
      <section className="scroll-gallery">
        <h2>Explore Our Spice Collection</h2>
        <div className="scroll-container">
          <img src={product1} alt="Turmeric" />
          <img src={product2} alt="Cinnamon" />
          <img src={product3} alt="Black Pepper" />
          <img src={product4} alt="Chilli" />
          <img src={product5} alt="Curry" />
          <img src={product6} alt="Meat Curry Powder" />
          <img src={product7} alt="Cinnomon Sticks" />
          <img src={product8} alt="Chilli Pieces" />
        </div>
      </section>

      {/* Product Highlights */}
      <section className="products-showcase">
        <h2>Our Featured Products</h2>
        <div className="products-grid">
          <div className="product-card">
            <img src={product1} alt="Turmeric Powder" />
            <h3>Turmeric Powder</h3>
            <p>Organically sourced turmeric with vibrant color and strong aroma.</p>
            <button>Add to Cart</button> {/* Add to Cart Button */}
          </div>
          <div className="product-card">
            <img src={product2} alt="Cinnamon Powder" />
            <h3>Cinnamon Powder</h3>
            <p>Hand-picked cinnamon powder to ensure purity and freshness.</p>
            <button>Add to Cart</button> {/* Add to Cart Button */}
          </div>
          <div className="product-card">
            <img src={product3} alt="Black Pepper" />
            <h3>Black Pepper</h3>
            <p>Spicy and bold black pepper perfect for any savory dish.</p>
            <button>Add to Cart</button> {/* Add to Cart Button */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Aroma Spices. All rights reserved.</p>
        <div>
          <Link to="/privacy">Privacy Policy</Link> |
          <Link to="/terms"> Terms of Service</Link> |
          <Link to="/contact"> Contact Us</Link>
        </div>
      </footer>

      {/* CSS */}
      <style>{`
        .user-dashboard {
          font-family: 'Segoe UI', sans-serif;
          background-color: #fefce8;
          min-height: 100vh;
          width: 1500px;
          margin-top: -150px;
          overflow-x: hidden;
        }

        /* Navbar */
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(90deg, #f59e0b, #92400e);
          padding: 16px 32px;
          height: 120px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .navbar-logo {
          height: 100px;
        }

        .navbar-links {
          display: flex;
          gap: 20px;
        }

        .navbar-links a {
          text-decoration: none;
          color: #fff;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.3s ease;
        }

        .navbar-links a:hover {
          color: #ffbb33;
        }

        /* Hero Section */
        .hero {
          text-align: center;
          padding: 50px 20px;
          background: url('https://via.placeholder.com/1500x600') no-repeat center center/cover;
          color: white;
          position: relative;
        }

        .hero h1 {
          font-size: 3rem;
          margin-bottom: 10px;
          text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.7);
        }

        .hero p {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          margin-top: 10px;
        }

        /* Site Features */
        .site-features {
          text-align: center;
          padding: 40px 20px;
          background-color: #fdf6e3;
        }

        .site-features h2 {
          color: #92400e;
          margin-bottom: 20px;
          font-size: 2rem;
        }

        .site-features ul {
          list-style: none;
          padding: 0;
        }

        .site-features li {
          font-size: 1.2rem;
          color: #374151;
          margin-bottom: 15px;
        }

        /* Scrollable Image Gallery */
        .scroll-gallery {
          padding: 40px 20px;
          background-color: #fdf6e3;
          text-align: center;
        }

        .scroll-gallery h2 {
          color: #92400e;
          margin-bottom: 20px;
        }

        .scroll-container {
          display: flex;
          overflow-x: auto;
          gap: 16px;
          padding: 10px;
          scroll-behavior: smooth;
        }

        .scroll-container img {
          height: 160px;
          border-radius: 10px;
          flex: 0 0 auto;
          object-fit: cover;
        }

        /* Product Showcase */
        .products-showcase {
          padding: 40px 20px;
          text-align: center;
        }

        .products-showcase h2 {
          font-size: 2rem;
          color: #78350f;
          margin-bottom: 30px;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 24px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .product-card {
          background-color: #fffde7;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }

        .product-card img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: 10px;
          margin-bottom: 12px;
        }

        .product-card h3 {
          margin: 10px 0 6px;
          color: #b45309;
          font-size: 1.5rem;
        }

        .product-card p {
          font-size: 1rem;
          color: #374151;
        }

        .product-card button {
          padding: 10px 20px;
          background-color: #92400e;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .product-card button:hover {
          background-color: #b45309;
          transform: translateY(-3px);
        }

        /* Footer */
        .footer {
          background-color: #92400e;
          color: white;
          text-align: center;
          padding: 20px;
          position: absolute;
          width: 1450px;
         
          margin-top:100px;
        }

        .footer a {
          color: #f59e0b;
          text-decoration: none;
          margin: 0 10px;
        }

        .footer a:hover {
          color: #fff;
        }
      `}</style>
    </div>
  );
};

export default HomeUserDashboard;
