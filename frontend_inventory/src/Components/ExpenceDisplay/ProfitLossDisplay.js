import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './ExpenceDisplay.css';

function ProfitLossDisplay() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [profitLoss, setProfitLoss] = useState(0);

  useEffect(() => {
    // Fetch income and expense totals from your backend endpoints
    async function fetchTotals() {
      try {
        const incomeRes = await fetch('/api/income');
        const incomeData = await incomeRes.json();
        setTotalIncome(incomeData.total || 0);
        const expenseRes = await fetch('/api/expenses');
        const expenseData = await expenseRes.json();
        setTotalExpense(expenseData.total || 0);
        setProfitLoss((incomeData.total || 0) - (expenseData.total || 0));
      } catch (e) {
        setTotalIncome(0);
        setTotalExpense(0);
        setProfitLoss(0);
      }
    }
    fetchTotals();
  }, []);

  const downloadProfitLossPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const logoImg = new Image();
    logoImg.src = require('../../assets/logo.jpeg');
    logoImg.onload = function() {
      // Logo
      const imgWidth = 28;
      const imgHeight = 28;
      doc.addImage(logoImg, 'JPEG', 10, 10, imgWidth, imgHeight);
      // Company name
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.setTextColor('#800000');
      doc.text('Aroma Spices', imgWidth + 20, 22);
      // Date
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.setTextColor('#FF8C00');
      doc.text('Date: ' + new Date().toLocaleDateString(), imgWidth + 20, 30);
      // Topic
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor('#8B0000');
      doc.text('Profit & Loss Report', pageWidth / 2, 46, { align: 'center' });
      // Line
      doc.setDrawColor('#800000');
      doc.setLineWidth(1.2);
      doc.line(10, 52, pageWidth - 10, 52);
      // Table
      autoTable(doc, {
        head: [['Total Income', 'Total Expense', 'Profit/Loss']],
        body: [[
          `Rs. ${totalIncome.toLocaleString()}`,
          `Rs. ${totalExpense.toLocaleString()}`,
          profitLoss > 0 ? `Profit: Rs. ${profitLoss.toLocaleString()}` : profitLoss < 0 ? `Loss: Rs. ${Math.abs(profitLoss).toLocaleString()}` : 'Break-even'
        ]],
        startY: 56,
        headStyles: { fillColor: [139, 0, 0], textColor: [255,255,255], fontStyle: 'bold' },
        bodyStyles: { fillColor: [250, 243, 224], textColor: [90, 62, 43] },
        alternateRowStyles: { fillColor: [245, 230, 204] },
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

  return (
    <div className="salary-dashboard-container">
      <Nav />
      <h1>Profit & Loss Report</h1>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '10px' }}>
        <div style={{ background: '#fff', border: '1.5px solid #ff9800', borderRadius: 10, color: '#ff9800', minWidth: 80, maxWidth: 110, textAlign: 'center', padding: '6px 8px', fontSize: 12, fontWeight: 500 }}>
          <div>Total Income</div>
          <div style={{ fontWeight: 700, fontSize: 13 }}>Rs. {totalIncome.toLocaleString()}</div>
        </div>
        <div style={{ background: '#fff', border: '1.5px solid #8d5524', borderRadius: 10, color: '#8d5524', minWidth: 80, maxWidth: 110, textAlign: 'center', padding: '6px 8px', fontSize: 12, fontWeight: 500 }}>
          <div>Total Expense</div>
          <div style={{ fontWeight: 700, fontSize: 13 }}>Rs. {totalExpense.toLocaleString()}</div>
        </div>
        <div style={{ background: '#fff', border: '1.5px solid #800000', borderRadius: 10, color: '#800000', minWidth: 80, maxWidth: 110, textAlign: 'center', padding: '6px 8px', fontSize: 12, fontWeight: 500 }}>
          <div>Profit/Loss</div>
          <div style={{ fontWeight: 700, fontSize: 13 }}>
            {profitLoss > 0 ? `Profit: Rs. ${profitLoss.toLocaleString()}` : profitLoss < 0 ? `Loss: Rs. ${Math.abs(profitLoss).toLocaleString()}` : 'Break-even'}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', marginBottom: '20px', justifyContent: 'flex-end' }}>
        <button
          onClick={downloadProfitLossPDF}
          style={{
            marginBottom: "20px",
            padding: "10px 20px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Download PDF
        </button>
      </div>
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Total Income</th>
            <th>Total Expense</th>
            <th>Profit/Loss</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Rs. {totalIncome.toLocaleString()}</td>
            <td>Rs. {totalExpense.toLocaleString()}</td>
            <td style={{ fontWeight: 700, color: profitLoss > 0 ? '#388e3c' : profitLoss < 0 ? '#d32f2f' : '#8d5524' }}>
              {profitLoss > 0 ? `Profit: Rs. ${profitLoss.toLocaleString()}` : profitLoss < 0 ? `Loss: Rs. ${Math.abs(profitLoss).toLocaleString()}` : 'Break-even'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ProfitLossDisplay;
