import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import heroImage from "../../assets/hero.webp";
import cinnamonImg from "../../assets/cinnomon.jpeg";
import turmericImg from "../../assets/turmericImg.jpeg";
import pepperImg from "../../assets/blackpaper.jpeg";

const HomePage = () => {
  return (
    <div>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body, html {
          font-family: 'Segoe UI', sans-serif;
          background-color: #FFF8E1;
          color: #4E342E;
        }
        .navbar {
          margin-top:-150px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 40px;
          background-color: rgb(223, 145, 63);
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .navbar img {
          height: 80px;
        }
        .navbar-links {
          display: flex;
          gap: 50px;
        }
        .navbar-links a {
          text-decoration: none;
          color: #4E342E;
          font-weight: 500;
          font-size: 18px;
          padding: 8px 12px;
          border-radius: 6px;
          transition: background-color 0.3s;
        }
        .navbar-links a:hover {
          background-color: #FFE082;
        }
        .hero {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 80px 60px;
          background: linear-gradient(to right, #FFF3E0, #FFE0B2);
        }
        .hero-text {
          max-width: 50%;
        }
        .hero-text h1 {
          font-size: 48px;
          margin-bottom: 20px;
          color: #BF360C;
        }
        .hero-text p {
          font-size: 20px;
          margin-bottom: 30px;
        }
        .hero-text a {
          text-decoration: none;
          background-color: #FF7043;
          color: white;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 18px;
          transition: background-color 0.3s;
        }
        .hero-text a:hover {
          background-color: #F4511E;
        }
        .hero-image img {
          max-width: 450px;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .section {
          padding: 60px 80px;
          background-color: #FFF3E0;
        }
        .section h2 {
          font-size: 36px;
          margin-bottom: 20px;
          color: #BF360C;
        }
        .section p {
          font-size: 18px;
          max-width: 800px;
        }
        .features {
          display: flex;
          gap: 30px;
          margin-top: 30px;
        }
        .feature-card {
          background: #FFFFFF;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          flex: 1;
          text-align: center;
        }
        .feature-card h3 {
          margin-bottom: 10px;
          color: #E64A19;
        }
        .products {
          display: flex;
          gap: 30px;
          flex-wrap: wrap;
          margin-top: 30px;
        }
        .product-card {
          flex: 1;
          min-width: 250px;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          text-align: center;
        }
        .product-card img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: 8px;
        }
        .product-card h3 {
          margin-top: 15px;
          color: #BF360C;
        }
        .product-card p {
          font-size: 14px;
          color: #6D4C41;
        }
        .cta {
          text-align: center;
          padding: 40px 20px;
          background-color: #FFE082;
        }
        .cta h2 {
          margin-bottom: 20px;
        }
        .cta a {
          background-color: #F57C00;
          color: white;
          padding: 12px 24px;
          font-size: 18px;
          border-radius: 6px;
          text-decoration: none;
        }
        .cta a:hover {
          background-color: #EF6C00;
        }
        .footer {
          background-color: rgb(223, 145, 63);
          text-align: center;
          padding: 30px 20px;
          color: #4E342E;
          font-size: 16px;
          margin-top: 40px;
          border-top: 1px solid #BCAAA4;
        }
        .footer a {
          color: #4E342E;
          text-decoration: none;
          margin: 0 10px;
          font-weight: 500;
        }
        .footer a:hover {
          text-decoration: underline;
        }
        @media (max-width: 768px) {
          .hero {
            flex-direction: column;
            text-align: center;
            padding: 40px 20px;
          }
          .hero-text, .hero-image {
            max-width: 100%;
          }
          .features, .products {
            flex-direction: column;
          }
          .section {
            padding: 40px 20px;
          }
        }
      `}</style>

      {/* Navbar */}
      <header className="navbar">
        <img src={logo} alt="Logo" />
        <nav className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/">Products</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/herosection">Login</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Welcome to Aroma Spices</h1>
          <p>Track, manage, and optimize your spice inventory from anywhere. Our smart system ensures you're never low on stock or overwhelmed by excess.</p>
          <Link to="/herosection">Get Started</Link>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Spices" />
        </div>
      </section>

      {/* About Section */}
      <section className="section">
        <h2>Our Mission</h2>
        <p>At Aroma Spices, our goal is to revolutionize how spice manufacturers handle inventory. We help streamline procurement, avoid stockouts, and maintain consistency and quality—all in one platform.</p>
      </section>

      {/* Features */}
      <section className="section">
        <h2>Key Features</h2>
        <div className="features">
          <div className="feature-card">
            <h3>Real-Time Stock Updates</h3>
            <p>Instantly update and monitor stock levels as inventory changes.</p>
          </div>
          <div className="feature-card">
            <h3>Supplier Tracking</h3>
            <p>Track supplier performance, delivery times, and product quality.</p>
          </div>
          <div className="feature-card">
            <h3>Low Stock Alerts</h3>
            <p>Receive automatic alerts when items fall below reorder levels.</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section" style={{ backgroundColor: "#FFFDE7" }}>
        <h2>Featured Products</h2>
        <div className="products">
          <div className="product-card">
            <img src={cinnamonImg} alt="Cinnamon" />
            <h3>Ceylon Cinnamon Powder</h3>
            <p>Finely ground, aromatic Ceylon cinnamon. Perfect for baking and beverages.</p>
            <p><strong>Rs. 500.00 / 100g</strong></p>
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
            <p><strong>Rs. 220.00 / 100g</strong></p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to Spice Up Your Inventory?</h2>
        <Link to="/register">Create Your Account</Link>
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
    </div>
  );
};

export default HomePage;
