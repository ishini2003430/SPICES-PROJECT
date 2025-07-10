const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    items: [{ type: Object }],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "processing", "completed", "cancelled"], default: "pending" },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, enum: ["Paid", "Unpaid", "Refunded"], default: "Unpaid" },
    orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
