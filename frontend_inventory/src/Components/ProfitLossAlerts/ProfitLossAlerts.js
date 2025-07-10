import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../FNav/FNav";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import "./ProfitLossAlerts.css";

function ProfitLossAlerts() {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/profit-loss-alerts");
                setAlerts(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching alerts:", err);
                setError("Failed to fetch alerts. Please try again.");
                setLoading(false);
            }
        };

        fetchAlerts();
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'profit': return 'green';
            case 'loss': return 'red';
            case 'break-even': return 'blue';
            default: return 'gray';
        }
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const logoImg = new Image();
        logoImg.src = require('../../assets/logo.png');
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
            doc.text('Profit & Loss Alerts Report', pageWidth / 2, 46, { align: 'center' });
            // Line
            doc.setDrawColor('#800000');
            doc.setLineWidth(1.2);
            doc.line(10, 52, pageWidth - 10, 52);

            // Table data
            const tableData = filteredAlerts.map(alert => [
                `${formatDate(alert.periodStart)} - ${formatDate(alert.periodEnd)}`,
                `Rs. ${alert.totalIncome.toFixed(2)}`,
                `Rs. ${alert.totalExpenses.toFixed(2)}`,
                `Rs. ${Math.abs(alert.profitOrLoss).toFixed(2)}`,
                alert.status
            ]);

            // Table
            autoTable(doc, {
                head: [['Period', 'Income', 'Expenses', 'Profit/Loss', 'Status']],
                body: tableData,
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
            doc.save('profit_loss_alerts_report.pdf');
        };
        if (logoImg.complete) logoImg.onload();
    };

    const downloadExcel = () => {
        const wsData = [
            ['Period', 'Income', 'Expenses', 'Profit/Loss', 'Status'],
            ...filteredAlerts.map(alert => [
                `${formatDate(alert.periodStart)} - ${formatDate(alert.periodEnd)}`,
                alert.totalIncome,
                alert.totalExpenses,
                alert.profitOrLoss,
                alert.status
            ])
        ];
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "ProfitLossAlerts");
        XLSX.writeFile(wb, `profit_loss_alerts_report.xlsx`);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this alert?")) {
            try {
                await axios.delete(`http://localhost:5000/profit-loss-alerts/${id}`);
                setAlerts(alerts.filter(alert => alert._id !== id));
                alert("Alert deleted successfully!");
            } catch (error) {
                console.error("Error deleting alert:", error);
                alert("Failed to delete alert. Please try again.");
            }
        }
    };

    const filteredAlerts = alerts.filter(alert => {
        const matchesSearch = searchTerm === "" || 
            alert.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
            alert.totalIncome.toString().includes(searchTerm) ||
            alert.totalExpenses.toString().includes(searchTerm) ||
            alert.profitOrLoss.toString().includes(searchTerm);

        const matchesDateRange = (!startDate || new Date(alert.periodStart) >= new Date(startDate)) &&
            (!endDate || new Date(alert.periodEnd) <= new Date(endDate));

        const matchesStatus = statusFilter === "all" || alert.status === statusFilter;

        return matchesSearch && matchesDateRange && matchesStatus;
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <>
            <Nav />
            <div className="profit-loss-alerts-container">
                <h1>Profit/Loss Alerts</h1>

                {/* Search and Filter Section */}
                <div style={{ 
                    backgroundColor: '#f5f5f5',
                    padding: '12px',
                    borderRadius: '8px',
                    marginBottom: '15px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '10px',
                        alignItems: 'center'
                    }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Search:</label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search alerts..."
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Start Date:</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>End Date:</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Status:</label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px'
                                }}
                            >
                                <option value="all">All</option>
                                <option value="profit">Profit</option>
                                <option value="loss">Loss</option>
                                <option value="break-even">Break Even</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Download Buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '20px' }}>
                    <button
                        onClick={downloadPDF}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#2196F3",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px"
                        }}
                    >
                        Download PDF
                    </button>
                    <button
                        onClick={downloadExcel}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#4CAF50",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px"
                        }}
                    >
                        Download Excel
                    </button>
                </div>

                {/* Results Count */}
                <div style={{ marginBottom: '15px', color: '#666' }}>
                    Showing {filteredAlerts.length} of {alerts.length} alerts
                </div>

                {/* Alerts Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th>Period</th>
                            <th>Income</th>
                            <th>Expenses</th>
                            <th>Profit/Loss</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAlerts.map((alert) => (
                            <tr key={alert._id}>
                                <td>{formatDate(alert.periodStart)} - {formatDate(alert.periodEnd)}</td>
                                <td>Rs. {alert.totalIncome.toFixed(2)}</td>
                                <td>Rs. {alert.totalExpenses.toFixed(2)}</td>
                                <td>Rs. {Math.abs(alert.profitOrLoss).toFixed(2)}</td>
                                <td>
                                    <span
                                        style={{
                                            backgroundColor: getStatusColor(alert.status),
                                            color: 'white',
                                            padding: '6px 12px',
                                            borderRadius: '20px',
                                            display: 'inline-block',
                                            width: '100px',
                                            textAlign: 'center',
                                            fontSize: '0.9em',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(alert._id)}
                                        style={{
                                            padding: '6px 12px',
                                            backgroundColor: '#800000',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '14px'
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
        </>
    );
}

export default ProfitLossAlerts;