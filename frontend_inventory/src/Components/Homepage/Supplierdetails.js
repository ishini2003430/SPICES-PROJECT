import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Supplierdetails = () => {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/suppliers');
      setSuppliers(res.data.suppliers);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteSupplier = async (id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      await axios.delete(`http://localhost:5000/suppliers/${id}`);
      fetchSuppliers();
    }
  };

  const startEdit = (supplier) => {
    setEditing(supplier._id);
    setEditData(supplier);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    await axios.put(`http://localhost:5000/suppliers/${editing}`, editData);
    setEditing(null);
    fetchSuppliers();
  };

  // PDF Report Generation
  const handlePDFReport = () => {
    const doc = new jsPDF();
    
    // Logo
    const logoImg = new Image();
    logoImg.src = logo;
    logoImg.onload = () => {
      doc.addImage(logoImg, 'PNG', 14, 10, 20, 20);
  
      // Title
      doc.setFontSize(18);
      doc.setTextColor(40);
      doc.text('AROMA SPICES - Supplier Report', 40, 20);
  
      // Date
      const date = new Date().toLocaleDateString();
      doc.setFontSize(10);
      doc.text(`Date: ${date}`, 14, 35);
  
      // Table headers
      const headers = [["Name", "Company", "Email", "Contact", "Quantity", "Unit Price (Rs)", "Total Price (Rs)"]];
      const data = suppliers.map(supplier => [
        supplier.Suppliername,
        supplier.Supplier_company,
        supplier.Supplier_email,
        supplier.Supplier_contactnumber,
        supplier.Supplier_quantity,
        supplier.Supplier_unitprice.toFixed(2),
        (supplier.Supplier_quantity * supplier.Supplier_unitprice).toFixed(2)
      ]);
  
      // Add autoTable
      doc.autoTable({
        startY: 40,
        head: headers,
        body: data,
        styles: {
          fontSize: 10,
          cellPadding: 3,
        },
        headStyles: {
          fillColor: [128, 0, 0],
          textColor: 255,
          halign: 'center',
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
      });
  
      // Save the PDF
      doc.save("Supplier_Report.pdf");
    };
  };
  

  const handleLogout = () => {
    navigate('/admin-login');
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  // Filtered suppliers based on search
  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.Suppliername.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <h2 style={styles.title}>Supplier Details</h2>
          <div style={styles.actions}>
            <button onClick={handlePDFReport} style={styles.pdfButton}>
              Generate PDF
            </button>
          </div>
        </div>
        <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
          <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Suppliers List</h2>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by Supplier Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '10px',
              width: '100%',
              marginBottom: '20px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />

          {/* Supplier Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '20px',
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#FF7F50', color: '#fff', textAlign: 'left' }}>
                  <th style={tableHeaderStyle}>Name</th>
                  <th style={tableHeaderStyle}>Company</th>
                  <th style={tableHeaderStyle}>Email</th>
                  <th style={tableHeaderStyle}>Contact</th>
                  <th style={tableHeaderStyle}>Quantity</th>
                  <th style={tableHeaderStyle}>Unit Price (RS)</th>
                  <th style={tableHeaderStyle}>Total Price(RS)</th>
                  <th style={tableHeaderStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSuppliers.map((supplier) => (
                  <tr key={supplier._id} style={{ borderBottom: '1px solid #ddd' }}>
                    {editing === supplier._id ? (
                      <>
                        <td><input name="Suppliername" value={editData.Suppliername} onChange={handleEditChange} style={inputStyle} /></td>
                        <td><input name="Supplier_company" value={editData.Supplier_company} onChange={handleEditChange} style={inputStyle} /></td>
                        <td><input name="Supplier_email" value={editData.Supplier_email} onChange={handleEditChange} style={inputStyle} /></td>
                        <td><input name="Supplier_contactnumber" value={editData.Supplier_contactnumber} onChange={handleEditChange} style={inputStyle} /></td>
                        <td><input type="number" name="Supplier_quantity" value={editData.Supplier_quantity} onChange={handleEditChange} style={inputStyle} /></td>
                        <td><input type="number" name="Supplier_unitprice" value={editData.Supplier_unitprice} onChange={handleEditChange} style={inputStyle} /></td>
                        <td>{editData.Supplier_quantity * editData.Supplier_unitprice}</td>
                        <td>
                          <button onClick={saveEdit} style={saveButtonStyle}>Save</button>
                          <button onClick={() => setEditing(null)} style={cancelButtonStyle}>Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={tableCellStyle}>{supplier.Suppliername}</td>
                        <td style={tableCellStyle}>{supplier.Supplier_company}</td>
                        <td style={tableCellStyle}>{supplier.Supplier_email}</td>
                        <td style={tableCellStyle}>{supplier.Supplier_contactnumber}</td>
                        <td style={tableCellStyle}>{supplier.Supplier_quantity}</td>
                        <td style={tableCellStyle}>{supplier.Supplier_unitprice}</td>
                        <td style={tableCellStyle}>{supplier.Supplier_quantity * supplier.Supplier_unitprice}</td>
                        <td style={tableCellStyle}>
                          <button onClick={() => startEdit(supplier)} style={editButtonStyle}>Edit</button>
                          <button onClick={() => deleteSupplier(supplier._id)} style={deleteButtonStyle}>Delete</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline Styles
const tableHeaderStyle = {
  padding: '10px',
  textAlign: 'left',
  fontSize: '14px'
};

const tableCellStyle = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
  fontSize: '14px'
};

const inputStyle = {
  padding: '5px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '14px'
};

const editButtonStyle = {
  backgroundColor: '#008000',
  color: 'white',
  padding: '5px 10px',
  border: 'none',
  cursor: 'pointer',
  marginRight: '5px'
};

const deleteButtonStyle = {
  backgroundColor: '#f44336',
  color: 'white',
  padding: '5px 10px',
  border: 'none',
  cursor: 'pointer'
};

const saveButtonStyle = {
  backgroundColor: '#28a745',
  color: 'white',
  padding: '5px 10px',
  border: 'none',
  cursor: 'pointer'
};

const cancelButtonStyle = {
  backgroundColor: '#6c757d',
  color: 'white',
  padding: '5px 10px',
  border: 'none',
  cursor: 'pointer'
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: "20px",
    marginTop: "120px",
    maxWidth: "1400px",
    margin: "120px auto 0",
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  pdfButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  },
};

const navStyles = {
  nav: {
    backgroundColor: "rgb(223, 145, 63)",
    padding: "25px 0",
    position: "fixed",
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

export default Supplierdetails;


