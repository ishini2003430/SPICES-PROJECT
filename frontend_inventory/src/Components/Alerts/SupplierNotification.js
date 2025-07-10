import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

const SupplierNotification = () => {
  const [supplierNotifications, setSupplierNotifications] = useState([]);

  useEffect(() => {
    // Fetch low stock items and their supplier information
    const fetchLowStockItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/stocks/');
        const lowStockItems = response.data.stocks.filter(
          stock => stock.quantity <= stock.reorderlevel
        );

        // Create supplier notifications
        const notifications = lowStockItems.map(item => ({
          productName: item.name,
          currentQuantity: item.quantity,
          reorderLevel: item.reorderlevel,
          supplier: item.supplier,
          message: `Low stock alert for ${item.name}. Current quantity: ${item.quantity}kg, Reorder level: ${item.reorderlevel}kg`,
          timestamp: new Date().toISOString(),
          status: 'pending'
        }));

        setSupplierNotifications(notifications);
      } catch (error) {
        console.error('Error fetching low stock items:', error);
      }
    };

    fetchLowStockItems();
  }, []);

  const handleMarkAsNotified = (index) => {
    const updatedNotifications = [...supplierNotifications];
    updatedNotifications[index].status = 'notified';
    setSupplierNotifications(updatedNotifications);
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.title}>Supplier Notifications</h1>
        <div style={styles.tableContainer}>
          {supplierNotifications.length > 0 ? (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.headerCell}>Product Name</th>
                  <th style={styles.headerCell}>Current Quantity</th>
                  <th style={styles.headerCell}>Reorder Level</th>
                  <th style={styles.headerCell}>Supplier</th>
                  <th style={styles.headerCell}>Status</th>
                  <th style={styles.headerCell}>Action</th>
                </tr>
              </thead>
              <tbody>
                {supplierNotifications.map((notification, index) => (
                  <tr key={index} style={styles.row}>
                    <td style={styles.cell}>{notification.productName}</td>
                    <td style={styles.cell}>{notification.currentQuantity} kg</td>
                    <td style={styles.cell}>{notification.reorderLevel} kg</td>
                    <td style={styles.cell}>{notification.supplier}</td>
                    <td style={styles.cell}>
                      <span style={notification.status === 'pending' ? styles.pendingStatus : styles.notifiedStatus}>
                        {notification.status}
                      </span>
                    </td>
                    <td style={styles.cell}>
                      {notification.status === 'pending' && (
                        <button
                          style={styles.notifyButton}
                          onClick={() => handleMarkAsNotified(index)}
                        >
                          Mark as Notified
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h3 style={styles.noNotifications}>No supplier notifications at this time.</h3>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  title: {
    textAlign: 'center',
    color: '#E64A19',
    marginBottom: '30px',
  },
  tableContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
  },
  table: {
    width: '100%',
    maxWidth: '1200px',
    borderCollapse: 'collapse',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  headerCell: {
    backgroundColor: '#E64A19',
    color: 'white',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
  },
  cell: {
    padding: '12px',
    borderBottom: '1px solid #ddd',
  },
  row: {
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  notifyButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#45a049',
    },
  },
  pendingStatus: {
    color: '#f44336',
    fontWeight: 'bold',
  },
  notifiedStatus: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  noNotifications: {
    textAlign: 'center',
    color: '#666',
    marginTop: '50px',
  },
};

export default SupplierNotification; 