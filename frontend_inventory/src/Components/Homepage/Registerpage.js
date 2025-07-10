import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Replace this with your actual backend registration call
    console.log("Registered user:", user);
    alert("Registration successful!");
    navigate("/dashboard");
  };

  return (
    <div>
      <style>{`
        body, html {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', sans-serif;
          background-color: #FFF8E1;
        }
        .register-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 60px 20px;
        }
        .register-logo {
          height: 80px;
          margin-bottom: 30px;
        }
        .register-box {
          background-color: #ffffff;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 6px 15px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 450px;
        }
        .register-box h2 {
          text-align: center;
          color: #E64A19;
          margin-bottom: 30px;
        }
        .register-box input {
          width: 100%;
          padding: 12px;
          margin-bottom: 20px;
          border: 1px solid #ccc;
          border-radius: 6px;
        }
        .register-box button {
          width: 100%;
          background-color: #FF7043;
          color: white;
          padding: 12px;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
        }
        .register-box button:hover {
          background-color: #F4511E;
        }
        .register-footer {
          text-align: center;
          margin-top: 20px;
        }
        .register-footer a {
          color: #BF360C;
          text-decoration: none;
        }
        .register-footer a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="register-container">
        <img src={logo} alt="Aroma Logo" className="register-logo" />
        <form className="register-box" onSubmit={handleRegister}>
          <h2>Create an Account</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={user.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={user.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={user.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            value={user.confirmPassword}
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </form>
        <div className="register-footer">
          <p>Already have an account? <Link to="/login">Login Here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
