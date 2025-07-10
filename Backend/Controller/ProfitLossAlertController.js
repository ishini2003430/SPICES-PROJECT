const ProfitLossAlert = require("../Model/ProfitLossAlertModel");

// Create a new profit/loss alert
const createAlert = async (req, res) => {
    try {
        const { periodStart, periodEnd, totalIncome, totalExpenses } = req.body;

        // Validate required fields
        if (!periodStart || !periodEnd || totalIncome === undefined || totalExpenses === undefined) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Convert to numbers and handle empty/undefined values
        const income = parseFloat(totalIncome) || 0;
        const expenses = parseFloat(totalExpenses) || 0;
        
        // Calculate profit/loss
        const profitOrLoss = income - expenses;

        // Create new alert - let the model handle status determination
        const newAlert = new ProfitLossAlert({
            periodStart: new Date(periodStart),
            periodEnd: new Date(periodEnd),
            totalIncome: income,
            totalExpenses: expenses,
            profitOrLoss: profitOrLoss
        });

        // Save to database
        const savedAlert = await newAlert.save();
        res.status(201).json(savedAlert);
    } catch (error) {
        console.error("Error creating alert:", error);
        res.status(500).json({ 
            message: "Failed to create alert",
            error: error.message,
            stack: error.stack
        });
    }
};

// Get all alerts sorted by creation date (newest first)
const getAllAlerts = async (req, res) => {
    try {
        const alerts = await ProfitLossAlert.find().sort({ createdAt: -1 });
        res.status(200).json(alerts);
    } catch (error) {
        console.error("Error fetching alerts:", error);
        res.status(500).json({
            message: "Failed to fetch alerts",
            error: error.message
        });
    }
};

// Get a single alert by ID
const getAlertById = async (req, res) => {
    try {
        const alert = await ProfitLossAlert.findById(req.params.id);
        if (!alert) {
            return res.status(404).json({ message: "Alert not found" });
        }
        res.status(200).json(alert);
    } catch (error) {
        console.error("Error fetching alert:", error);
        res.status(500).json({
            message: "Failed to fetch alert",
            error: error.message
        });
    }
};

// Update an alert
const updateAlert = async (req, res) => {
    try {
        const { periodStart, periodEnd, totalIncome, totalExpenses } = req.body;

        // Convert to numbers
        const income = Number(totalIncome);
        const expenses = Number(totalExpenses);
        
        // Calculate profit/loss
        const profitOrLoss = income - expenses;

        const updatedAlert = await ProfitLossAlert.findByIdAndUpdate(
            req.params.id,
            {
                periodStart: new Date(periodStart),
                periodEnd: new Date(periodEnd),
                totalIncome: income,
                totalExpenses: expenses,
                profitOrLoss: profitOrLoss
            },
            { new: true, runValidators: true }
        );

        if (!updatedAlert) {
            return res.status(404).json({ message: "Alert not found" });
        }

        res.status(200).json(updatedAlert);
    } catch (error) {
        console.error("Error updating alert:", error);
        res.status(500).json({ 
            message: "Failed to update alert",
            error: error.message 
        });
    }
};

// Delete an alert
const deleteAlert = async (req, res) => {
    try {
        const deletedAlert = await ProfitLossAlert.findByIdAndDelete(req.params.id);
        if (!deletedAlert) {
            return res.status(404).json({ message: "Alert not found" });
        }
        res.status(200).json({ message: "Alert deleted successfully" });
    } catch (error) {
        console.error("Error deleting alert:", error);
        res.status(500).json({
            message: "Failed to delete alert",
            error: error.message
        });
    }
};

module.exports = {
    createAlert,
    getAllAlerts,
    getAlertById,
    updateAlert,
    deleteAlert
};