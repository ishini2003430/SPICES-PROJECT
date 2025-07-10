const mongoose = require("mongoose");

const managerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true }, // e.g., Inventory Manager, Finance Manager
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model("Manager", managerSchema);
