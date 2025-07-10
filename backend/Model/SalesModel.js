const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, enum: ["Completed", "Refunded", "Pending"], default: "Completed" },
  paymentStatus: { type: String, enum: ["Paid", "Unpaid", "Refunded"], default: "Paid" },
  items: [
    {
      name: String,
      qty: Number,
      price: Number
    }
  ]
});

module.exports = mongoose.model("Sales", SalesSchema); 