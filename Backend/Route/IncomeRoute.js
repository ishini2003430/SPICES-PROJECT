const express = require("express");
const router = express.Router();
const IncomeController = require("../Controller/IncomeController");

// Routes for Income
router.get("/", IncomeController.getAllIncomes);
router.post("/add", IncomeController.addIncome);
router.get("/:id", IncomeController.getById);
router.put("/:id", IncomeController.updateIncome);
router.delete("/:id", IncomeController.deleteIncome);

module.exports = router;