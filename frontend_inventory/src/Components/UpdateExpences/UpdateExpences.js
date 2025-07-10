import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './UpdateExpences.css';
import Nav from '../FNav/FNav';

function UpdateExpences() {
  const [inputs, setInputs] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    description: "",
  });
  const [error, setError] = useState("");
  const history = useNavigate();
  const { id } = useParams(); // Get the expense ID from the URL

  // Fetch the expense data when the component mounts
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/expences/${id}`);
        const expense = response.data.expence;
        setInputs({
          title: expense.title,
          amount: expense.amount,
          category: expense.category,
          date: expense.date.split("T")[0], // Format date for input field
          description: expense.description,
        });
      } catch (error) {
        console.error("Error fetching expense data:", error);
      }
    };
    fetchHandler();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
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

    try {
      await axios.put(`http://localhost:5000/expences/${id}`, {
        title: inputs.title,
        amount: parseFloat(inputs.amount).toFixed(2), // Ensure two decimal places
        category: inputs.category,
        date: inputs.date,
        description: inputs.description,
      });
      history("/expensesdisplay"); // Navigate back to the display page
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  return (
    <>
      <Nav />
      <div className="update-expense-container">
        <h1>Update Expense</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="expense-form">
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={inputs.title}
              onChange={handleChange}
              required
              pattern="^[a-zA-Z0-9\s]+$"
              title="Only letters, numbers, and spaces allowed"
              onKeyPress={e => {
                if (!/[a-zA-Z0-9 ]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Amount (Rs.):</label>
            <input
              type="number"
              name="amount"
              value={inputs.amount}
              onChange={handleChange}
              step="0.01"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={inputs.category}
              onChange={handleChange}
              required
              pattern="^[a-zA-Z0-9\s]+$"
              title="Only letters, numbers, and spaces allowed"
              onKeyPress={e => {
                if (!/[a-zA-Z0-9 ]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={inputs.date}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={inputs.description}
              onChange={handleChange}
              className="form-textarea"
            />
          </div>
          <button type="submit" className="submit-button">Update Expense</button>
        </form>
      </div>
    </>
  );
}

export default UpdateExpences;