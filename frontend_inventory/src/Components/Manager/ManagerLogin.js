import React, { useState } from "react";
import axios from "axios";

const ManagerLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      alert(res.data.message);
      // Redirect to dashboard based on role
    } catch (err) {
      alert(err.response.data.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Manager Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default ManagerLogin;
