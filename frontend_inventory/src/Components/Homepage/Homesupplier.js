import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

function Homesupplier() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [supplierStats, setSupplierStats] = useState({
    totalSuppliers: 0,
    activeOrders: 0,
    pendingNotifications: 0
  });
  const [chartData, setChartData] = useState({
    stockLevels: []
  });
  const [selectedStock, setSelectedStock] = useState(null);

  useEffect(() => {
    // Fetch supplier notifications
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/stocks/');
        const lowStockItems = response.data.stocks.filter(
          stock => stock.quantity <= stock.reorderlevel
        );
        setNotifications(lowStockItems);
        
        // Prepare data for stock levels chart
        const stockData = response.data.stocks.map(stock => ({
          name: stock.name,
          quantity: stock.quantity,
          reorderLevel: stock.reorderlevel
        }));
        setChartData(prev => ({ ...prev, stockLevels: stockData }));
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    // Fetch supplier statistics
    const fetchSupplierStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/suppliers');
        setSupplierStats({
          totalSuppliers: response.data.suppliers.length,
          activeOrders: response.data.suppliers.filter(s => s.Supplier_quantity > 0).length,
          pendingNotifications: notifications.length
        });
      } catch (error) {
        console.error('Error fetching supplier stats:', error);
      }
    };

    fetchNotifications();
    fetchSupplierStats();
  }, [notifications.length]);

  const handleViewDetails = (item) => {
    setSelectedStock(item);
  };

  const handleCloseDetails = () => {
    setSelectedStock(null);
  };

  const handleLogout = () => {
    navigate('/admin-login');
  };

  // Stock Levels Chart Data
  const stockLevelsData = {
    labels: chartData.stockLevels.map(item => item.name),
    datasets: [
      {
        label: 'Current Stock',
        data: chartData.stockLevels.map(item => item.quantity),
        backgroundColor: 'rgba(230, 74, 25, 0.6)',
        borderColor: 'rgba(230, 74, 25, 1)',
        borderWidth: 1,
      },
      {
        label: 'Reorder Level',
        data: chartData.stockLevels.map(item => item.reorderLevel),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      }
    ]
  };

  return (
    <div style={styles.container}>
      <nav style={navStyles.nav}>
        <div style={navStyles.navContainer}>
          <div style={navStyles.logoContainer}>
            <img src={logo} alt="Logo" style={navStyles.logo} />
            <span style={navStyles.brandName}>AROMA SPICES</span>
          </div>
          <div style={navStyles.navRight}>
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
            <button onClick={handleLogout} style={navStyles.logoutButton}>
              <img 
                src="https://cdn-icons-png.flaticon.com/512/3889/3889528.png" 
                alt="Logout" 
                style={navStyles.logoutIcon}
              />
            </button>
          </div>
        </div>
      </nav>

      <div style={styles.content}>
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <img src={logo} alt="Logo" style={styles.logo} />
            <div style={styles.headerText}>
              <h1 style={styles.heading}>AROMA SPICES Supplier Management Dashboard</h1>
              <p style={styles.subheading}>Monitor and manage your supplier relationships effectively</p>
            </div>
          </div>
        </div>

        <div style={styles.statsContainer}>
          <div style={styles.statCard}>
            <h3>Total Suppliers</h3>
            <p style={styles.statNumber}>{supplierStats.totalSuppliers}</p>
          </div>
          <div style={styles.statCard}>
            <h3>Active Orders</h3>
            <p style={styles.statNumber}>{supplierStats.activeOrders}</p>
          </div>
          <div style={styles.statCard}>
            <h3>Pending Notifications</h3>
            <p style={styles.statNumber}>{supplierStats.pendingNotifications}</p>
          </div>
        </div>

        <div style={styles.mainContent}>
          <div style={styles.chartSection}>
            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>Stock Levels Overview</h3>
              <div style={styles.chartWrapper}>
                <Bar 
                  data={stockLevelsData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      title: {
                        display: true,
                        text: 'Current Stock vs Reorder Levels'
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div style={styles.alertsSection}>
            <div style={styles.notificationsContainer}>
              <h2 style={styles.sectionTitle}>Low Stock Alerts</h2>
              {notifications.length > 0 ? (
                <div style={styles.notificationsList}>
                  {notifications.map((item, index) => (
                    <div key={index} style={styles.notificationCard}>
                      <h3 style={styles.notificationTitle}>{item.name}</h3>
                      <p style={styles.notificationText}>
                        Current Stock: {item.quantity} kg
                        <br />
                        Reorder Level: {item.reorderlevel} kg
                      </p>
                      <button 
                        onClick={() => handleViewDetails(item)}
                        style={styles.actionButton}
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={styles.noNotifications}>No pending notifications</p>
              )}
            </div>
          </div>
        </div>

        {selectedStock && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>Stock Details</h2>
                <button onClick={handleCloseDetails} style={styles.closeButton}>×</button>
              </div>
              
              <div style={styles.modalBody}>
                <div style={styles.detailsSection}>
                  <h3 style={styles.detailsTitle}>Basic Information</h3>
                  <div style={styles.detailsGrid}>
                    <div style={styles.detailItem}>
                      <label style={styles.detailLabel}>Product Name</label>
                      <p style={styles.detailValue}>{selectedStock.name}</p>
                    </div>
                    <div style={styles.detailItem}>
                      <label style={styles.detailLabel}>Category</label>
                      <p style={styles.detailValue}>{selectedStock.category}</p>
                    </div>
                    <div style={styles.detailItem}>
                      <label style={styles.detailLabel}>Current Stock</label>
                      <p style={styles.detailValue}>{selectedStock.quantity} kg</p>
                    </div>
                    <div style={styles.detailItem}>
                      <label style={styles.detailLabel}>Reorder Level</label>
                      <p style={styles.detailValue}>{selectedStock.reorderlevel} kg</p>
                    </div>
                  </div>
                </div>

                <div style={styles.detailsSection}>
                  <h3 style={styles.detailsTitle}>Stock Status</h3>
                  <div style={styles.statusContainer}>
                    <div style={styles.statusItem}>
                      <label style={styles.detailLabel}>Stock Status</label>
                      <p style={{
                        ...styles.detailValue,
                        color: selectedStock.quantity <= selectedStock.reorderlevel ? '#E64A19' : '#4CAF50'
                      }}>
                        {selectedStock.quantity <= selectedStock.reorderlevel ? 'Low Stock' : 'Adequate Stock'}
                      </p>
                    </div>
                    <div style={styles.statusItem}>
                      <label style={styles.detailLabel}>Stock Level</label>
                      <div style={styles.progressBar}>
                        <div 
                          style={{
                            ...styles.progressFill,
                            width: `${Math.min((selectedStock.quantity / selectedStock.reorderlevel) * 100, 100)}%`,
                            backgroundColor: selectedStock.quantity <= selectedStock.reorderlevel ? '#E64A19' : '#4CAF50'
                          }}
                        />
                      </div>
                      <p style={styles.progressText}>
                        {Math.round((selectedStock.quantity / selectedStock.reorderlevel) * 100)}% of reorder level
                      </p>
                    </div>
                  </div>
                </div>

                <div style={styles.detailsSection}>
                  <h3 style={styles.detailsTitle}>Actions</h3>
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
        )}
      </div>
    </div>
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
    maxWidth: "1400px",
    margin: "100px auto 0",
  },
  header: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    marginBottom: "30px",
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
  },
  headerText: {
    marginLeft: "30px",
  },
  logo: {
    width: "100px",
    height: "100px",
  },
  heading: {
    fontSize: "2.5rem",
    color: "#333",
    margin: 0,
  },
  subheading: {
    fontSize: "1.2rem",
    color: "#666",
    margin: "10px 0 0 0",
  },
  statsContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "30px",
    gap: "30px",
  },
  statCard: {
    flex: 1,
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  statNumber: {
    fontSize: "2.5rem",
    color: "#E64A19",
    margin: "15px 0",
  },
  mainContent: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "30px",
  },
  chartSection: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  alertsSection: {
    height: "fit-content",
  },
  chartCard: {
    width: "100%",
  },
  chartTitle: {
    color: "#333",
    marginBottom: "25px",
    textAlign: "center",
    fontSize: "1.5rem",
  },
  chartWrapper: {
    height: "400px",
    width:"700px",
    position: "relative",
  },
  notificationsContainer: {
    backgroundColor: "white",
    padding: "30px",
    width:"400px",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  sectionTitle: {
    color: "#333",
    marginBottom: "25px",
    fontSize: "1.5rem",
  },
  notificationsList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    maxHeight: "500px",
    overflowY: "auto",
    paddingRight: "10px",
  },
  notificationCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  notificationTitle: {
    color: "#E64A19",
    margin: "0 0 15px 0",
    fontSize: "1.2rem",
  },
  notificationText: {
    color: "#666",
    margin: "0 0 20px 0",
    fontSize: "1.1rem",
  },
  actionButton: {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "#E64A19",
    color: "white",
    textDecoration: "none",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#D84315",
    },
  },
  noNotifications: {
    textAlign: "center",
    color: "#666",
    padding: "20px",
    fontSize: "1.1rem",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: "10px",
    width: "80%",
    maxWidth: "800px",
    maxHeight: "90vh",
    overflowY: "auto",
    position: "relative",
  },
  modalHeader: {
    padding: "20px",
    borderBottom: "1px solid #eee",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: {
    margin: 0,
    fontSize: "1.8rem",
    color: "#333",
  },
  closeButton: {
    background: "none",
    border: "none",
    fontSize: "2rem",
    cursor: "pointer",
    color: "#666",
    padding: "0 10px",
  },
  modalBody: {
    padding: "20px",
  },
  detailsSection: {
    marginBottom: "30px",
  },
  detailsTitle: {
    fontSize: "1.3rem",
    color: "#333",
    marginBottom: "20px",
    paddingBottom: "10px",
    borderBottom: "1px solid #eee",
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  detailItem: {
    marginBottom: "15px",
  },
  detailLabel: {
    display: "block",
    fontSize: "0.9rem",
    color: "#666",
    marginBottom: "5px",
  },
  detailValue: {
    fontSize: "1.1rem",
    color: "#333",
    margin: 0,
  },
  statusContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
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
    gap: "15px",
  },
  secondaryButton: {
    padding: "10px 20px",
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
};

const navStyles = {
  nav: {
    backgroundColor: "rgb(223, 145, 63)",
    padding: "25px 0",
    position: "fixed",
    height:"100px",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  navContainer: {
    maxWidth: "1400px",
    margin: "0 auto",
    display: "flex",
    
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
  },
  logo: {
    width: "60px",
    height: "60px",
  },
  brandName: {
    color: "#fff",
    fontSize: "1.8rem",
    fontWeight: "bold",
  },
  ul: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    gap: "30px",
  },
  li: {
    display: "inline",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1.3rem",
    fontWeight: "500",
    padding: "10px 20px",
    borderRadius: "4px",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.1)",
    },
  },
  logoutButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  logoutIcon: {
    width: "35px",
    height: "35px",
    filter: "brightness(0) invert(1)", // Makes the icon white
  },
};

export default Homesupplier;
