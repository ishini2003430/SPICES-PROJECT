import React from 'react';
import './FNav.css';
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"; // Make sure logo.jpeg is saved here


function Nav() {
  return (
    <div className="navbar-container">
      <img src={logo} alt="Aroma Spices Logo" className="navbar-logo" />
      <ul className="home-ul">
        <li className="home-11">
          <Link to="/FHome" className="nav-link">Finance Home</Link>
        </li>
        <li className="home-11">
          <Link to="/expenses/add" className="nav-link">Add Expenses</Link>
        </li>
        <li className="home-11">
          <Link to="/expensesdisplay" className="nav-link">Expense Details</Link>
        </li>

        <li className="home-11">
          <Link to="/incomesdisplay" className="nav-link">Income Details</Link>
        </li>

        {/* for Profit/Loss */}
        <li className="home-11">
          <Link to="/profit-loss" className="nav-link">Profit/Loss</Link>
        </li>

        

        <li className="home-11">
  <Link to="/salaries/add" className="nav-link">Add Salary</Link>
</li>
<li className="home-11">
  <Link to="/salariesdisplay" className="nav-link">Salary Details</Link>
</li>
<li className="home-11">
    <Link to="/profit-loss-alerts" className="nav-link">Profit/Loss Alerts</Link>
</li>

      </ul>
    </div>
 );     
   
}

export default Nav
