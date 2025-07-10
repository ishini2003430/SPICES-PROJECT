const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Stock", required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["unread", "read"], default: "unread" },
    createdAt: { type: Date, default: Date.now }
});

const Alert = mongoose.model("Alert", alertSchema);

module.exports = Alert;
