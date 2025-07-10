import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './updatestock.css'

function UpdateStock() { // Renamed to UpdateStock (uppercase)
  const [stock, setStock] = useState({
    name: "",
    category: "",
    quantity: "",
    reorderlevel: "",
    supplier: "",
    phone: "",
  });

  const { id } = useParams(); // Get the stock ID from URL
  const navigate = useNavigate();

  // Fetch existing stock details for updating
  useEffect(() => {
    axios
      .get(`http://localhost:5000/stocks/${id}`)
      .then((res) => setStock(res.data.stock))
      .catch((err) => console.error("Error fetching stock data", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStock({ ...stock, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if form is valid
    const form = e.target;
    if (form.checkValidity() === false) {
      alert("Please fill in all fields correctly.");
      return;
    }

    // Send PUT request to update stock
    axios
      .put(`http://localhost:5000/stocks/${id}`, stock)
      .then((res) => {
        console.log("Stock updated successfully:", res.data);
        navigate("/stock-details"); // Redirect after successful update
      })
      .catch((err) => console.error("Error updating stock", err));
  };

  return (
    <div className="form-container">
      <h1>Update Stock</h1>
      <form onSubmit={handleSubmit}>
        <label>Product Name:</label>
        <input
          type="text"
          name="name"
          value={stock.name}
          onChange={handleChange}
          required
          pattern="^[A-Za-z0-9\s]+$"
          title="Product name should only contain letters, numbers, and spaces."
        />

        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={stock.category}
          onChange={handleChange}
          required
          pattern="^[A-Za-z\s]+$"
          title="Category should only contain letters and spaces."
        />

        <label>Quantity:</label>
        <input
          type="number"
          name="quantity"
          value={stock.quantity}
          onChange={handleChange}
          required
          min="1"
          title="Quantity must be a positive number."
        />

        <label>Reorder Level:</label>
        <input
          type="number"
          name="reorderlevel"
          value={stock.reorderlevel}
          onChange={handleChange}
          required
          min="1"
          title="Reorder level must be a positive number."
        />

        <label>Supplier:</label>
        <input
          type="text"
          name="supplier"
          value={stock.supplier}
          onChange={handleChange}
          required
          pattern="^[A-Za-z\s]+$"
          title="Supplier name should only contain letters and spaces."
        />

        

        <button type="submit" className="submitbutton">
          Update Stock
        </button>
      </form>
    </div>
  );
}

export default UpdateStock; // Ensure you export it
