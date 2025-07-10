const mongoose = require("mongoose");
const Income = require("../Model/IncomeModel");

// Display all incomes
const getAllIncomes = async (req, res, next) => {
  let incomes;

  try {
    incomes = await Income.find();
  } catch (err) {
    console.log(err);
  }

  if (!incomes || incomes.length === 0) {
    return res.status(404).json({ message: "Incomes not found" });
  }
  return res.status(200).json({ incomes });
};

// Add new income
const addIncome = async (req, res, next) => {
  const { title, amount, category, date, description } = req.body;

// Validate required fields
if (!title || !amount || !category || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate amount (must be positive)
  if (amount < 0) {
    return res.status(400).json({ message: "Amount cannot be negative" });
  }  

  // Validate title and category (No special characters like '@', '&', '%', '#')
  const validText = /^[a-zA-Z0-9\s]+$/;
  if (!validText.test(title) || !validText.test(category)) {
    return res.status(400).json({ message: "Title and Category cannot contain special characters like '@', '&', '%', '#'" });
  }

  let income;

  try {
    income = new Income({ title, amount, category, date, description });
    await income.save();
  } catch (err) {
    console.log(err);
  }

  if (!income) {
    return res.status(404).json({ message: "Unable to add income" });
  }
  return res.status(200).json({ income });
};

// Get income by ID
const getById = async (req, res, next) => {
  const id = req.params.id;

  let income;

  try {
    income = await Income.findById(id);
  } catch (err) {
    console.log(err);
  }

  if (!income) {
    return res.status(404).json({ message: "Income not found" });
  }

  return res.status(200).json({ income });
};

// Update income
const updateIncome = async (req, res, next) => {
  const id = req.params.id;
  const { title, amount, category, date, description } = req.body;

// Validate required fields
if (!title || !amount || !category || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate amount (must be positive)
  if (amount < 0) {
    return res.status(400).json({ message: "Amount cannot be negative" });
  }

   // Validate title and category (No special characters like '@', '&', '%', '#')
   const validText = /^[a-zA-Z0-9\s]+$/;
   if (!validText.test(title) || !validText.test(category)) {
     return res.status(400).json({ message: "Title and Category cannot contain special characters like '@', '&', '%', '#'" });
   }
    
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  let income;

  try {
    income = await Income.findByIdAndUpdate(
      id,
      { title, amount, category, date, description },
      { new: true }
    );
  } catch (err) {
    console.log("Error updating income:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  if (!income) {
    return res.status(404).json({ message: "Income not found" });
  }

  return res.status(200).json({ message: "Income updated successfully", income });
};

// Delete income
const deleteIncome = async (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  let income;

  try {
    income = await Income.findByIdAndDelete(id);
  } catch (err) {
    console.log("Error deleting income:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  if (!income) {
    return res.status(404).json({ message: "Income not found" });
  }

  return res.status(200).json({ message: "Income deleted successfully" });
};

module.exports = {
  getAllIncomes,
  addIncome,
  getById,
  updateIncome,
  deleteIncome,
};