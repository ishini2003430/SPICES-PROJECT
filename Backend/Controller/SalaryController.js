const mongoose = require("mongoose");
const Salary = require("../Model/SalaryModel");
const Income = require("../Model/IncomeModel");
const Expences = require("../Model/ExpenceModel");
// backend/controllers/SalaryController.js
const { sendSalaryEmail } = require('../services/emailService');

// Display all salaries
const getAllSalaries = async (req, res, next) => {
    try {
        const salaries = await Salary.find();
        if (!salaries || salaries.length === 0) {
            return res.status(404).json({ message: "Salaries not found" });
        }
        return res.status(200).json({ salaries });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Add new salary
const addSalary = async (req, res, next) => {
    const { EmployeeId, stakeholderName, email, month, startDate, endDate, allowances, loanDeduction } = req.body;

    try {
        // Validate email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Rest of your existing validation and logic
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        if (isNaN(startDateObj.getTime())) {
            return res.status(400).json({ message: "Invalid start date" });
        }

        if (isNaN(endDateObj.getTime())) {
            return res.status(400).json({ message: "Invalid end date" });
        }

        if (startDateObj > endDateObj) {
            return res.status(400).json({ message: "Start date cannot be after end date" });
        }

        const incomes = await Income.find({ date: { $gte: startDateObj, $lte: endDateObj } });
        const expenses = await Expences.find({ date: { $gte: startDateObj, $lte: endDateObj } });

        const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
        const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        const profit = totalIncome - totalExpenses;
        
        if (profit < 0) {
            return res.status(400).json({ message: "Cannot calculate salary for a period with negative profit" });
        }

        const basicSalary = profit * 0.1;
        const netSalary = basicSalary + parseFloat(allowances) - parseFloat(loanDeduction);

        const salary = new Salary({
            EmployeeId,
            stakeholderName,
            email,
            month,
            startDate: startDateObj,
            endDate: endDateObj,
            profit,
            basicSalary,
            allowances: parseFloat(allowances),
            loanDeduction: parseFloat(loanDeduction),
            netSalary
        });

        await salary.save();
        return res.status(201).json({ message: "Salary added successfully", salary });

    } catch (err) {
        console.error("Error adding salary:", err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get salary by ID
const getById = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const salary = await Salary.findById(id);
        if (!salary) {
            return res.status(404).json({ message: "Salary not found" });
        }
        return res.status(200).json({ salary });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update salary
const updateSalary = async (req, res, next) => {
    const id = req.params.id;
    const { EmployeeId, stakeholderName, email, month, startDate, endDate, allowances, loanDeduction } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        // Validate email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Rest of your existing validation and logic
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        if (isNaN(startDateObj.getTime())) {
            return res.status(400).json({ message: "Invalid start date" });
        }

        if (isNaN(endDateObj.getTime())) {
            return res.status(400).json({ message: "Invalid end date" });
        }

        if (startDateObj > endDateObj) {
            return res.status(400).json({ message: "Start date cannot be after end date" });
        }

        const incomes = await Income.find({ date: { $gte: startDateObj, $lte: endDateObj } });
        const expenses = await Expences.find({ date: { $gte: startDateObj, $lte: endDateObj } });

        const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
        const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        const profit = totalIncome - totalExpenses;
        
        if (profit < 0) {
            return res.status(400).json({ message: "Cannot update salary for a period with negative profit" });
        }

        const basicSalary = profit * 0.1;
        const netSalary = basicSalary + parseFloat(allowances) - parseFloat(loanDeduction);

        const salary = await Salary.findByIdAndUpdate(
            id,
            {
                EmployeeId,
                stakeholderName,
                email,
                month,
                startDate: startDateObj,
                endDate: endDateObj,
                profit,
                basicSalary,
                allowances: parseFloat(allowances),
                loanDeduction: parseFloat(loanDeduction),
                netSalary
            },
            { new: true }
        );

        if (!salary) {
            return res.status(404).json({ message: "Salary not found" });
        }
        return res.status(200).json({ message: "Salary updated successfully", salary });

    } catch (err) {
        console.error("Error updating salary:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete salary
const deleteSalary = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const salary = await Salary.findByIdAndDelete(id);
        if (!salary) {
            return res.status(404).json({ message: "Salary not found" });
        }
        return res.status(200).json({ message: "Salary deleted successfully" });
    } catch (err) {
        console.error("Error deleting salary:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// email
const emailSalaryReport = async (req, res) => {
    try {
      const { id } = req.params;
      const salary = await Salary.findById(id);
  
      if (!salary) {
        return res.status(404).json({ error: "Salary record not found" });
      }
  
      const result = await sendSalaryEmail(
        salary.email,
        salary.stakeholderName,
        salary
      );
  
      if (result.success) {
        res.status(200).json({ message: "Email sent successfully!" });
      } else {
        res.status(500).json({ error: result.error });
      }
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };


module.exports = {
    getAllSalaries,
    addSalary,
    getById,
    updateSalary,
    deleteSalary,
    emailSalaryReport 
};