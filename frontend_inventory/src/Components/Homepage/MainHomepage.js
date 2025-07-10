import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import heroImage from "../../assets/hero.webp";
import cinnamonImg from "../../assets/cinnomon.jpeg";
import turmericImg from "../../assets/turmericImg.jpeg";
import pepperImg from "../../assets/blackpaper.jpeg";

const MainHomePage = () => {
  return (
    <div>
      {/* Navbar */}
      <header className="navbar">
        <img src={logo} alt="Aroma Spices Logo" />
        <nav className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <a href="http://localhost:3001/products" style={{ textDecoration: 'none', color: '#4E342E', fontWeight: 500, fontSize: '18px', padding: '8px 15px', borderRadius: '6px', transition: 'background-color 0.3s' }}>Products</a>
          <Link to="/orders">Orders</Link>
          <Link to="/contact">Contact Us</Link>
          
          {/* Admin Login button */}
          <Link to="/admin-login" className="login-btn">Admin Login</Link>

          {/* User Login button */}
          <Link to="/user-login" className="login-btn user-login">User Login</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Welcome to Aroma Spices</h1>
          <p>Premium quality spices delivered to your doorstep. Discover the finest selection of spices for all your culinary needs.</p>
          <Link to="/user-login" className="cta-btn">User Login</Link>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Spices" />
        </div>
      </section>

      {/* Featured Products */}
      <section className="section featured-products">
        <h2>Featured Products</h2>
        <div className="products">
          <div className="product-card">
            <img src={cinnamonImg} alt="Cinnamon" />
            <h3>Ceylon Cinnamon Powder</h3>
            <p>Finely ground, aromatic Ceylon cinnamon. Perfect for baking and beverages.</p>
            <p><strong>Rs. 800.00 / 100g</strong></p>
          </div>
          <div className="product-card">
            <img src={turmericImg} alt="Turmeric" />
            <h3>Ground Turmeric</h3>
            <p>Pure, organic turmeric with a vibrant color and strong flavor.</p>
            <p><strong>Rs. 450.00 / 100g</strong></p>
          </div>
          <div className="product-card">
            <img src={pepperImg} alt="Black Pepper" />
            <h3>Black Pepper Whole</h3>
            <p>Sun-dried black peppercorns, ideal for grinding fresh.</p>
            <p><strong>Rs. 600.00 / 100g</strong></p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Ready to Spice Up Your Life?</h2>
        <Link to="/products" className="cta-btn">Shop Now</Link>
      </section>

      {/* Internal CSS */}
      <style jsx>{`
        /* Main styling for the page */
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }

        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 40px;
          background-color: #FFD54F;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .navbar img {
          height: 70px;
        }

        .navbar-links {
          display: flex;
          gap: 30px;
        }

        .navbar-links a {
          text-decoration: none;
          color: #4E342E;
          font-weight: 500;
          font-size: 18px;
          padding: 8px 15px;
          border-radius: 6px;
          transition: background-color 0.3s;
        }

        .navbar-links a:hover {
          background-color: #FFE082;
        }

        .login-btn {
          background-color: #FF7043;
          color: white;
          padding: 8px 20px;
          border-radius: 6px;
        }

        .user-login {
          background-color: #4CAF50;
        }

        .login-btn:hover {
          background-color: #F4511E;
        }

        .user-login:hover {
          background-color: #45A049;
        }

        .cta-btn {
          text-decoration: none;
          background-color: #FF7043;
          color: white;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 18px;
        }

        .cta-btn:hover {
          background-color: #F4511E;
        }

        /* Hero Section */
        .hero {
          display: flex;
          justify-content: space-between;
          padding: 60px 80px;
          background-color: #FFE0B2;
        }

        .hero-text {
          max-width: 50%;
        }

        .hero-text h1 {
          font-size: 48px;
          color: #4E342E;
        }

        .hero-text p {
          font-size: 18px;
          color: #4E342E;
          margin-top: 20px;
        }

        .hero-image img {
          max-width: 50%;
          border-radius: 8px;
        }

        /* Featured Products Section */
        .featured-products {
          padding: 50px 20px;
          background-color: #fff;
          text-align: center;
        }

        .featured-products h2 {
          font-size: 36px;
          margin-bottom: 20px;
          color: #4E342E;
        }

        .products {
          display: flex;
          justify-content: space-around;
          gap: 20px;
        }

        .product-card {
          background-color: #fff;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 20px;
          border-radius: 8px;
          width: 30%;
          text-align: center;
        }

        .product-card img {
          max-width: 100%;
          border-radius: 8px;
        }

        .product-card h3 {
          font-size: 22px;
          margin-top: 15px;
        }

        .cta {
          background-color: #FF7043;
          padding: 40px;
          text-align: center;
          color: white;
        }

        .cta h2 {
          font-size: 36px;
        }
      `}</style>
    </div>
  );
};

export default MainHomePage;
