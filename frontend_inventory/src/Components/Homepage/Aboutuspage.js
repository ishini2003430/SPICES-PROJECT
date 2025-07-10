import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import teamImage from '../../assets/spicesback.jpg'; // Replace with your actual image

const AboutUs = () => {
  return (
    <div className="about-page">
      {/* Navbar */}
      <header className="navbar">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <nav className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="http://localhost:3001/products">Products</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/herosection">Login</Link>
        </nav>
      </header>

      {/* About Us Content */}
      <main className="about-content">
        <h1>About AROMA</h1>
        <p className="tagline">Where Tradition Meets Technology in Spice Manufacturing</p>

        <section>
          <h2>Who We Are</h2>
          <p>
            AROMA is a modern spice manufacturing management system, designed to streamline and optimize operations from inventory tracking
            to supplier management. Our mission is to empower spice producers with tools that enhance efficiency and support decision-making
            through real-time data.
          </p>

          {/* Centered Image Card */}
          <div className="card-container">
            <div className="card">
              <img src={teamImage} alt="Our Team" className="card-image" />
              <div className="card-body">
                <h3>Meet Our Team</h3>
                <p>
                  Dedicated developers and industry experts working together to revolutionize spice production with technology.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2>Our Vision</h2>
          <p>
            To be the leading digital solution in the spice industry, making spice production smarter, more efficient, and globally competitive.
          </p>
        </section>

        <section>
          <h2>What We Offer</h2>
          <ul>
            <li>Inventory & Stock Monitoring</li>
            <li>Sales and Order Management</li>
            <li>Supplier and Procurement Coordination</li>
            <li>Product Catalog Management</li>
            <li>Financial Tracking and Reports</li>
          </ul>
        </section>

        <section>
          <h2>Why Choose AROMA?</h2>
          <p>
            With a user-friendly interface and powerful features, AROMA helps manufacturing teams focus more on growth and quality control
            while the system takes care of the data and logistics. Built by a team of developers passionate about the spice industry.
          </p>
        </section>

        <footer className="about-footer">
          <p>
            Ready to streamline your spice manufacturing process? Explore our modules and start managing smarter with AROMA!
          </p>
        </footer>
      </main>

      {/* Styles */}
      <style>{`
        .about-page {
          font-family: sans-serif;
          background-color: #fefce8;
          padding: 20px;
          width:1400px;
          margin-top: -170px;
          max-width: 100%;
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 80px;
          padding: 15px 20px;
          background-color: rgb(223, 145, 63);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .navbar-logo {
          height: 100px;
        }

        .navbar-links {
          display: flex;
          gap: 70px;
        }

        .navbar-links a {
          text-decoration: none;
          font-size: 18px;
          color: #92400e;
          font-weight: 600;
        }

        .navbar-links a:hover {
          background-color: #FFE082;
        }

        .about-content {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
        }

        .about-content h1 {
          font-size: 2.2rem;
          color: #92400e;
          text-align: center;
        }

        .tagline {
          font-size: 1rem;
          color: #6b7280;
          margin-bottom: 30px;
          text-align: center;
        }

        section {
          margin-bottom: 30px;
        }

        section h2 {
          color: #b45309;
          margin-bottom: 10px;
        }

        section p,
        section ul {
          color: #374151;
          font-size: 1rem;
          line-height: 1.6;
        }

        ul {
          padding-left: 20px;
        }

        .card-container {
          display: flex;
          justify-content: center;
          margin-top: 30px;
        }

        .card {
          background-color: #fff8e1;
          border: 1px solid #e0c097;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          max-width: 600px;
          width: 100%;
        }

        .card-image {
          width: 100%;
          height: auto;
          object-fit: cover;
          display: block;
        }

        .card-body {
          padding: 20px;
          text-align: center;
        }

        .card-body h3 {
          color: #92400e;
          margin-bottom: 10px;
        }

        .about-footer {
          background-color: rgb(223, 145, 63);
          text-align: center;
          padding: 30px 20px;
          color: #4E342E;
          font-size: 16px;
          margin-top: 40px;
          border-top: 1px solid #BCAAA4;
        }

        @media (max-width: 768px) {
          .navbar {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }

          .navbar-links {
            flex-direction: column;
            gap: 15px;
          }

          .about-content {
            padding: 30px 20px;
          }

          .card-container {
            padding: 0 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutUs;
