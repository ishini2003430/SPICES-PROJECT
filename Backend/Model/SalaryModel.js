const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salarySchema = new Schema({
    EmployeeId: { type: String, required: true },
    stakeholderName: { type: String, required: true },
    email: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    month: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    profit: { type: Number, required: true },
    basicSalary: { type: Number, required: true },
    allowances: { type: Number, required: true },
    loanDeduction: { type: Number, required: true },
    netSalary: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Salary", salarySchema, "salaries");