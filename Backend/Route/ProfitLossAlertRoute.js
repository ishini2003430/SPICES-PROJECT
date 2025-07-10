const express = require("express");
const router = express.Router();
const ProfitLossAlertController = require("../Controller/ProfitLossAlertController");

// Create a new alert
router.post("/", ProfitLossAlertController.createAlert);

// Get all alerts
router.get("/", ProfitLossAlertController.getAllAlerts);

// Get a single alert
router.get("/:id", ProfitLossAlertController.getAlertById);

// Update an alert
router.put("/:id", ProfitLossAlertController.updateAlert);

// Delete an alert
router.delete("/:id", ProfitLossAlertController.deleteAlert);

module.exports = router;