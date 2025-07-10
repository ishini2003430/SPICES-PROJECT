import React, { useState, useEffect } from "react";
import Nav from "../FNav/FNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import './ExpenceDisplay.css';

const URL = "http://localhost:5000/salaries";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function SalaryDisplay() {
  const navigate = useNavigate();
  const [salaries, setSalaries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSalaries, setFilteredSalaries] = useState([]);

  useEffect(() => {
    fetchSalaries();
  }, []);

  useEffect(() => {
    setFilteredSalaries(
      salaries.filter((salary) =>
        Object.values(salary).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }, [searchTerm, salaries]);

  const fetchSalaries = async () => {
    try {
      setLoading(true);
      const data = await fetchHandler();
      setSalaries(data.salaries);
      setFilteredSalaries(data.salaries);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch salaries. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewSalary = () => {
    navigate("/salaries/add");
  };

  const handleUpdateSalary = (id) => {
    navigate(`/salariesdisplay/${id}`);
  };

  const handleViewSalary = (id) => {
    navigate(`/salarydetails/${id}`);
  }

  const handleDeleteSalary = async (id) => {
    if (window.confirm("Are you sure you want to delete this salary record?")) {
      try {
        await axios.delete(`${URL}/${id}`);
        setSalaries(salaries.filter((salary) => salary._id !== id));
        alert("Salary deleted successfully!");
      } catch (error) {
        console.error("Error deleting salary:", error);
        setError("Failed to delete salary. Please try again later.");
      }
    }
  };

  const handleSendEmail = async (id) => {
    if (window.confirm("Send salary report to this employee's email?")) {
      try {
        const response = await axios.post(`${URL}/${id}/send-email`);
        alert(response.data.message || "Email sent successfully!");
      } catch (error) {
        console.error("Error sending email:", error);
        alert(error.response?.data?.message || "Failed to send email");
      }
    }
  };

  const downloadSalaryPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const logoImg = new Image();
    logoImg.src = require('../../assets/logo.png');
    
    // Draw logo (async handling for browser compatibility)
    logoImg.onload = function() {
      // Logo size
      const imgWidth = 28;
      const imgHeight = 28;
      doc.addImage(logoImg, 'PNG', 10, 10, imgWidth, imgHeight);
      
      // Aroma Spices name
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.setTextColor('#800000');
      doc.text('Aroma Spices', 45, 22);
      
      // Report date
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.setTextColor('#FF8C00');
      doc.text(`Report Date: ${new Date().toLocaleDateString()}`, 45, 30);
      
      // Report title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor('#8B0000');
      doc.text('Salary Report', pageWidth / 2, 46, { align: 'center' });
      
      // Decorative line
      doc.setDrawColor('#800000');
      doc.setLineWidth(1.2);
      doc.line(10, 52, pageWidth - 10, 52);

      // Generate table
      autoTable(doc, {
        head: [['ID', 'Name', 'Email', 'Month', 'Basic', 'Allowances', 'Deductions', 'Net']],
        body: filteredSalaries.map(salary => [
          salary.EmployeeId,
          salary.stakeholderName,
          salary.email || '-',
          salary.month,
          `Rs. ${salary.basicSalary.toFixed(2)}`,
          `Rs. ${salary.allowances.toFixed(2)}`,
          `Rs. ${salary.loanDeduction.toFixed(2)}`,
          `Rs. ${salary.netSalary.toFixed(2)}`
        ]),
        startY: 56,
        headStyles: { 
          fillColor: [139, 0, 0], 
          textColor: [255, 255, 255], 
          fontStyle: 'bold',
          fontSize: 10
        },
        bodyStyles: { 
          fontSize: 9,
          cellPadding: 3,
          fillColor: [250, 243, 224], 
          textColor: [90, 62, 43] 
        },
        alternateRowStyles: { 
          fillColor: [245, 230, 204] 
        },
        theme: 'plain'
      });

      // Add Footer
      const footerY = doc.internal.pageSize.getHeight() - 20;
      doc.setDrawColor('#FFA500');
      doc.setLineWidth(0.8);
      doc.line(10, footerY - 8, pageWidth - 10, footerY - 8);
      
      // Footer text
      doc.setFontSize(10);
      doc.setTextColor('#800000');
      doc.text('Address: 123 Spice Avenue, Colombo, Sri Lanka', 12, footerY);
      doc.text('Contact: +94 77 123 4567', 12, footerY + 6);
      doc.text('Email: info@aromaspices.com', 12, footerY + 12);
      
      // Social media icons
      doc.setFontSize(12);
      doc.setTextColor('#FF8C00');
      doc.text('FB', pageWidth - 60, footerY, { align: 'left' });
      doc.text('X', pageWidth - 45, footerY, { align: 'left' });
      doc.text('IG', pageWidth - 30, footerY, { align: 'left' });
      
      // Social media links
      doc.setFontSize(8);
      doc.setTextColor('#5A3E2B');
      doc.text('Follow us: fb.com/aromaspices | x.com/aromaspices | instagram.com/aromaspices', pageWidth/2, footerY + 12, { align: 'center' });

      doc.save('salary_report.pdf');
    };
  };

  const downloadSalaryExcel = () => {
    const worksheetData = filteredSalaries.map(salary => ({
      'Employee ID': salary.EmployeeId,
      'Name': salary.stakeholderName,
      'Email': salary.email || '',
      'Month': salary.month,
      'Basic Salary': salary.basicSalary,
      'Allowances': salary.allowances,
      'Deductions': salary.loanDeduction,
      'Net Salary': salary.netSalary
    }));
    
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Salaries');
    XLSX.writeFile(workbook, 'salary_report.xlsx');
  };

  return (
    <div className="salary-dashboard-container">
      <Nav />
      <h1>Salary Details</h1>
      
      {loading && <p>Loading salaries...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: 'flex', marginBottom: '20px', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={handleAddNewSalary}
            style={{
              padding: "10px 20px",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: '15px',
              boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)'
            }}
          >
            Add New Salary
          </button>
          <button
            onClick={downloadSalaryPDF}
            style={{
              padding: "10px 20px",
              backgroundColor: "#FFA500",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: '15px',
              boxShadow: '0 2px 8px rgba(255, 165, 0, 0.10)'
            }}
          >
            Download PDF
          </button>
          <button
            onClick={downloadSalaryExcel}
            style={{
              padding: "10px 20px",
              backgroundColor: "#FF5722",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: '15px',
              boxShadow: '0 2px 8px rgba(255, 87, 34, 0.10)'
            }}
          >
            Download Excel
          </button>
        </div>
        
        <div style={{ marginTop: '10px' }}>
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              minWidth: '250px'
            }}
          />
        </div>
      </div>

      {filteredSalaries.length > 0 ? (
        <div style={{ overflowX: 'auto' }}>
          <table className="salary-table" style={{ minWidth: '800px' }}>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Month</th>
                <th>Basic Salary</th>
                <th>Allowances</th>
                <th>Deductions</th>
                <th>Net Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSalaries.map((salary) => (
                <tr key={salary._id}>
                  <td>{salary.EmployeeId}</td>
                  <td>{salary.stakeholderName}</td>
                  <td>{salary.email || '-'}</td>
                  <td>{salary.month}</td>
                  <td style={{ textAlign: 'right' }}>Rs. {salary.basicSalary.toFixed(2)}</td>
                  <td style={{ textAlign: 'right' }}>Rs. {salary.allowances.toFixed(2)}</td>
                  <td style={{ textAlign: 'right' }}>Rs. {salary.loanDeduction.toFixed(2)}</td>
                  <td style={{ textAlign: 'right' }}>Rs. {salary.netSalary.toFixed(2)}</td>
                  <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                    <button
                      onClick={() => handleViewSalary(salary._id)}
                      className="btn view-btn"
                      title="View Salary Details"
                      style={{ margin: '0 2px' }}
                    >
                      <span role="img" aria-label="View">👁️</span>
                    </button>
                    <button
                      onClick={() => handleSendEmail(salary._id)}
                      className="btn download-btn"
                      title="Send Email"
                      style={{ margin: '0 2px' }}
                    >
                      <span>📧</span>
                    </button>
                    <button
                      onClick={() => handleUpdateSalary(salary._id)}
                      className="btn update-btn"
                      style={{ 
                        padding: '5px 12px',
                        margin: '0 2px',
                        minWidth: '70px'
                      }}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteSalary(salary._id)}
                      className="btn delete-btn"
                      style={{ 
                        padding: '5px 12px',
                        margin: '0 2px',
                        minWidth: '70px'
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ textAlign: 'center', margin: '20px 0' }}>
          {salaries.length === 0 ? 'No salary records found' : 'No matching records found'}
        </p>
      )}
    </div>
  );
}

export default SalaryDisplay;