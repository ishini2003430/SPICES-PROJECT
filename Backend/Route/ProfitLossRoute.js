const express = require("express");
const router = express.Router();
const ProfitLossController = require("../Controller/ProfitLossController.js");

// Route to calculate profit/loss
router.post("/calculate", ProfitLossController.calculateProfitLoss);

module.exports = router;