import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-overlay">
        <div className="footer-content">
          <div className="footer-left">
            <h3 className="aroma-title">Aroma Spices Journey</h3>
            <p className="aroma-text">
              Since 1995, we've been crafting unique spice blends that tell stories of ancient traditions. 
              Our spices are carefully sourced from sustainable farms, carrying the authentic aroma of nature's bounty.
            </p>
          </div>

          <div className="footer-middle">
            <h4>OUR POLICIES</h4>
            <ul className="policies-list">
              <li><a href="/terms">Terms and Conditions</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/cookies">Cookie Policy</a></li>
            </ul>
          </div>

          <div className="footer-right">
            <h4>STAY CONNECTED</h4>
            <div className="social-container">
              <a href="#" className="social-link">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <div className="contact-info">
              <p>📞 +1 234 567 890</p>
              <p>📧 contact@aromaspices.com</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Aroma Spices Co. - Preserving Nature's Essence</p>
      </div>
    </footer>
  );
};

export default Footer;