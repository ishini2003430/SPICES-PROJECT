const express = require("express");
const { getAllStocks, addStocks, getById, updatestock, deletestock } = require("../Controller/StockController");

const router = express.Router();

// Routes for Stock Management
router.get("/", getAllStocks);           // Get all stocks
router.post("/", addStocks);             // Add a new stock
router.get("/:id", getById);             // Get stock by ID
router.put("/:id", updatestock);         // Update stock details
router.delete("/:id", deletestock);      // Delete stock by ID

module.exports = router;
