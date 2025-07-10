import React, { useState, useEffect } from "react";
import Nav from "../FNav/FNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import './ExpenceDisplay.css'; // Import the CSS file

const URL = "http://localhost:5000/expences";

const fetchHandlar = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function ExpenceDisplay() {
  // ...existing state and hooks

  // Download Excel function
  const downloadExpenseExcel = () => {
    const worksheetData = filteredExpenses.map(expence => ({
      Title: expence.title,
      Amount: parseFloat(expence.amount),
      Category: expence.category,
      Date: new Date(expence.date).toLocaleDateString(),
      Description: expence.description || "N/A"
    }));
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    XLSX.writeFile(workbook, "expense_report.xlsx");
  };

  const [expences, setExpences] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    setFilteredExpenses(
      expences.filter((expense) =>
        Object.values(expense).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }, [searchTerm, expences]);

  const fetchExpenses = async () => {
    try {
      const data = await fetchHandlar();
      console.log("Fetched data:", data);
      setExpences(data.expences);
      setFilteredExpenses(data.expences); // Initialize filteredExpenses with all expenses
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch expenses. Please try again later.");
    }
  };

  const handleAddNewExpense = () => {
    navigate("/expenses/add");
  };

  const handleUpdateExpense = (id) => {
    navigate(`/expensesdisplay/${id}`);
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await axios.delete(`http://localhost:5000/expences/${id}`);
        setExpences(expences.filter((expence) => expence._id !== id));
        alert("Expense deleted successfully!");
      } catch (error) {
        console.error("Error deleting expense:", error);
        setError("Failed to delete expense. Please try again later.");
      }
    }
  };

  const downloadExpensePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const logoImg = new Image();
    logoImg.src = require('../../assets/logo.png'); // Ensure this path is correct
    // Draw logo (async handling for browser compatibility)
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
      // Topic: Expenses Report (centered)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor('#8B0000'); // Dark maroon
      doc.text('Expenses Report', pageWidth / 2, 46, { align: 'center' });
      // Draw a maroon line under the header
      doc.setDrawColor('#800000');
      doc.setLineWidth(1.2);
      doc.line(10, 52, pageWidth - 10, 52);
      // Table
      autoTable(doc, {
        head: [['Title', 'Amount (Rs.)', 'Category', 'Date', 'Description']],
        body: filteredExpenses.map(expence => [
          expence.title,
          `Rs. ${parseFloat(expence.amount).toFixed(2)}`,
          expence.category,
          new Date(expence.date).toLocaleDateString(),
          expence.description || "N/A",
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
      doc.save('expense_report.pdf');
    };
    // For browsers that load images synchronously
    if (logoImg.complete) logoImg.onload();
  };

  return (
    <div>
      <Nav />
      <h1>Expense Display</h1>
      <div style={{ display: 'flex', marginBottom: '20px', justifyContent: 'space-between' }}>
        <div>
          <button
            onClick={handleAddNewExpense}
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
            Add New Expense
          </button>
          <button
            onClick={downloadExpensePDF}
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
            onClick={downloadExpenseExcel}
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
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : filteredExpenses.length > 0 ? (
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
            {filteredExpenses.map((expence, index) => (
              <tr key={expence._id || index}>
                <td>{expence.title}</td>
                <td>Rs. {parseFloat(expence.amount).toFixed(2)}</td>
                <td>{expence.category}</td>
                <td>{new Date(expence.date).toLocaleDateString()}</td>
                <td>{expence.description || "N/A"}</td>
                <td>
                  <button
                    onClick={() => handleUpdateExpense(expence._id)}
                    className="update-btn"
                    style={{
                      backgroundColor: '#388e3c',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 4,
                      padding: '6px 14px',
                      marginRight: 8,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteExpense(expence._id)}
                    className="delete-btn"
                    style={{
                      backgroundColor: '#800000',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 4,
                      padding: '6px 14px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No expenses found.</p>
      )}
    </div>
  );
}

export default ExpenceDisplay;
