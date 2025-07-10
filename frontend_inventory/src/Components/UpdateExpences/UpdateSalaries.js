import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Nav from '../FNav/FNav';

function UpdateSalaries() {
  const [inputs, setInputs] = useState({
    EmployeeId: "",
    stakeholderName: "",
    email: "",
    month: "",
    startDate: "",
    endDate: "",
    allowances: "",
    loanDeduction: ""
  });
  const [error, setError] = useState("");
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/salaries/${id}`);
        const salary = response.data.salary;
        setInputs({
          EmployeeId: salary.EmployeeId,
          stakeholderName: salary.stakeholderName,
          email: salary.email || "",
          month: salary.month,
          startDate: salary.startDate.split("T")[0],
          endDate: salary.endDate.split("T")[0],
          allowances: salary.allowances,
          loanDeduction: salary.loanDeduction
        });
      } catch (error) {
        console.error("Error fetching salary data:", error);
      }
    };
    fetchHandler();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Only allow letters, spaces, and dot for stakeholderName
    if (name === "stakeholderName") {
      const filtered = value.replace(/[^a-zA-Z\s.]/g, "");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputs.EmployeeId || !inputs.stakeholderName || !inputs.email || !inputs.month || 
        !inputs.startDate || !inputs.endDate || inputs.allowances === "" || inputs.loanDeduction === "") {
      setError("All fields are required");
      return;
    }
    // Stakeholder name validation: only letters, spaces, and dot (.)
    if (!/^[A-Za-z .]+$/.test(inputs.stakeholderName)) {
      setError("Stakeholder name can only contain letters, spaces, and dot (.)");
      return;
    }
    // Employee ID validation: only letters and numbers
    if (!/^[A-Za-z0-9]+$/.test(inputs.EmployeeId)) {
      setError("Employee ID can only contain letters and numbers");
      return;
    }
    // Email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email)) {
      setError("Invalid email format");
      return;
    }

    if (inputs.allowances < 0 || inputs.loanDeduction < 0) {
      setError("Allowances and deductions cannot be negative");
      return;
    }

    setError("");

    try {
      await axios.put(`http://localhost:5000/salaries/${id}`, {
        EmployeeId: inputs.EmployeeId,
        stakeholderName: inputs.stakeholderName,
        email: inputs.email,
        month: inputs.month,
        startDate: inputs.startDate,
        endDate: inputs.endDate,
        allowances: parseFloat(inputs.allowances),
        loanDeduction: parseFloat(inputs.loanDeduction)
      });
      history("/salariesdisplay");
    } catch (error) {
      console.error("Error updating salary:", error);
    }
  };

  return (
    <>
      <Nav />
      <div>
      <h1>Update Salary</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Employee ID:</label>
           <input
             type="text"
             name="EmployeeId"
             value={inputs.EmployeeId}
             onChange={handleChange}
             required
             pattern="^[A-Za-z0-9]+$"
             title="Only letters and numbers allowed"
             onKeyPress={e => {
               if (!/[A-Za-z0-9]/.test(e.key)) {
                 e.preventDefault();
               }
             }}
           />
        </div>
        <div>
          <label>Stakeholder Name:</label>
           <input
             type="text"
             name="stakeholderName"
             value={inputs.stakeholderName}
             onChange={handleChange}
             required
             pattern="^[A-Za-z .]+$"
             title="Only letters, spaces, and dot (.) allowed"
             onKeyPress={e => {
               if (!/[A-Za-z .]/.test(e.key)) {
                 e.preventDefault();
               }
             }}
           />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Month:</label>
           <select
             name="month"
             value={inputs.month}
             onChange={handleChange}
             required
             style={{ width: '100%', height: '40px' }}
           >
             <option value="">Select Month</option>
             <option value="January">January</option>
             <option value="February">February</option>
             <option value="March">March</option>
             <option value="April">April</option>
             <option value="May">May</option>
             <option value="June">June</option>
             <option value="July">July</option>
             <option value="August">August</option>
             <option value="September">September</option>
             <option value="October">October</option>
             <option value="November">November</option>
             <option value="December">December</option>
           </select>
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={inputs.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={inputs.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Allowances (Rs.):</label>
          <input
            type="number"
            name="allowances"
            value={inputs.allowances}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>
        <div>
          <label>Loan Deduction (Rs.):</label>
          <input
            type="number"
            name="loanDeduction"
            value={inputs.loanDeduction}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>
        <button type="submit">Update Salary</button>
      </form>
    </div>
    </>
  );
}

export default UpdateSalaries;