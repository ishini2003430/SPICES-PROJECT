const Income = require("../Model/IncomeModel");
const Expence = require("../Model/ExpenceModel");
const ProfitLossAlert = require("../Model/ProfitLossAlertModel");

const calculateProfitLoss = async (req, res) => {
  const { startDate, endDate } = req.body;

  if (!startDate || !endDate) {
    return res.status(400).json({ message: "Both start and end dates are required" });
  }

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime())) {
      return res.status(400).json({ message: "Invalid start date" });
    }
    if (isNaN(end.getTime())) {
      return res.status(400).json({ message: "Invalid end date" });
    }

    const [incomes, expenses] = await Promise.all([
      Income.find({ date: { $gte: start, $lte: end } }),
      Expence.find({ date: { $gte: start, $lte: end } })
    ]);

    const totalIncome = incomes.reduce((sum, income) => sum + (income.amount || 0), 0);
    const totalExpenses = expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
    const profitOrLoss = totalIncome - totalExpenses;

    // Check for break-even with a small epsilon
    const epsilon = 0.01; // 1 cent tolerance
    const status = Math.abs(profitOrLoss) < epsilon ? 'break-even' :
                  profitOrLoss > 0 ? 'profit' : 'loss';
    
    const adjustedProfitOrLoss = Math.abs(profitOrLoss) < epsilon ? 0 : profitOrLoss;

    res.status(200).json({
      totalIncome,
      totalExpenses,
      profitOrLoss: adjustedProfitOrLoss,
      status
    });
  } catch (error) {
    console.error("Error calculating profit/loss:", error);
    res.status(500).json({ 
      message: "Failed to calculate profit/loss",
      error: error.message 
    });
  }
};

const saveProfitLossAlert = async (req, res) => {
  try {
    const { periodStart, periodEnd, totalIncome, totalExpenses, profitOrLoss, status } = req.body;

    const newAlert = new ProfitLossAlert({
      periodStart,
      periodEnd,
      totalIncome,
      totalExpenses,
      profitOrLoss,
      status
    });

    await newAlert.save();
    res.status(201).json(newAlert);
  } catch (error) {
    console.error("Error creating alert:", error);
    res.status(500).json({ message: "Failed to create alert" });
  }
};

module.exports = { 
  calculateProfitLoss,
  saveProfitLossAlert
};