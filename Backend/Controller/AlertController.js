const Alert = require("../Model/AlertModel");

// GET all alerts
const getAllAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find();

        if (alerts.length === 0) {
            return res.status(404).json({ message: "No alerts found" });
        }

        return res.status(200).json({ alerts });
    } catch (err) {
        console.error("Error fetching alerts:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

// GET unread alerts
const getUnreadAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find({ status: "unread" });

        if (alerts.length === 0) {
            return res.status(404).json({ message: "No unread alerts found" });
        }

        return res.status(200).json({ alerts });
    } catch (err) {
        console.error("Error fetching unread alerts:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

// Mark alert as read
const markAsRead = async (req, res) => {
    const id = req.params.id;

    let alert;
    try {
        alert = await Alert.findByIdAndUpdate(
            id,
            { status: "read" },
            { new: true }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }

    if (!alert) {
        return res.status(404).json({ message: "Alert not found" });
    }

    return res.status(200).json({ alert });
};

// Delete alert
const deleteAlert = async (req, res) => {
    const id = req.params.id;

    let alert;
    try {
        alert = await Alert.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }

    if (!alert) {
        return res.status(404).json({ message: "Alert not found" });
    }

    return res.status(200).json({ message: "Alert deleted successfully" });
};

module.exports = { getAllAlerts, getUnreadAlerts, markAsRead, deleteAlert };
