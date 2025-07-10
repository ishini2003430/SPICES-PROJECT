// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18+
import './index.css'; // Optional: Add your global CSS styles here
import App from './App'; // Import the App component

const root = ReactDOM.createRoot(document.getElementById('root')); // Creates a root div
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
