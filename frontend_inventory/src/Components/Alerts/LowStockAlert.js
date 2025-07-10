import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar'; // Adjust the path if needed
import { useNavigate } from 'react-router-dom';

const LowStockAlert = () => {
  const [lowStockItems, setLowStockItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedItems = localStorage.getItem("lowStockItems");
    if (storedItems) {
      const items = JSON.parse(storedItems);
      setLowStockItems(items);

      // Create supplier messages
      const existingMessages = JSON.parse(localStorage.getItem("supplierMessages")) || [];

      const newMessages = items.map((item) => ({
        name: item.name,
        supplier: item.supplier,
        quantity: item.quantity,
        reorderlevel: item.reorderlevel,
        message: `Stock is low for ${item.name}. Only ${item.quantity} left (reorder level: ${item.reorderlevel}).`,
        read: false,
        timestamp: new Date().toISOString(),
      }));

      // Avoid duplicates based on name + quantity + reorder level
      const mergedMessages = [
        ...existingMessages,
        ...newMessages.filter(
          (newMsg) =>
            !existingMessages.some(
              (msg) =>
                msg.name === newMsg.name &&
                msg.quantity === newMsg.quantity &&
                msg.reorderlevel === newMsg.reorderlevel
            )
        ),
      ];

      localStorage.setItem("supplierMessages", JSON.stringify(mergedMessages));
    }
  }, []);

  const handleMarkAsRead = (index) => {
    const updatedItems = [...lowStockItems];
    updatedItems[index].read = !updatedItems[index].read;
    setLowStockItems(updatedItems);
    localStorage.setItem("lowStockItems", JSON.stringify(updatedItems));
  };

  const handleDelete = (index) => {
    const updatedItems = [...lowStockItems];
    updatedItems.splice(index, 1);
    setLowStockItems(updatedItems);
    localStorage.setItem("lowStockItems", JSON.stringify(updatedItems));
  };

  return (
    <div>
      <Navbar />
      <h1 style={styles.title}>Low Stock Alerts</h1>
      <div style={styles.buttonContainer}>
        <button 
          style={styles.supplierButton}
          onClick={() => navigate('/supplier-notifications')}
        >
          View Supplier Notifications
        </button>
      </div>
      <div style={styles.tableContainer}>
        {lowStockItems.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.headerCell}>Name</th>
                <th style={styles.headerCell}>Category</th>
                <th style={styles.headerCell}>Quantity</th>
                <th style={styles.headerCell}>Reorder Level</th>
                <th style={styles.headerCell}>Supplier</th>
                <th style={styles.headerCell}>Action</th>
              </tr>
            </thead>
            <tbody>
              {lowStockItems.map((item, index) => (
                <tr
                  key={index}
                  style={item.read ? styles.readItem : styles.unreadItem}
                >
                  <td style={styles.cell}>{item.name || 'N/A'}</td>
                  <td style={styles.cell}>{item.category || 'N/A'}</td>
                  <td style={styles.cell}>{item.quantity}</td>
                  <td style={styles.cell}>{item.reorderlevel}</td>
                  <td style={styles.cell}>{item.supplier || 'N/A'}</td>
                  <td style={styles.cell}>
                    <button
                      style={styles.markReadBtn}
                      onClick={() => handleMarkAsRead(index)}
                    >
                      {item.read ? 'Mark as Unread' : 'Mark as Read'}
                    </button>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h3 style={styles.noAlerts}>No low stock alerts at this time.</h3>
        )}
      </div>

      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} AROMA Spices Inventory System. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  title: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '28px',
    color: '#c0392b',
  },
  tableContainer: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  table: {
    borderCollapse: 'collapse',
    width: '1000px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  headerCell: {
    backgroundColor: '#E64A19',
    color: 'white',
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cell: {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'center',
  },
  markReadBtn: {
    padding: '6px 10px',
    marginRight: '5px',
    backgroundColor: '#43A047',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteBtn: {
    padding: '6px 10px',
    backgroundColor: '#E53935',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  noAlerts: {
    textAlign: 'center',
    color: 'gray',
    marginTop: '50px',
  },
  footer: {
    marginTop: '200px',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
    color: '#555',
    width: '100%',
  },
  readItem: {
    backgroundColor: '#E0F7FA',
  },
  unreadItem: {
    backgroundColor: '#FFEBEE',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  supplierButton: {
    backgroundColor: '#E64A19',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    '&:hover': {
      backgroundColor: '#D84315',
    },
  },
};

export default LowStockAlert;
