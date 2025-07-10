import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock authentication logic (replace with real API call)
    if (email === "admin@aroma.com" && password === "123456") {
      alert("Login successful!");
      navigate("/dashboard"); // Change this path to your desired route
    } else {
      alert("Invalid credentials. Try again.");
    }
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
        .login-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 60px 20px;
        }
        .login-logo {
          height: 140px;
          margin-bottom: 30px;
        }
        .login-box {
          background-color: #ffffff;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 6px 15px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 400px;
        }
        .login-box h2 {
          text-align: center;
          color: #E64A19;
          margin-bottom: 30px;
        }
        .login-box input {
          width: 100%;
          padding: 12px;
          margin-bottom: 20px;
          border: 1px solid #ccc;
          border-radius: 6px;
        }
        .login-box button {
          width: 100%;
          background-color: #FF7043;
          color: white;
          padding: 12px;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
        }
        .login-box button:hover {
          background-color: #F4511E;
        }
        .login-footer {
          text-align: center;
          margin-top: 20px;
        }
        .login-footer a {
          color: #BF360C;
          text-decoration: none;
        }
        .login-footer a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="login-container">
        <img src={logo} alt="Aroma Logo" className="login-logo" />
        <form className="login-box" onSubmit={handleLogin}>
          <h2>User Login</h2>
          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <div className="login-footer">
          <p>Don’t have an account? <Link to="/register">Register Here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
