import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bar, Line } from 'react-chartjs-2';
import logo from '../../assets/logo.png';
import profileIcon from '../../assets/profile.png';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function HomeInventory() {
  const navigate = useNavigate();
  const [alertCount, setAlertCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [inventoryStats, setInventoryStats] = useState({
    totalProducts: 0,
    lowStockItems: 0,
    categories: 0,
    suppliers: 0
  });
  const [lowStockItems, setLowStockItems] = useState([]);
  const [categoryData, setCategoryData] = useState({
    labels: [],
    datasets: [{
      label: 'Products by Category',
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1,
    }]
  });

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        // Fetch stock data from your API
        const response = await axios.get('http://localhost:5000/stocks/');
        const stocks = response.data.stocks;

        // Calculate low stock items
        const lowStock = stocks.filter(stock => stock.quantity <= stock.reorderlevel);
        setLowStockItems(lowStock);
        setAlertCount(lowStock.length);

        // Calculate category distribution
        const categoryCounts = stocks.reduce((acc, stock) => {
          acc[stock.category] = (acc[stock.category] || 0) + stock.quantity;
          return acc;
        }, {});

        // Prepare category data for chart
        const categories = Object.keys(categoryCounts);
        const quantities = Object.values(categoryCounts);
        
        // Generate colors for each category
        const colors = categories.map((_, index) => {
          const hue = (index * 137.5) % 360; // Golden angle approximation for good color distribution
          return {
            background: `hsla(${hue}, 70%, 60%, 0.6)`,
            border: `hsla(${hue}, 70%, 60%, 1)`
          };
        });

        setCategoryData({
          labels: categories,
          datasets: [{
            label: 'Products by Category (kg)',
            data: quantities,
            backgroundColor: colors.map(c => c.background),
            borderColor: colors.map(c => c.border),
            borderWidth: 1,
          }]
        });

        // Update inventory stats
        setInventoryStats({
          totalProducts: stocks.length,
          lowStockItems: lowStock.length,
          categories: categories.length,
          suppliers: [...new Set(stocks.map(stock => stock.supplier))].length
        });

      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, []);

  const handleLogout = () => {
    navigate('/admin-login');
  };

  const handleUpdateStock = (stockId) => {
    navigate(`/stock-details/${stockId}`);
  };

  // Stock Movement Chart Data
  const stockMovementData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Stock Movement (kg)',
        data: [50, 75, 60, 90, 40, 85],
        backgroundColor: 'rgba(230, 74, 25, 0.6)',
        borderColor: 'rgba(230, 74, 25, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Inventory Analytics',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Quantity (kg)'
        }
      }
    }
  };

  return (
    <div className="home-container">
      {/* Original Navbar */}
      <nav className="navbar">
        <div className="sidebar-logo">
          <img src={logo} alt="Company Logo" />
        </div>

        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/add-stock">Add Stock</Link></li>
          <li><Link to="/stock-details">Stock Details</Link></li>
          <li><Link to="/alert">Alert</Link></li>
        </ul>

       
        <div className="profile-section">
          <img
            src={profileIcon}
            alt="Profile"
            className="profile-icon"
            onClick={() => setShowDropdown(!showDropdown)}
          />
          {showDropdown && (
            <div className="dropdown-menu">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </nav>

      {/* New Dashboard Content */}
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>Inventory Dashboard</h1>
          <button style={styles.addButton} onClick={() => navigate('/add-stock')}>
            Add New Stock
          </button>
        </div>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <h3 style={styles.statTitle}>Total Products</h3>
            <p style={styles.statNumber}>{inventoryStats.totalProducts}</p>
          </div>
          <div style={styles.statCard}>
            <h3 style={styles.statTitle}>Low Stock Alerts</h3>
            <p style={styles.statNumber}>{inventoryStats.lowStockItems}</p>
          </div>
          <div style={styles.statCard}>
            <h3 style={styles.statTitle}>Categories</h3>
            <p style={styles.statNumber}>{inventoryStats.categories}</p>
          </div>
          <div style={styles.statCard}>
            <h3 style={styles.statTitle}>Active Suppliers</h3>
            <p style={styles.statNumber}>{inventoryStats.suppliers}</p>
          </div>
        </div>

        <div style={styles.chartsContainer}>
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Stock Movement</h3>
            <Bar data={stockMovementData} options={chartOptions} />
          </div>
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Category Distribution</h3>
            <Bar 
              data={categoryData} 
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: {
                    display: true,
                    text: 'Stock Quantity by Category',
                    font: {
                      size: 16,
                      weight: 'bold'
                    }
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return `${context.dataset.label}: ${context.raw} kg`;
                      }
                    }
                  }
                }
              }} 
            />
          </div>
        </div>

        <div style={styles.alertsSection}>
          <h2 style={styles.sectionTitle}>
            Low Stock Alerts <span style={styles.alertCount}>{alertCount}</span>
          </h2>
          <div style={styles.alertsGrid}>
            {lowStockItems.map((item) => (
              <div key={item._id} style={styles.alertCard}>
                <h3 style={styles.alertTitle}>{item.name}</h3>
                <div style={styles.stockInfo}>
                  <p style={styles.stockText}>
                    Current Stock: <span style={styles.stockValue}>{item.quantity} kg</span>
                  </p>
                  <p style={styles.stockText}>
                    Reorder Level: <span style={styles.stockValue}>{item.reorderlevel} kg</span>
                  </p>
                </div>
                <div style={styles.progressBar}>
                  <div 
                    style={{
                      ...styles.progressFill,
                      width: `${(item.quantity / item.reorderlevel) * 100}%`,
                      backgroundColor: item.quantity <= item.reorderlevel ? '#E64A19' : '#4CAF50'
                    }}
                  />
                </div>
                <button 
                  style={styles.updateButton}
                  onClick={() => handleUpdateStock(item._id)}
                >
                  Update Stock
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Original CSS */}
      <style>{`
        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px 100px;
          background-color: rgb(223, 145, 63);
          color: #4E342E;
          font-family: 'Segoe UI', sans-serif;
          margin-top: -190px;
          margin-right: -0px;
          margin-left: -50px;
          width:1490px;
          height: 140px;
          position: relative;
        }

        .sidebar-logo img {
          height: 100px;
          margin-left: 50px;
        }

        .navbar ul {
          list-style: none;
          display: flex;
          gap: 20px;
          margin: 0;
          padding: 0;
        }

        .navbar ul li a {
          color: #4E342E;
          text-decoration: none;
          font-weight: 500;
          font-size: 20px;
          padding: 8px 12px;
          border-radius: 5px;
        }

        .navbar ul li a:hover {
          background-color: #FFE0B2;
        }

        .search-form {
          display: 30px;
          width:290px;
          background-color:rgb(223, 145, 63);
          margin-left: 220px;
          align-items: center;
           height:90px;
          gap: -25px;
        }

        .search-form input {
          padding: 6px 0px;
          border: 1px solid #ccc;
          border-radius: 5px;
          outline: none;
        }

        .searchbutton button {
          padding: 6px 12px;
          background-color: #FFA000;
          border: none;
          color: white;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
        }

        .searchbutton button:hover {
          background-color: #FF8F00;
        }

        .profile-section {
          position: relative;
        }

        .profile-icon {
          height: 50px;
          width: 50px;
          border-radius: 50%;
          border: 2px solid #FF7043;
          cursor: pointer;
        }

        .dropdown-menu {
          position: absolute;
          top: 60px;
          right: 0;
          background-color: white;
          border: 1px solid #ccc;
          padding: 8px 12px;
          border-radius: 5px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          z-index: 1000;
        }

        .dropdown-menu button {
          background: #ff7043;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 5px;
          cursor: pointer;
        }

        .dropdown-menu button:hover {
          background: #f4511e;
        }
      `}</style>
    </div>
  );
}

const styles = {
  content: {
    maxWidth: '1400px',
    margin: '100px auto 0',
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '2.5rem',
    color: '#333',
    margin: 0,
  },
  addButton: {
    padding: '12px 24px',
    backgroundColor: '#E64A19',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#D84315',
    },
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  statCard: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  statTitle: {
    fontSize: '1.2rem',
    color: '#666',
    margin: '0 0 10px 0',
  },
  statNumber: {
    fontSize: '2.5rem',
    color: '#E64A19',
    margin: 0,
    fontWeight: 'bold',
  },
  chartsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  chartCard: {
    backgroundColor: 'white',
    padding: '55px',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  chartTitle: {
    fontSize: '1.3rem',
    color: '#333',
    margin: '0 0 20px 0',
    textAlign: 'center',
  },
  alertsSection: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    color: '#333',
    margin: '0 0 20px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  alertCount: {
    backgroundColor: '#E64A19',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '20px',
    fontSize: '1rem',
  },
  alertsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  alertCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
  alertTitle: {
    color: '#E64A19',
    margin: '0 0 15px 0',
    fontSize: '1.2rem',
  },
  stockInfo: {
    marginBottom: '15px',
  },
  stockText: {
    color: '#666',
    margin: '5px 0',
    fontSize: '1rem',
  },
  stockValue: {
    color: '#333',
    fontWeight: '500',
  },
  progressBar: {
    width: '100%',
    height: '10px',
    
    backgroundColor: '#ff7043',
    borderRadius: '5px',
    overflow: 'hidden',
    marginBottom: '15px',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ff7043',
    transition: 'width 0.3s ease',
  },
  updateButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#E64A19',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#D84315',
    },
  },
};

export default HomeInventory;
