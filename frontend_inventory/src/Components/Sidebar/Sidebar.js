// src/Components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Sidebar.css';

function Sidebar() {
    return (
        <div className="sidebar">
            <h2>Management System</h2>
            <ul>
                <li><a href="#">Financial Management</a></li>
                <li><Link to="/HomeInventory">Inventory Management</Link></li> {/* Updated Navigation */}
                <li><a href="#">Product Management</a></li>
                <li><a href="#">Supply Management</a></li>
                <li><a href="#">Sales & Order Management</a></li>
            </ul>
        </div>
    );
}

export default Sidebar;
