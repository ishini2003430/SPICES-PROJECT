
const express = require("express");
const router1 = express.Router();
const SupplierController = require("../Controller/Suppliercontroller");

// CRUD Routes
router1.get("/", SupplierController.getAllSuppliers); // Get all suppliers
router1.get("/:id", SupplierController.getSupplierById); // Get supplier by ID
router1.post("/", SupplierController.addSupplier); // Add new supplier
router1.put("/:id", SupplierController.updateSupplier); // Update supplier
router1.delete("/:id", SupplierController.deleteSupplier); // Delete supplier

module.exports = router1;
