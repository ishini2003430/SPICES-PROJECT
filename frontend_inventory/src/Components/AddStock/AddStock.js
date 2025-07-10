import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import profileIcon from "../../assets/profile.png";

const Navbar = ({ setSearchQuery }) => {
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <nav className="navbar">
      <style>{`
        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px 30px;
          background-color: rgb(223, 145, 63);
          color: #4E342E;
          font-family: 'Segoe UI', sans-serif;
          height: 140px;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
        }

        .sidebar-logo img {
          height: 100px;
        }

        .navbar ul {
          list-style: none;
          display: flex;
            font-size: 20px;
          gap: 20px;
          margin: 0;
          padding: 0;
        }

        .navbar ul li a {
          color: #4E342E;
          text-decoration: none;
          font-weight: 600;
         font-size: 20px;
          padding: 10px 14px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .navbar ul li a:hover {
          background-color: #FFE0B2;
        }

        .alert-button {
          background-color: #FFE0B2;
          color: #4E342E;
          padding: 8px 15px;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
        }

        .search-form {
          display: flex;
          width:290px;
          background-color:rgb(223, 145, 63);
          height:90px;
          margin-left: 220px;
          align-items: center;
          gap: 3px;
        }

        .search-form input {
          padding: 3px 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
        }

        .searchbutton button {
          padding: 8px 15px;
          background-color:rgb(215, 143, 10);
          border: none;
          color: white;
          margin-top:-45px;
          border-radius: 5px;
          font-weight: bold;
          font-size: 16px;
          cursor: pointer;
        }

        .profile-section {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .profile-icon {
          height: 50px;
          width: 50px;
          border-radius: 50%;
          border: 2px solid #FF7043;
        }
      `}</style>

      <div className="sidebar-logo">
        <img src={logo} alt="Company Logo" />
      </div>

      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/add-stock">Add Stock</Link></li>
        <li><Link to="/stock-details">Stock Details</Link></li>
        <li><button className="alert-button">Alert</button></li>
      </ul>

      

      <div className="profile-section">
        <img src={profileIcon} alt="Profile" className="profile-icon" />
      </div>
    </nav>
  );
};

const AddStockPage = () => {
  const [stock, setStock] = useState({
    name: "",
    category: "",
    quantity: "",
    reorderlevel: "",
    supplier: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    let filteredValue = value;

    if (name === "name") {
      filteredValue = value.replace(/[^A-Za-z0-9 ]/g, "");
    }

    if (name === "category" || name === "supplier") {
      filteredValue = value.replace(/[^A-Za-z ]/g, "");
    }

    setStock({ ...stock, [name]: filteredValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/stocks/", stock);
      alert("Stock added successfully!");
      setStock({ name: "", category: "", quantity: "", reorderlevel: "", supplier: "" });
    } catch (error) {
      console.error("Error adding stock:", error);
      alert("Failed to add stock");
    }
  };

  return (
    <div className="add-stock-page">
      <Navbar setSearchQuery={setSearchQuery} />
      <style>{`
        .form-container {
          
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          width:2500px;
            height:50px;
          margin-top: 150px;
          margin-left: 100px;
        }

        h2 {
          color: #333;
          text-align: center;
          margin-bottom: 25px;
        }

        form {
          display: flex;
          width:480px;
             padding: 30px;
          margin-left: -30px;
            background-color: rgb(249, 249, 248);
          flex-direction: column;
          gap: 15px;
        }

        label {
          font-weight: bold;
        }

        input[type="text"],
        input[type="number"] {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 16px;
        }

        button.submitbutton {
          background-color: rgb(207, 103, 6);
          color: white;
          padding: 12px 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }

        button.submitbutton:hover {
          background-color: rgb(180, 80, 0);
        }

        .footer {
          margin-top: 50px;
          padding: 20px 0;
          background-color: rgb(223, 145, 63);
          text-align: center;
          font-size: 14px;
          width:1500px;
          color: #555;
        }
      `}</style>

      <div className="form-container">
        <h2>Add New Spice</h2>
        <form onSubmit={handleSubmit}>
          <label>Spice Name *</label>
          <input
            type="text"
            name="name"
            value={stock.name}
            onChange={handleChange}
            required
            title="Only letters, numbers, and spaces allowed"
          />

          <label>Category *</label>
          <input
            type="text"
            name="category"
            value={stock.category}
            onChange={handleChange}
            required
            title="Only letters and spaces allowed"
          />

          <label>Quantity (Kg) *</label>
          <input
            type="number"
            name="quantity"
            value={stock.quantity}
            onChange={handleChange}
            required
            min="0"
            title="Quantity must be a non-negative number"
          />

          <label>Reorder Level (Kg) *</label>
          <input
            type="number"
            name="reorderlevel"
            value={stock.reorderlevel}
            onChange={handleChange}
            required
            min="0"
            title="Reorder level must be a non-negative number"
          />

          <label>Supplier Name *</label>
          <input
            type="text"
            name="supplier"
            value={stock.supplier}
            onChange={handleChange}
            required
            title="Only letters and spaces allowed"
          />

          <button className="submitbutton" type="submit">Add Spice</button>
        </form>
      </div>

      
    </div>
  );
};

export default AddStockPage;
