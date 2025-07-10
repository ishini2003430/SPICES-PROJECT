import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import profileIcon from '../../assets/profile.png';

function Navbar({ setSearchQuery }) {
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <style>{`
        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 40px;
           background-color: rgb(223, 145, 63);
          color:rgb(6, 5, 5);
         font-family: 'Segoe UI', sans-serif;
          height: 140px;
          position: fixed;
          font-size: 20px;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
        }

        .sidebar-logo img {
          height: 90px;
          margin-left: 10px;
          filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.2));
        }

        .navbar ul {
          list-style: none;
          display: flex;
          gap: 25px;
          margin: 0;
          padding: 0;
        }

        .navbar ul li {
          display: flex;
          align-items: center;
        }

        .navbar ul li a {
         color: #4E342E;;
          text-decoration: none;
          font-weight: 600;
         font-size: 20px;
          padding: 10px 14px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .navbar ul li a:hover {
          background-color: rgba(19, 16, 16, 0.2);
        }

        .search-form {
          display: flex;
           width:290px;
            background-color:rgb(223, 145, 63);
          height:90px;
          margin-left: 220px;
          align-items: center;
          gap: 3px;
        }

        .search-form input {
          padding: 5px 10px;
          font-size: 13px;
          border: none;
          border-radius: 20px;
          outline: none;
          background-color: #fff;
          color: #333;
          width: 180px; /* Adjusted smaller width */
        }

        .searchbutton button {
          padding: 5px 10px;
          background-color: #fff;
          border: none;
          color: #ef6c00;
          border-radius: 20px;
          cursor: pointer;
          font-weight: bold;
          font-size: 13px;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .searchbutton button:hover {
          background-color: #ef6c00;
          color: #fff;
        }

        .profile-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .profile-icon {
          height: 42px;
          width: 42px;
          border-radius: 50%;
          border: 2px solid #fff;
          transition: transform 0.3s;
        }

        .profile-icon:hover {
          transform: scale(1.05);
        }

        .profile-dropdown {
          display: none; /* Can be expanded with dropdown logic later */
        }

        @media (max-width: 768px) {
          .navbar {
            flex-wrap: wrap;
            height: auto;
            padding: 20px;
          }

          .navbar ul {
            flex-direction: column;
            align-items: center;
            gap: 10px;
          }

          .search-form {
            margin-top: 10px;
            width: 100%; /* Full width on smaller screens */
            justify-content: center;
          }

          .search-form input {
            width: 150px; /* Smaller width on mobile */
          }
        }
      `}</style>

      <nav className="navbar">
        {/* Company Logo */}
        <div className="sidebar-logo">
          <img src={logo} alt="Company Logo" />
        </div>

        {/* Navigation Links */}
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/add-stock">Add Stock</Link></li>
          <li><Link to="/stock-details">Stock Details</Link></li>
          <li><Link to="/alert">Alert</Link></li>
        </ul>

        {/* Search Form */}
        <form className="search-form">
          <input 
            type="text" 
            placeholder="Search Product"
            onChange={handleSearch}
          />
          <div className="searchbutton">
            <button type="button">Search</button>
          </div>
        </form>

        {/* Profile Section */}
        <div className="profile-section">
          <img src={profileIcon} alt="Profile" className="profile-icon" />
          <div className="profile-dropdown">
            <Link to="/profile">My Profile</Link>
            <Link to="/logout">Logout</Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
