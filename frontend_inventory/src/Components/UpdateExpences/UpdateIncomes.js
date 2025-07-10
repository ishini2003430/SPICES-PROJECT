import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Nav from '../FNav/FNav';

function UpdateIncomes() {
  const [inputs, setInputs] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    description: "",
  });
  const [error, setError] = useState("");
  const history = useNavigate();
  const { id } = useParams(); // Get the income ID from the URL

  // Fetch the income data when the component mounts
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/incomes/${id}`);
        const income = response.data.income;
        setInputs({
          title: income.title,
          amount: income.amount,
          category: income.category,
          date: income.date.split("T")[0], // Format date for input field
          description: income.description,
        });
      } catch (error) {
        console.error("Error fetching income data:", error);
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
      await axios.put(`http://localhost:5000/incomes/${id}`, {
        title: inputs.title,
        amount: parseFloat(inputs.amount).toFixed(2), // Ensure two decimal places
        category: inputs.category,
        date: inputs.date,
        description: inputs.description,
      });
      history("/incomesdisplay"); // Navigate back to the display page
    } catch (error) {
      console.error("Error updating income:", error);
    }
  };

  return (
    <>
      <Nav />
      <div>
      <h1>Update Income</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
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
          />
        </div>
        <div>
          <label>Amount (Rs.):</label>
          <input
            type="number"
            name="amount"
            value={inputs.amount}
            onChange={handleChange}
            step="0.01"
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
            pattern="^[a-zA-Z0-9\s]+$"
            title="Only letters, numbers, and spaces allowed"
            onKeyPress={e => {
              if (!/[a-zA-Z0-9 ]/.test(e.key)) {
                e.preventDefault();
              }
            }}
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
        <button type="submit">Update Income</button>
      </form>
    </div>
    </>
  );
}

export default UpdateIncomes;