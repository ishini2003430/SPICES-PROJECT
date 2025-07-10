import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function ChartsDemo() {
  const barRef = useRef(null);
  const pieRef = useRef(null);

  useEffect(() => {
    let barChart, pieChart;
    // Demo data
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const income = [3000, 3200, 2800, 3500, 4000, 3000];
    const expense = [2000, 2100, 1800, 2200, 2700, 1500];
    const categories = ["Food", "Bills", "Shopping", "Travel", "Health", "Other"];
    const catAmounts = [3200, 2500, 1800, 1400, 900, 3500];

    if (barRef.current) {
      barChart = new Chart(barRef.current, {
        type: "bar",
        data: {
          labels: months,
          datasets: [
            {
              label: "Income",
              data: income,
              backgroundColor: "#ff9800",
              borderRadius: 8,
              barPercentage: 0.5,
            },
            {
              label: "Expense",
              data: expense,
              backgroundColor: "#800000",
              borderRadius: 8,
              barPercentage: 0.5,
            },
          ],
        },
        options: {
          plugins: {
            legend: { labels: { color: "#7b3f00", font: { size: 14, weight: 'bold' } } },
            title: { display: false },
          },
          scales: {
            x: { ticks: { color: "#7b3f00", font: { size: 13 } }, grid: { color: '#fff7e6' } },
            y: { ticks: { color: "#7b3f00", font: { size: 13 } }, grid: { color: '#fff7e6' } },
          },
        },
      });
    }
    if (pieRef.current) {
      pieChart = new Chart(pieRef.current, {
        type: "pie",
        data: {
          labels: categories,
          datasets: [
            {
              label: "Amount",
              data: catAmounts,
              backgroundColor: ["#ff9800", "#8d5524", "#800000", "#ffb347", "#ffd700", "#a0522d", "#f9a602"],
              borderColor: '#fff',
              borderWidth: 2,
            },
          ],
        },
        options: {
          plugins: {
            legend: { labels: { color: "#7b3f00", font: { size: 14, weight: 'bold' } }, position: 'bottom' },
            title: { display: false },
          },
        },
      });
    }
    return () => {
      if (barChart) barChart.destroy();
      if (pieChart) pieChart.destroy();
    };
  }, []);

  return (
    <div style={{ background: '#fcfaf7', minHeight: '100vh', padding: 40 }}>
      <h2 style={{ textAlign: 'center', color: '#ff9800', marginBottom: 40 }}>Demo Charts</h2>
      <div style={{ display: 'flex', gap: 36, justifyContent: 'center', maxWidth: 980, margin: '0 auto' }}>
        <div style={{ background: '#fff3cd', borderRadius: 16, padding: '18px 24px', flex: 1, boxShadow: '0 2px 8px rgba(255,152,0,0.09)', minWidth: 320 }}>
          <h3 style={{ color: '#ff9800', fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Income vs Expense Trend</h3>
          <canvas ref={barRef} height="180" />
        </div>
        <div style={{ background: '#fff3cd', borderRadius: 16, padding: '18px 24px', flex: 1, boxShadow: '0 2px 8px rgba(255,152,0,0.09)', minWidth: 320 }}>
          <h3 style={{ color: '#8d5524', fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Category Breakdown</h3>
          <canvas ref={pieRef} height="180" />
        </div>
      </div>
    </div>
  );
}
