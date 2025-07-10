const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profitLossAlertSchema = new Schema({
    periodStart: {
        type: Date,
        required: [true, "Start date is required"],
        validate: {
            validator: function(value) {
                return value < this.periodEnd;
            },
            message: "Start date must be before end date"
        }
    },
    periodEnd: {
        type: Date,
        required: [true, "End date is required"]
    },
    totalIncome: {
        type: Number,
        required: [true, "Income amount is required"],
        min: [0, "Income cannot be negative"]
    },
    totalExpenses: {
        type: Number,
        required: [true, "Expense amount is required"],
        min: [0, "Expenses cannot be negative"]
    },
    profitOrLoss: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['profit', 'loss', 'break-even'],
        default: 'break-even'
    },
    notes: {
        type: String,
        maxlength: [500, "Notes cannot exceed 500 characters"]
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Pre-save hook - SIMPLIFIED AND GUARANTEED TO WORK
profitLossAlertSchema.pre('save', function(next) {
    // Force recalculation every time
    const income = Number(this.totalIncome);
    const expenses = Number(this.totalExpenses);
    this.profitOrLoss = income - expenses;
    
    // Direct status determination - NO EPSILON, NO COMPLEX LOGIC
    if (this.profitOrLoss > 0) {
        this.status = 'profit';
    } else if (this.profitOrLoss < 0) {
        this.status = 'loss';  // THIS WILL NOW WORK
    } else {
        this.status = 'break-even';
    }
    
    next();
});

// Virtual for period duration in days
profitLossAlertSchema.virtual('periodDuration').get(function() {
    return Math.ceil((this.periodEnd - this.periodStart) / (1000 * 60 * 60 * 24));
});

module.exports = mongoose.model("ProfitLossAlert", profitLossAlertSchema);