import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../FNav/FNav";
import "./AddEditAlert.css";

function AddEditAlert() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [alertData, setAlertData] = useState({
        periodStart: "",
        periodEnd: "",
        totalIncome: "",
        totalExpenses: "",
        profitOrLoss: ""
    });
    const [error, setError] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (id) {
            setIsEditMode(true);
            const fetchAlert = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/profit-loss-alerts/${id}`);
                    setAlertData({
                        periodStart: response.data.periodStart.split('T')[0],
                        periodEnd: response.data.periodEnd.split('T')[0],
                        totalIncome: response.data.totalIncome,
                        totalExpenses: response.data.totalExpenses,
                        profitOrLoss: response.data.profitOrLoss
                    });
                } catch (err) {
                    console.error("Error fetching alert:", err);
                    setError("Failed to fetch alert. Please try again.");
                }
            };
            fetchAlert();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAlertData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const calculateProfitLoss = () => {
        const income = parseFloat(alertData.totalIncome) || 0;
        const expenses = parseFloat(alertData.totalExpenses) || 0;
        const profitLoss = income - expenses;
        setAlertData(prev => ({
            ...prev,
            profitOrLoss: profitLoss.toFixed(2)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!alertData.periodStart || !alertData.periodEnd || 
            alertData.totalIncome === "" || alertData.totalExpenses === "") {
            setError("Please fill in all required fields.");
            return;
        }

        // Ensure profit/loss is calculated
        calculateProfitLoss();

        try {
            const dataToSend = {
                periodStart: alertData.periodStart,
                periodEnd: alertData.periodEnd,
                totalIncome: parseFloat(alertData.totalIncome),
                totalExpenses: parseFloat(alertData.totalExpenses)
            };

            if (isEditMode) {
                await axios.put(`http://localhost:5000/profit-loss-alerts/${id}`, dataToSend);
            } else {
                await axios.post("http://localhost:5000/profit-loss-alerts", dataToSend);
            }
            navigate("/profit-loss-alerts");
        } catch (err) {
            console.error("Error saving alert:", err);
            setError("Failed to save alert. Please try again.");
        }
    };

    return (
        <>
            <Nav />
            <div className="add-edit-alert-container">
                <h1>{isEditMode ? "Edit Alert" : "Add New Alert"}</h1>
                {error && <div className="error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Start Date:</label>
                        <input
                            type="date"
                            name="periodStart"
                            value={alertData.periodStart}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>End Date:</label>
                        <input
                            type="date"
                            name="periodEnd"
                            value={alertData.periodEnd}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Total Income (Rs.):</label>
                        <input
                            type="number"
                            name="totalIncome"
                            value={alertData.totalIncome}
                            onChange={handleChange}
                            onBlur={calculateProfitLoss}
                            step="0.01"
                            min="0"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Total Expenses (Rs.):</label>
                        <input
                            type="number"
                            name="totalExpenses"
                            value={alertData.totalExpenses}
                            onChange={handleChange}
                            onBlur={calculateProfitLoss}
                            step="0.01"
                            min="0"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Profit/Loss (Rs.):</label>
                        <input
                            type="number"
                            name="profitOrLoss"
                            value={alertData.profitOrLoss}
                            readOnly
                            className="read-only"
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="save-btn">
                            {isEditMode ? "Update Alert" : "Save Alert"}
                        </button>
                        <button 
                            type="button" 
                            className="cancel-btn"
                            onClick={() => navigate("/profit-loss-alerts")}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddEditAlert;