const express = require("express");
const router = express.Router();
const AlertsController = require("../Controller/AlertController");

// Route to get all alerts
router.get("/", AlertsController.getAllAlerts);

// Route to get unread alerts
router.get("/unread", AlertsController.getUnreadAlerts);

// Route to mark an alert as read
router.patch("/:id", AlertsController.markAsRead);

// Route to delete an alert
router.delete("/:id", AlertsController.deleteAlert);

module.exports = router;
