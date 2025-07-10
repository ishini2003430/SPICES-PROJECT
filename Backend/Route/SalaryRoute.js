const express = require("express");
const router = express.Router();
const { getAllSalaries, addSalary, getById, updateSalary, deleteSalary , emailSalaryReport } = require("../Controller/SalaryController");

// Routes for Salary
router.get("/", getAllSalaries);
router.post("/add", addSalary);
router.get("/:id", getById);
router.put("/:id", updateSalary);
router.delete("/:id", deleteSalary);
router.post('/:id/send-email',emailSalaryReport);

module.exports = router;