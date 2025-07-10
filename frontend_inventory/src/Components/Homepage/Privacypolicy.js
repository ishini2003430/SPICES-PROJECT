import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"; // Adjust the path if necessary

function PrivacyPolicy() {
  return (
    <div style={styles.page}>
      {/* Navbar */}
      <header style={styles.navbar}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <nav style={styles.navLinks}>
          <Link to="/" style={styles.navLink}>Home</Link>
          <Link to="/about" style={styles.navLink}>About Us</Link>
          <Link to="/products" style={styles.navLink}>Products</Link>
          <Link to="/contact" style={styles.navLink}>Contact</Link>
          <Link to="/herosection" style={styles.navLink}>Login</Link>
        </nav>
      </header>

      {/* Privacy Policy Content */}
      <main style={styles.container}>
        <h1 style={styles.heading}>Privacy Policy</h1>
        <p style={styles.text}>
          At Aroma Spices Manufacturing Management System, we are committed to protecting your privacy.
          This Privacy Policy outlines how we collect, use, and safeguard your information.
        </p>

        <h2 style={styles.subheading}>1. Information We Collect</h2>
        <p style={styles.text}>
          We may collect information such as your name, email, contact number, and business details
          when you register or interact with the system.
        </p>

        <h2 style={styles.subheading}>2. How We Use Your Information</h2>
        <p style={styles.text}>
          The information is used for system operations, user authentication, supplier communication,
          and service improvement. We do not sell or share your data.
        </p>

        <h2 style={styles.subheading}>3. Data Security</h2>
        <p style={styles.text}>
          We use robust security measures to protect your data from unauthorized access or disclosure.
        </p>

        <h2 style={styles.subheading}>4. Your Rights</h2>
        <p style={styles.text}>
          You can request to access, update, or delete your information by contacting us.
        </p>

        <h2 style={styles.subheading}>5. Changes to This Policy</h2>
        <p style={styles.text}>
          We may update this policy. Significant changes will be notified via email or system alerts.
        </p>

        <p style={styles.footerText}>
          If you have questions, contact us at <strong>support@aromaspices.com</strong>
        </p>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Aroma Spices. All rights reserved.</p>
        <div>
          <Link to="/privacy" style={styles.footerLink}>Privacy Policy</Link> |{" "}
          <Link to="/terms" style={styles.footerLink}>Terms of Service</Link> |{" "}
          <Link to="/contact" style={styles.footerLink}>Contact Us</Link>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    color: "#333",
    width: "1500px",
  },
  navbar: {
    backgroundColor: "rgb(223, 145, 63)",
    padding: "15px 30px",
    color: "#4E342E",
    height: "120px",
    display: "flex",
    marginTop: "-150px",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  logo: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
  },
  navLinks: {
    display: "flex",
    gap: "20px",
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "1rem",
  },
  container: {
    padding: "50px",
    maxWidth: "900px",
    margin: "auto",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    textAlign: "center",
    color: "#D2691E",
  },
  subheading: {
    fontSize: "1.5rem",
    marginTop: "30px",
    color: "#333",
  },
  text: {
    fontSize: "1.1rem",
    lineHeight: "1.6",
    marginTop: "10px",
  },
  footerText: {
    marginTop: "40px",
    fontStyle: "italic",
    textAlign: "center",
  },
  footer: {
    backgroundColor: "rgb(223, 145, 63)",
    color: "darkbrown",
    textAlign: "center",
    padding: "20px 10px",
    marginTop: "60px",
  },
  footerLink: {
    color: "black",
    textDecoration: "underline",
  },
};

export default PrivacyPolicy;
