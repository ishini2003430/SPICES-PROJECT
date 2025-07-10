import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function StockDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { stockItem } = location.state || {};

  if (!stockItem) {
    return (
      <div style={styles.container}>
        <Nav />
        <div style={styles.content}>
          <h2 style={styles.errorMessage}>No stock item selected</h2>
          <button 
            onClick={() => navigate('/supplier-home')}
            style={styles.backButton}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Nav />
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>Stock Details</h1>
          <button 
            onClick={() => navigate('/supplier-home')}
            style={styles.backButton}
          >
            Back to Dashboard
          </button>
        </div>

        <div style={styles.detailsCard}>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Basic Information</h2>
            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <label style={styles.label}>Product Name</label>
                <p style={styles.value}>{stockItem.name}</p>
              </div>
              <div style={styles.infoItem}>
                <label style={styles.label}>Category</label>
                <p style={styles.value}>{stockItem.category}</p>
              </div>
              <div style={styles.infoItem}>
                <label style={styles.label}>Current Stock</label>
                <p style={styles.value}>{stockItem.quantity} kg</p>
              </div>
              <div style={styles.infoItem}>
                <label style={styles.label}>Reorder Level</label>
                <p style={styles.value}>{stockItem.reorderlevel} kg</p>
              </div>
            </div>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Stock Status</h2>
            <div style={styles.statusContainer}>
              <div style={styles.statusItem}>
                <label style={styles.label}>Stock Status</label>
                <p style={{
                  ...styles.value,
                  color: stockItem.quantity <= stockItem.reorderlevel ? '#E64A19' : '#4CAF50'
                }}>
                  {stockItem.quantity <= stockItem.reorderlevel ? 'Low Stock' : 'Adequate Stock'}
                </p>
              </div>
              <div style={styles.statusItem}>
                <label style={styles.label}>Stock Level</label>
                <div style={styles.progressBar}>
                  <div 
                    style={{
                      ...styles.progressFill,
                      width: `${Math.min((stockItem.quantity / stockItem.reorderlevel) * 100, 100)}%`,
                      backgroundColor: stockItem.quantity <= stockItem.reorderlevel ? '#E64A19' : '#4CAF50'
                    }}
                  />
                </div>
                <p style={styles.progressText}>
                  {Math.round((stockItem.quantity / stockItem.reorderlevel) * 100)}% of reorder level
                </p>
              </div>
            </div>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Actions</h2>
            <div style={styles.actionsContainer}>
              <button style={styles.actionButton}>
                Place Order
              </button>
              <button style={styles.secondaryButton}>
                View History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Internal Nav component
function Nav() {
  return (
    <nav style={navStyles.nav}>
      <ul style={navStyles.ul}>
        <li style={navStyles.li}>
          <Link to="/supplier-home" style={navStyles.link}>Home</Link>
        </li>
        <li style={navStyles.li}>
          <Link to="/add-supplier" style={navStyles.link}>Add Supplier</Link>
        </li>
        <li style={navStyles.li}>
          <Link to="/supplier-details" style={navStyles.link}>Supplier Details</Link>
        </li>
      </ul>
    </nav>
  );
}

// Styles
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: "20px",
    marginTop: "100px",
    maxWidth: "1200px",
    margin: "100px auto 0",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  title: {
    fontSize: "2.5rem",
    color: "#333",
    margin: 0,
  },
  backButton: {
    padding: "10px 20px",
    backgroundColor: "#E64A19",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#D84315",
    },
  },
  detailsCard: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  section: {
    marginBottom: "40px",
    "&:last-child": {
      marginBottom: 0,
    },
  },
  sectionTitle: {
    fontSize: "1.5rem",
    color: "#333",
    marginBottom: "20px",
    paddingBottom: "10px",
    borderBottom: "2px solid #f0f0f0",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
  },
  infoItem: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "0.9rem",
    color: "#666",
    marginBottom: "5px",
  },
  value: {
    fontSize: "1.2rem",
    color: "#333",
    margin: 0,
  },
  statusContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
  },
  statusItem: {
    marginBottom: "20px",
  },
  progressBar: {
    width: "100%",
    height: "20px",
    backgroundColor: "#f0f0f0",
    borderRadius: "10px",
    overflow: "hidden",
    marginTop: "10px",
  },
  progressFill: {
    height: "100%",
    transition: "width 0.3s ease",
  },
  progressText: {
    fontSize: "0.9rem",
    color: "#666",
    marginTop: "5px",
    textAlign: "right",
  },
  actionsContainer: {
    display: "flex",
    gap: "20px",
  },
  actionButton: {
    padding: "12px 24px",
    backgroundColor: "#E64A19",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#D84315",
    },
  },
  secondaryButton: {
    padding: "12px 24px",
    backgroundColor: "#fff",
    color: "#E64A19",
    border: "2px solid #E64A19",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "all 0.3s",
    "&:hover": {
      backgroundColor: "#E64A19",
      color: "white",
    },
  },
  errorMessage: {
    textAlign: "center",
    color: "#666",
    fontSize: "1.5rem",
    marginBottom: "20px",
  },
};

const navStyles = {
  nav: {
    backgroundColor: "rgb(223, 145, 63)",
    padding: "15px",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  ul: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  li: {
    display: "inline",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1.2rem",
    fontWeight: "bold",
    padding: "8px 16px",
    borderRadius: "4px",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.1)",
    },
  },
};

export default StockDetails; 