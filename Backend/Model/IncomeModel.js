const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
  title: { type: String, required: true }, // Income name (e.g., "Sales Revenue")
  amount: { type: Number, required: true },
  category: { type: String, required: true }, // Sales, Investments, etc.
  date: { type: Date, default: Date.now },
  description: { type: String },
});

module.exports = mongoose.model("Income", incomeSchema, "incomes");

