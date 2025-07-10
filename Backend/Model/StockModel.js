const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stockSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    reorderlevel: {
        type: Number,
        required: true,
        min: 0,
    },
    supplier: {
        type: String,
        required: true,
    },
    dateAdded: {
        type: Date,
        default: Date.now, // Fix: set default value as Date.now
    }
});

module.exports = mongoose.model("Stock", stockSchema);
