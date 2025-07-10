import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../FNav/FNav";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const SalaryDetails = () => {
  const { id } = useParams();
  const [salary, setSalary] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSalary = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/salaries/${id}`);
        setSalary(res.data.salary || res.data); // Support both {salary: {...}} and {...}
      } catch (err) {
        setError("Could not fetch salary details.");
      }
    };
    fetchSalary();
  }, [id]);

  if (error) return <div><Nav /><p style={{color: 'red'}}>{error}</p></div>;
  if (!salary) return <div><Nav /><p>Loading...</p></div>;

  // Download PDF for this salary
  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const logoImg = new window.Image();
    logoImg.src = require('../../assets/logo.png'); // Using the correct logo file
    logoImg.onload = function() {
      // Logo size
      const imgWidth = 28;
      const imgHeight = 28;
      doc.addImage(logoImg, 'JPEG', 10, 10, imgWidth, imgHeight);
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
      // Topic: Stakeholder's Salary Report (centered)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor('#8B0000'); // Dark maroon
      doc.text("Stakeholder's Salary Report", pageWidth / 2, 46, { align: 'center' });
      // Draw a maroon line under the header
      doc.setDrawColor('#800000');
      doc.setLineWidth(1.2);
      doc.line(10, 52, pageWidth - 10, 52);
      // Table
      autoTable(doc, {
        head: [['Field', 'Value']],
        body: [
          ['Employee ID', salary.EmployeeId],
          ['Name', salary.stakeholderName],
          ['Email', salary.email],
          ['Month', salary.month],
          ['Basic Salary', `Rs. ${salary.basicSalary?.toFixed(2)}`],
          ['Allowances', `Rs. ${salary.allowances?.toFixed(2)}`],
          ['Deductions', `Rs. ${salary.loanDeduction?.toFixed(2)}`],
          ['Net Salary', `Rs. ${salary.netSalary?.toFixed(2)}`]
        ],
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
      doc.save('salary_details.pdf');
    };
    if (logoImg.complete) logoImg.onload();
  };


  // Download Excel for this salary
  const downloadExcel = () => {
    const data = [
      {
        'Employee ID': salary.EmployeeId,
        'Name': salary.stakeholderName,
        'Email': salary.email,
        'Month': salary.month,
        'Basic Salary': salary.basicSalary,
        'Allowances': salary.allowances,
        'Deductions': salary.loanDeduction,
        'Net Salary': salary.netSalary
      }
    ];
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'SalaryDetails');
    XLSX.writeFile(wb, 'salary_details.xlsx');
  };


  return (
    <>
      <Nav />
      <div style={{ display: 'flex', justifyContent: 'flex-end', maxWidth: 600, margin: '32px auto 0 auto', gap: '10px' }}>

        <button
          onClick={downloadPDF}
          style={{
            padding: '10px 20px',
            backgroundColor: '#FFA500',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '15px',
            letterSpacing: '0.5px',
            marginRight: '10px',
            boxShadow: '0 2px 8px rgba(255, 165, 0, 0.10)'
          }}
        >
          Download PDF
        </button>
        <button
          onClick={downloadExcel}
          style={{
            padding: '10px 20px',
            backgroundColor: '#FF5722',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '15px',
            letterSpacing: '0.5px',
            boxShadow: '0 2px 8px rgba(255, 87, 34, 0.10)'
          }}
        >
          Download Excel
        </button>
      </div>
      <div className="salary-details-container" style={{ maxWidth: 600, margin: '24px auto 0 auto', background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)', padding: 24 }}>
        <h2 style={{ color: '#1976d2', marginBottom: 24 }}>Salary Details</h2>
        <table style={{ width: '100%', fontSize: 16, marginBottom: 24 }}>
          <tbody>
            <tr><td style={{ fontWeight: 600 }}>Employee ID:</td><td>{salary.EmployeeId}</td></tr>
            <tr><td style={{ fontWeight: 600 }}>Name:</td><td>{salary.stakeholderName}</td></tr>
            <tr><td style={{ fontWeight: 600 }}>Email:</td><td>{salary.email}</td></tr>
            <tr><td style={{ fontWeight: 600 }}>Month:</td><td>{salary.month}</td></tr>
            <tr><td style={{ fontWeight: 600 }}>Basic Salary:</td><td>Rs. {salary.basicSalary?.toFixed(2)}</td></tr>
            <tr><td style={{ fontWeight: 600 }}>Allowances:</td><td>Rs. {salary.allowances?.toFixed(2)}</td></tr>
            <tr><td style={{ fontWeight: 600 }}>Deductions:</td><td>Rs. {salary.loanDeduction?.toFixed(2)}</td></tr>
            <tr><td style={{ fontWeight: 600 }}>Net Salary:</td><td>Rs. {salary.netSalary?.toFixed(2)}</td></tr>
            {/* Add more fields if needed */}
          </tbody>
        </table>
        <button
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: 5, padding: '10px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer', boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)'
          }}
        >
          Back
        </button>
      </div>
    </>
  );
};

export default SalaryDetails;
