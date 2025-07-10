import React, { useEffect, useRef, useState } from "react";
import FNav from "../FNav/FNav";
import "./FHome.css";
import Chart from "chart.js/auto";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function FHome() {
  const incomeChartRef = useRef(null);
  const barChartRef = useRef(null);
  const categoryChartRef = useRef(null);
  const navigate = useNavigate();

  const [totalIncome, setTotalIncome] = useState(125000);
  const [totalExpense, setTotalExpense] = useState(50000);
  const balance = totalIncome - totalExpense;

  useEffect(() => {
    async function fetchTotals() {
      try {
        const incomeRes = await axios.get("/api/income");
        setTotalIncome(incomeRes.data.total || 125000);
        const expenseRes = await axios.get("/api/expenses");
        setTotalExpense(expenseRes.data.total || 50000);
      } catch (e) {
        setTotalIncome(125000);
        setTotalExpense(50000);
      }
    }
    fetchTotals();
  }, []);


  function formatLKR(amount) {
    return amount.toLocaleString('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 });
  }

  useEffect(() => {
    let incomeChart, barChart, categoryChart;

    const categoryData = {
      labels: ["Inventory", "Bills", "Sales", "Salary", "Other"],
      datasets: [
        {
          label: "Amount",
          data: [6000, 4000, 3000, 50000, 2000],
          backgroundColor: ["#ff9800", "#8d5524", "#800000", "#ffb347", "#ffd700"],
        },
      ],
    };

    if (incomeChartRef.current) {
      incomeChart = new Chart(incomeChartRef.current, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May"],
          datasets: [
            {
              label: "Income",
              data: [20000, 22000, 18000, 25000, 35000],
              borderColor: "#ff9800",
              backgroundColor: "rgba(255,152,0,0.15)",
              tension: 0.4,
              fill: true,
            },
            {
              label: "Expense",
              data: [12000, 15000, 10000, 18000, 25000],
              borderColor: "#800000",
              backgroundColor: "rgba(128,0,0,0.10)",
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          plugins: { legend: { labels: { color: "#7b3f00" } } },
          scales: { x: { ticks: { color: "#7b3f00" } }, y: { ticks: { color: "#7b3f00" } } },
        },
      });
    }

    if (barChartRef.current) {
      barChart = new Chart(barChartRef.current, {
        type: "bar",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May"],
          datasets: [
            {
              label: "Income",
              data: [20000, 22000, 18000, 25000, 35000],
              backgroundColor: "#ff9800",
              borderRadius: 8,
              barPercentage: 0.5,
            },
            {
              label: "Expense",
              data: [12000, 15000, 10000, 18000, 25000],
              backgroundColor: "#800000",
              borderRadius: 8,
              barPercentage: 0.5,
            },
          ],
        },
        options: {
          plugins: { legend: { labels: { color: "#228B22" } } },
          scales: { x: { ticks: { color: "#228B22" } }, y: { ticks: { color: "#228B22" } } },
        },
      });
    }

    if (categoryChartRef.current) {
      categoryChart = new Chart(categoryChartRef.current, {
        type: "pie",
        data: categoryData,
        options: {
          plugins: { legend: { labels: { color: "#7b3f00" } } },
        },
      });
    }

    return () => {
      if (incomeChart) incomeChart.destroy();
      if (barChart) barChart.destroy();
      if (categoryChart) categoryChart.destroy();
    };
  }, []);

  return (
    <div className="dashboard-container" style={{ background: '#f6f5fa', minHeight: '100vh', padding: 0 }}>
      <FNav />

      {/* Logout button placed below navbar */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 32px' }}>
      <button
  className="logout-btn"
  style={{
    background: 'linear-gradient(90deg, #ff9800 30%, #800000 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '10px 24px',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: 16,
    boxShadow: '0 2px 8px rgba(128,0,0,0.12)',
    transition: 'background 0.2s, box-shadow 0.2s'
  }}
  onClick={() => navigate("/admin-login")}  // Change the route as needed
  onMouseOver={e => e.currentTarget.style.background = 'linear-gradient(90deg, #ffb347 30%, #a0522d 100%)'}
  onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(90deg, #ff9800 30%, #800000 100%)'}
>
  Logout
</button>

      </div>

      <div className="summary-cards" style={{ display: 'flex', gap: 24, justifyContent: 'center', margin: '16px auto 28px auto', maxWidth: 1200, flexWrap: 'wrap' }}>
        <div className="summary-card income" style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 18px rgba(255,152,0,0.08)', border: '2px solid #ffb347', color: '#ff9800', minWidth: 180, textAlign: 'center', padding: '24px 36px', margin: '0 0 12px 0' }}>
          <div style={{ fontWeight: 500, fontSize: 17 }}>Total Income</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, marginTop: 8 }}>{formatLKR(totalIncome)}</div>
        </div>
        <div className="summary-card expense" style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 18px rgba(139,69,19,0.09)', border: '2px solid #8d5524', color: '#8d5524', minWidth: 180, textAlign: 'center', padding: '24px 36px', margin: '0 0 12px 0' }}>
          <div style={{ fontWeight: 500, fontSize: 17 }}>Total Expenses</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, marginTop: 8 }}>{formatLKR(totalExpense)}</div>
        </div>
        <div className="summary-card balance" style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 18px rgba(128,0,0,0.09)', border: '2px solid #800000', color: '#800000', minWidth: 180, textAlign: 'center', padding: '24px 36px', margin: '0 0 12px 0' }}>
          <div style={{ fontWeight: 500, fontSize: 17 }}>Balance</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, marginTop: 8 }}>{formatLKR(balance)}</div>
        </div>
      </div>

      <div className="charts-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 36, maxWidth: 1200, margin: '0 auto 38px auto', alignItems: 'stretch' }}>
        {/* Line Chart */}
        <div className="chart-container" style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 18px rgba(255,152,0,0.09)', padding: '28px 32px 24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 320 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <h3 style={{ color: '#ff9800', fontWeight: 600, fontSize: 20, margin: 0, letterSpacing: 0.5 }}>Income vs Expense Trend</h3>
            <div style={{ flex: 1, height: 1, background: '#ffe0b2', marginLeft: 10, borderRadius: 2 }} />
          </div>
          <canvas ref={incomeChartRef} height="180" style={{ width: '100%', maxWidth: 420, borderRadius: 12, background: '#fffbe7', boxShadow: '0 1px 6px rgba(255,152,0,0.04)' }} />
        </div>

        {/* Bar Chart */}
        <div className="chart-container" style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 18px rgba(34,139,34,0.09)', padding: '28px 32px 24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 320 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <h3 style={{ color: '#228B22', fontWeight: 600, fontSize: 20, margin: 0, letterSpacing: 0.5 }}>Income vs Expense Bar</h3>
            <div style={{ flex: 1, height: 1, background: '#d4f7d4', marginLeft: 10, borderRadius: 2 }} />
          </div>
          <canvas ref={barChartRef} height="180" style={{ width: '100%', maxWidth: 420, borderRadius: 12, background: '#f9fff9', boxShadow: '0 1px 6px rgba(34,139,34,0.04)' }} />
        </div>

        {/* Pie Chart */}
        <div className="chart-container" style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 18px rgba(139,69,19,0.09)', padding: '28px 32px 24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 320 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <h3 style={{ color: '#8d5524', fontWeight: 600, fontSize: 20, margin: 0, letterSpacing: 0.5 }}>Category Breakdown</h3>
            <div style={{ flex: 1, height: 1, background: '#ffe0b2', marginLeft: 10, borderRadius: 2 }} />
          </div>
          <canvas ref={categoryChartRef} height="180" style={{ width: '100%', maxWidth: 420, borderRadius: 12, background: '#fffbe7', boxShadow: '0 1px 6px rgba(139,69,19,0.04)' }} />
        </div>
      </div>
    </div>
  );
}

export default FHome;