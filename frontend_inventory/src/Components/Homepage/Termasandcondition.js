import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function TermsAndConditions() {
  const styles = {
    navbar: {
      backgroundColor: "rgb(223, 145, 63)",
      display: "flex",
      width:"1460px",
      height:"120px",
      marginTop:"-150px",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 20px",
    },
    logo: {
      height: "100px",
      width:"100px",
    
      marginleft:"190px",
    },
    navLinks: {
      display: "flex",
      gap: "15px",
    },
    navLink: {
      color: "#fff",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "1rem",
    },
    container: {
      maxWidth: "900px",
      margin: "auto",
      padding: "40px 20px",
      fontFamily: "Arial, sans-serif",
      lineHeight: "1.6",
      color: "#333",
    },
    heading: {
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    sectionTitle: {
      fontSize: "22px",
      marginTop: "30px",
      fontWeight: "bold",
    },
    footer: {
      backgroundColor: "rgb(223, 145, 63)",
      padding: "20px",
      textAlign: "center",
      marginTop: "40px",
      borderTop: "1px solid #ccc",
    },
    footerLink: {
      color: "black",
      textDecoration: "none",
      margin: "0 8px",
    },
  };

  return (
    <>
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

      {/* Terms Content */}
      <div style={styles.container}>
        <h1 style={styles.heading}>Terms and Conditions</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <h2 style={styles.sectionTitle}>1. Acceptance of Terms</h2>
        <p>
          By accessing or using the Aroma Spices Management System, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use the system.
        </p>

        <h2 style={styles.sectionTitle}>2. Use of the System</h2>
        <p>
          You agree to use this system only for lawful purposes and in a manner that does not infringe the rights or restrict the use of this system by any third party.
        </p>

        <h2 style={styles.sectionTitle}>3. User Accounts</h2>
        <p>
          Users are responsible for maintaining the confidentiality of their account credentials. You agree to notify us immediately if you suspect any unauthorized use of your account.
        </p>

        <h2 style={styles.sectionTitle}>4. Intellectual Property</h2>
        <p>
          All content, logos, trademarks, and data on this system are the property of Aroma Spices. Unauthorized reproduction or use is strictly prohibited.
        </p>

        <h2 style={styles.sectionTitle}>5. Termination</h2>
        <p>
          We reserve the right to suspend or terminate user access at our discretion if any user violates these Terms and Conditions.
        </p>

        <h2 style={styles.sectionTitle}>6. Limitation of Liability</h2>
        <p>
          Aroma Spices will not be held liable for any direct, indirect, or incidental damages resulting from the use or inability to use this system.
        </p>

        <h2 style={styles.sectionTitle}>7. Changes to Terms</h2>
        <p>
          We may revise these Terms at any time. Continued use of the system after changes indicates your acceptance of the new Terms.
        </p>

        <h2 style={styles.sectionTitle}>8. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please{" "}
          <Link to="/contact" style={styles.footerLink}>contact us</Link>.
        </p>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Aroma Spices. All rights reserved.</p>
        <div>
          <Link to="/privacy" style={styles.footerLink}>Privacy Policy</Link> |
          <Link to="/terms" style={styles.footerLink}> Terms of Service</Link> |
          <Link to="/contact" style={styles.footerLink}> Contact Us</Link>
        </div>
      </footer>
    </>
  );
}

export default TermsAndConditions;
