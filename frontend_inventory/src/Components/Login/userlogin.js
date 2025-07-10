import React, { useState } from "react";

const userlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here (e.g., authentication API call)
    console.log("Logged in with:", email, password);
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#FFF8E1", minHeight: "100vh" }}>
      <h2>Login to Your Account</h2>
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default userlogin;
