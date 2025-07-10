const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expencesSchema = new Schema({
    title: { type: String, required: true }, // Expense name (e.g., "Office Rent")
    amount: { type: Number, required: true }, 
    category: { type: String, required: true }, // Rent, Salary, Utilities
    date: { type: Date, default: Date.now }, 
    description: { type: String }
});

module.exports = mongoose.model(
    "ExpenceModel",     //file name
    expencesSchema      //function name
)