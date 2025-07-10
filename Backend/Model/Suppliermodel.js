
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const Schema = mongoose.Schema;

const supplierSchema = new Schema({
    Supplier_ID: { 
        type: String, 
        required: true, 
        unique: true,
        default: uuidv4 // Automatically generate Supplier_ID
    },
    Suppliername: { type: String, required: true },
    Supplier_company: { type: String, required: true },
    Supplier_email: { 
        type: String, 
        required: true, 
        unique: true, 
        validate: {
            validator: function(v) {
                return v != null && v.trim() !== ""; // Ensure email is not null or empty
            },
            message: "Supplier_email cannot be null or empty"
        }
    },
    Supplier_contactnumber: { type: String, required: true },
    Supplier_quantity: { type: Number, required: true, min: 1 }, // Added quantity field
    Supplier_unitprice: { type: Number, required: true, min: 0 }, // Added unit price field
    Supplier_totalprice: { type: Number, required: true, min: 0 } // Added total price field
}, { timestamps: true });

// Middleware to calculate total price before saving
supplierSchema.pre("save", function (next) {
    this.Supplier_totalprice = this.Supplier_quantity * this.Supplier_unitprice;
    next();
});

module.exports = mongoose.model("Supplier", supplierSchema);

