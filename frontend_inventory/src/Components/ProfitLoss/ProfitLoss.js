import React, { useState } from "react";
import Nav from "../FNav/FNav";
import axios from "axios";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import "./ProfitLoss.css";

function ProfitLoss() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const formatDateForAPI = (dateString) => {
    return dateString; // Already in YYYY-MM-DD format from date input
  };

  const handleCalculate = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/profit-loss/calculate", {
        startDate: formatDateForAPI(startDate),
        endDate: formatDateForAPI(endDate)
      });
      
      setResult(response.data);
      setError("");
      setAlertMessage("");
      
      const profitText = response.data.status === 'profit'
        ? `Profit: Rs. ${response.data.profitOrLoss.toFixed(2)}`
        : response.data.status === 'loss'
        ? `Loss: Rs. ${Math.abs(response.data.profitOrLoss).toFixed(2)}`
        : 'Break-even';
      
      alert(`Calculation Complete!\n\n` +
            `Period: ${startDate} to ${endDate}\n` +
            `Total Income: Rs. ${response.data.totalIncome.toFixed(2)}\n` +
            `Total Expenses: Rs. ${response.data.totalExpenses.toFixed(2)}\n` +
            `${profitText}`);
            
    } catch (error) {
      console.error("Error calculating profit/loss:", error);
      const errorMsg = error.response?.data?.message || "Failed to calculate profit/loss. Please try again.";
      setError(errorMsg);
      setAlertMessage("");
    }
  };

  const saveAsAlert = async () => {
    if (!result) return;
    
    try {
      await axios.post("http://localhost:5000/profit-loss-alerts", {
        periodStart: startDate,
        periodEnd: endDate,
        totalIncome: result.totalIncome,
        totalExpenses: result.totalExpenses,
        profitOrLoss: result.profitOrLoss,
        status: result.status
      });
      setAlertMessage("Alert saved successfully!");
      setTimeout(() => setAlertMessage(""), 3000);
    } catch (error) {
      console.error("Error saving alert:", error);
      setAlertMessage("Failed to save alert. Please try again.");
      setTimeout(() => setAlertMessage(""), 3000);
    }
  };

  const downloadPDF = () => {
    if (!result) return;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const logoImg = new Image();
    logoImg.src = require('../../assets/logo.png');
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
      // Topic: Profit/Loss Report (centered)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor('#8B0000'); // Dark maroon
      doc.text('Profit/Loss Report', pageWidth / 2, 46, { align: 'center' });
      // Draw a maroon line under the header
      doc.setDrawColor('#800000');
      doc.setLineWidth(1.2);
      doc.line(10, 52, pageWidth - 10, 52);

      // Table
      autoTable(doc, {
        head: [['Period', 'Total Income (Rs.)', 'Total Expenses (Rs.)', 'Profit/Loss (Rs.)', 'Status']],
        body: [[
          `${startDate} to ${endDate}`,
          `Rs. ${result.totalIncome.toFixed(2)}`,
          `Rs. ${result.totalExpenses.toFixed(2)}`,
          `Rs. ${Math.abs(result.profitOrLoss).toFixed(2)}`,
          result.status.charAt(0).toUpperCase() + result.status.slice(1)
        ]],
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
      // Social icons
      doc.setFontSize(12);
      doc.setTextColor('#FF8C00');
      doc.text('FB', pageWidth - 60, footerY, { align: 'left' });
      doc.text('X', pageWidth - 45, footerY, { align: 'left' });
      doc.text('IG', pageWidth - 30, footerY, { align: 'left' });
      doc.setFontSize(8);
      doc.setTextColor('#5A3E2B');
      doc.text('Follow us: fb.com/aromaspices | x.com/aromaspices | instagram.com/aromaspices', pageWidth/2, footerY + 12, { align: 'center' });
      doc.save('profit_loss_report.pdf');
    };
    if (logoImg.complete) logoImg.onload();
  };

  const downloadExcel = () => {
    if (!result) return;
    const wsData = [[
      "Period",
      "Total Income",
      "Total Expenses",
      "Profit/Loss"
    ], [
      `${startDate} to ${endDate}`,
      result.totalIncome,
      result.totalExpenses,
      result.profitOrLoss
    ]];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ProfitLoss");
    XLSX.writeFile(wb, `ProfitLoss_${startDate}_to_${endDate}.xlsx`);
  };

  return (
    <>
      <Nav />
      <div className="profit-loss-container">
        <h1>Calculate Profit or Loss</h1>
        {error && <div className="error-message">{error}</div>}
        {alertMessage && (
          <div className={`alert-message ${alertMessage.includes("successfully") ? "success" : "error"}`}>
            {alertMessage}
          </div>
        )}

        <form onSubmit={handleCalculate} className="profit-loss-form">
          <div className="form-group">
            <label>Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="calculate-btn">Calculate</button>
        </form>

        {result && (
          <>
            <div className="results-container">
              <h2>Results</h2>
              <p>Total Income: Rs. {result.totalIncome.toFixed(2)}</p>
              <p>Total Expenses: Rs. {result.totalExpenses.toFixed(2)}</p>
              <p className={result.status === 'profit' ? "profit" : result.status === 'loss' ? "loss" : "break-even"}>
                {result.status === 'profit' ? `Profit: Rs. ${result.profitOrLoss.toFixed(2)}` : 
                 result.status === 'loss' ? `Loss: Rs. ${Math.abs(result.profitOrLoss).toFixed(2)}` : 
                 'Break-even'}
              </p>
            </div>

            <div className="action-buttons">
              <div className="download-buttons">
                <button onClick={downloadPDF} className="pdf-btn">
                  Download PDF
                </button>
                <button onClick={downloadExcel} className="excel-btn">
                  Download Excel
                </button>
              </div>
              <button onClick={saveAsAlert} className="save-alert-btn">
                Save as Alert
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProfitLoss;