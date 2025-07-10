import React, { useState, useEffect } from "react";
import Nav from "../FNav/FNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import "./IncomeDisplay.css";
import * as XLSX from "xlsx";

const URL = "http://localhost:5000/incomes";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function IncomeDisplay() {
  // ...existing state and hooks

  // Download Excel function
  const downloadIncomeExcel = () => {
    const worksheetData = filteredIncomes.map(income => ({
      Title: income.title,
      Amount: parseFloat(income.amount),
      Category: income.category,
      Date: new Date(income.date).toLocaleDateString(),
      Description: income.description || "N/A"
    }));
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Incomes");
    XLSX.writeFile(workbook, "income_report.xlsx");
  };

  const [incomes, setIncomes] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredIncomes, setFilteredIncomes] = useState([]);

  useEffect(() => {
    fetchIncomes();
  }, []);

  useEffect(() => {
    setFilteredIncomes(
      incomes.filter((income) =>
        Object.values(income).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }, [searchTerm, incomes]);

  const fetchIncomes = async () => {
    try {
      const data = await fetchHandler();
      console.log("Fetched data:", data);
      setIncomes(data.incomes);
      setFilteredIncomes(data.incomes); // Initialize filteredIncomes with all incomes
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch incomes. Please try again later.");
    }
  };

  const handleAddNewIncome = () => {
    navigate("/incomes/add");
  };

  const handleUpdateIncome = (id) => {
    navigate(`/incomesdisplay/${id}`);
  };

  const handleDeleteIncome = async (id) => {
    if (window.confirm("Are you sure you want to delete this income?")) {
      try {
        await axios.delete(`http://localhost:5000/incomes/${id}`);
        setIncomes(incomes.filter((income) => income._id !== id));
        alert("Income deleted successfully!");
      } catch (error) {
        console.error("Error deleting income:", error);
        setError("Failed to delete income. Please try again later.");
      }
    }
  };

  const downloadIncomePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const logoImg = new Image();
    logoImg.src = require('../../assets/logo.png'); // Ensure this path is correct
    logoImg.onload = function() {
      // Logo size
      const imgWidth = 28;
      const imgHeight = 28;
      doc.addImage(logoImg, 'PNG', 10, 10, imgWidth, imgHeight);
      // Aroma Spices name
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.setTextColor('#800000'); // Maroon
      doc.text('Aroma Spices', imgWidth + 20, 22);
      // Date
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.setTextColor('#FF8C00'); // Orange
      doc.text('Date: ' + new Date().toLocaleDateString(), imgWidth + 20, 30);
      // Topic: Income Report (centered)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor('#8B0000'); // Dark maroon
      doc.text('Income Report', pageWidth / 2, 46, { align: 'center' });
      // Draw a maroon line under the header
      doc.setDrawColor('#800000');
      doc.setLineWidth(1.2);
      doc.line(10, 52, pageWidth - 10, 52);
      // Table
      autoTable(doc, {
        head: [['Title', 'Amount (Rs.)', 'Category', 'Date', 'Description']],
        body: filteredIncomes.map(income => [
          income.title,
          `Rs. ${parseFloat(income.amount).toFixed(2)}`,
          income.category,
          new Date(income.date).toLocaleDateString(),
          income.description || "N/A",
        ]),
        startY: 56,
        headStyles: { fillColor: [139, 0, 0], textColor: [255,255,255], fontStyle: 'bold' }, // Maroon
        bodyStyles: { fillColor: [250, 243, 224], textColor: [90, 62, 43] }, // Beige & brown
        alternateRowStyles: { fillColor: [245, 230, 204] }, // Light tan
      });
      // Footer
      const footerY = doc.internal.pageSize.getHeight() - 20;
      doc.setDrawColor('#FFA500');
      doc.setLineWidth(0.8);
      doc.line(10, footerY - 8, pageWidth - 10, footerY - 8);
      doc.setFontSize(10);
      doc.setTextColor('#800000');
      doc.text('Address: 123 Spice Avenue, Colombo, Sri Lanka', 12, footerY);
      doc.text('Contact: +94 77 123 4567', 12, footerY + 6);
      doc.text('Email: info@aromaspices.com', 12, footerY + 12);
      // Social icons (using Unicode as placeholders)
      doc.setFontSize(12);
      doc.setTextColor('#FF8C00');
      doc.text('FB', pageWidth - 60, footerY, { align: 'left' });
      doc.text('X', pageWidth - 45, footerY, { align: 'left' });
      doc.text('IG', pageWidth - 30, footerY, { align: 'left' });
      doc.setFontSize(8);
      doc.setTextColor('#5A3E2B');
      doc.text('Follow us: fb.com/aromaspices | x.com/aromaspices | instagram.com/aromaspices', pageWidth/2, footerY + 12, { align: 'center' });
      doc.save('income_report.pdf');
    };
    if (logoImg.complete) logoImg.onload();
  };

  return (
    <div>
      <Nav />
      <h1>Income Details</h1>
      <div style={{ display: 'flex', marginBottom: '20px', justifyContent: 'space-between' }}>
        <div>
          <button
            onClick={handleAddNewIncome}
            style={{
              marginRight: "10px",
              marginBottom: "20px",
              padding: "10px 20px",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: '15px',
              letterSpacing: '0.5px',
              boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)'
            }}
          >
            Add New Income
          </button>
          <button
            onClick={downloadIncomePDF}
            style={{
              marginRight: "10px",
              padding: "10px 20px",
              backgroundColor: "#FFA500",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: '15px',
              letterSpacing: '0.5px',
              boxShadow: '0 2px 8px rgba(255, 165, 0, 0.10)'
            }}
          >
            Download PDF
          </button>
          <button
            onClick={downloadIncomeExcel}
            style={{
              padding: "10px 20px",
              backgroundColor: "#FF5722",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: '15px',
              letterSpacing: '0.5px',
              boxShadow: '0 2px 8px rgba(255, 87, 34, 0.10)'
            }}
          >
            Download Excel
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
        </div>
      </div>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : filteredIncomes.length > 0 ? (
        <table
          border="1"
          cellPadding="10"
          cellSpacing="0"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount (Rs.)</th>
              <th>Category</th>
              <th>Date</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredIncomes.map((income, index) => (
              <tr key={income._id || index}>
                <td>{income.title}</td>
                <td>Rs. {parseFloat(income.amount).toFixed(2)}</td>
                <td>{income.category}</td>
                <td>{new Date(income.date).toLocaleDateString()}</td>
                <td>{income.description || "N/A"}</td>
                <td>
                  <button
                    onClick={() => handleUpdateIncome(income._id)}
                    className="btn update-btn"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteIncome(income._id)}
                    className="btn delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No incomes found.</p>
      )}
    </div>
  );
}

export default IncomeDisplay;
