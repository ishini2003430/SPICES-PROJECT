import React, { useState } from "react";
import Nav from "../FNav/FNav";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddExpence() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Only allow letters and spaces for title and category (no numbers or special chars)
    if (name === "title" || name === "category") {
      // Allow only letters and spaces
      const filtered = value.replace(/[^a-zA-Z\s]/g, "");
      setInputs((prevState) => ({
        ...prevState,
        [name]: filtered,
      }));
      return;
    }
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!inputs.title || !inputs.amount || !inputs.category || !inputs.date) {
      setError("All fields are required");
      return;
    }

    // Validate amount (must be positive)
    if (inputs.amount < 0) {
      setError("Amount cannot be negative");
      return;
    }

    // Validate title and category (No special characters like '@', '&', '%', '#')
    const validText = /^[a-zA-Z0-9\s]+$/;
    if (!validText.test(inputs.title) || !validText.test(inputs.category)) {
      setError("Title and Category cannot contain special characters like '@', '&', '%', '#'");
      return;
    }




    // Clear error message
    setError("");

    console.log(inputs);

    sendRequest().then(() => history("/expensesdisplay"));
  };

  // Send POST request to backend
  const sendRequest = async () => {
    await axios
      .post("http://localhost:5000/expences/add", {
        title: String(inputs.title),
        amount: parseFloat(inputs.amount).toFixed(2), // Ensure two decimal places
        category: String(inputs.category),
        date: new Date(inputs.date), // Convert to Date object
        description: String(inputs.description),
      })
      .then((res) => res.data);
  };

  return (
    <div>
      <Nav />
      <h1>Add Expense</h1>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={inputs.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Amount (Rs.):</label> {/* Display amount in Sri Lankan Rupees */}
          <input
            type="number"
            name="amount"
            value={inputs.amount}
            onChange={handleChange}
            step="0.01" // Allow two decimal places
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={inputs.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={inputs.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={inputs.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default AddExpence;