import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"; // Adjust the path as needed

const ContactUs = () => {
  return (
    <div>
      <style>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background-color: rgb(234, 233, 233);
        }
        .navbar {
          display: flex;
          width: 1450px;
          height: 100px;
          justify-content: space-between;
          align-items: center;
          padding: 15px 30px;
          background-color: rgb(223, 145, 63);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .navbar img {
          height: 100px;
        }
        .navbar-links a {
          margin-left: 60px;
          text-decoration: none;
          font-size: 18px;
          color: #333;
          font-weight: 500;
        }
        .navbar-links a:hover {
          background-color: #FFE082;
        }

        .container {
          padding: 40px 20px;
          text-align: center;
        }

        .title {
          font-size: 2.5rem;
          font-weight: bold;
        }

        .subtitle {
          color: #555;
          margin-top: 10px;
          font-size: 1.1rem;
        }

        .card-container {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 30px;
          margin-top: 40px;
        }

        .card {
          background-color: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          width: 280px;
        }

        .card-icon {
          font-size: 30px;
          margin-bottom: 15px;
          color: #f5a623;
        }

        .card-title {
          font-weight: bold;
          font-size: 1.2rem;
          margin-bottom: 5px;
        }

        .card-detail {
          color: #444;
        }

        .highlight {
          color: #d17900;
          font-weight: bold;
        }

        .form-container {
          background-color: white;
          padding: 40px;
          margin: 50px auto;
          border-radius: 12px;
          max-width: 900px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .form-title {
          font-size: 1.8rem;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-grid input,
        .form-grid textarea {
          padding: 12px;
          font-size: 1rem;
          border-radius: 8px;
          border: 1px solid #ccc;
          background-color: #fcfaf3;
        }

        .form-grid textarea {
          grid-column: 1 / span 2;
          resize: vertical;
          height: 120px;
        }

        .submit-btn {
          margin-top: 20px;
          background-color: #d17900;
          color: white;
          padding: 12px 25px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
        }

        .footer {
          background-color: rgb(223, 145, 63);
          color:#4E342E;
          text-align: center;
          padding: 20px 10px;
          margin-top: 50px;
        }

        .footer p {
          margin: 0 0 10px 0;
        }

        .footer a {
          color: #4E342E;
          margin: 0 8px;
          text-decoration: none;
        }

        .footer a:hover {
          text-decoration: underline;
        }
      `}</style>

      {/* Navbar */}
      <header className="navbar">
        <img src={logo} alt="Logo" />
        <nav className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="http://localhost:3001/products">Products</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/herosection">Login</Link>
        </nav>
      </header>

      {/* Contact Us Content */}
      <div className="container">
        <div className="title">Contact Us</div>
        <div className="subtitle">
          Have questions about our spice management system? We're here to help!
          <br />
          Reach out through any of the methods below.
        </div>

        <div className="card-container">
          <div className="card">
            <div className="card-icon">📞</div>
            <div className="card-title">Phone Support</div>
            <div className="card-detail">Available Mon–Fri, 9am–5pm</div>
            <div className="highlight">(+94) 9100500544</div>
          </div>

          <div className="card">
            <div className="card-icon">📧</div>
            <div className="card-title">Email Support</div>
            <div className="card-detail">24/7 email support</div>
            <div className="highlight">support@aromaspices.com</div>
          </div>

          <div className="card">
            <div className="card-icon">📍</div>
            <div className="card-title">Visit Us</div>
            <div className="card-detail">Our headquarters</div>
            <div className="highlight">
              123 ,Galle Road<br />
              Colombo, FC 12345
            </div>
          </div>
        </div>

        <div className="form-container">
          <div className="form-title">Send us a Message</div>
          <form>
            <div className="form-grid">
              <input type="text" placeholder="Your name" required />
              <input type="email" placeholder="Your email" required />
              <input type="tel" placeholder="Your phone (optional)" />
              <input type="text" placeholder="Message subject" required />
              <textarea placeholder="How can we help?" required></textarea>
            </div>
            <button className="submit-btn" type="submit">📨 Send Message</button>
          </form>
        </div>
      </div>

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

export default ContactUs;
