const Supplier = require("../model/Suppliermodel");

// GET ALL SUPPLIERS
const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        if (!suppliers.length) {
            return res.status(404).json({ message: "No suppliers found" });
        }
        res.status(200).json({ suppliers });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET SUPPLIER BY ID
const getSupplierById = async (req, res) => {
    const { id } = req.params;
    try {
        const supplier = await Supplier.findById(id);
        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        res.status(200).json({ supplier });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ADD NEW SUPPLIER
const addSupplier = async (req, res) => {
    const { Suppliername, Supplier_company, Supplier_email, Supplier_contactnumber, Supplier_quantity, Supplier_unitprice } = req.body;

    if (!Supplier_quantity || !Supplier_unitprice) {
        return res.status(400).json({ message: "Quantity and Unit Price are required" });
    }

    const newSupplier = new Supplier({
        Suppliername,
        Supplier_company,
        Supplier_email,
        Supplier_contactnumber,
        Supplier_quantity,
        Supplier_unitprice,
        Supplier_totalprice: Supplier_quantity * Supplier_unitprice // Calculate total price
    });

    try {
        await newSupplier.save();
        res.status(201).json({ message: "Supplier added successfully", supplier: newSupplier });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE SUPPLIER
const updateSupplier = async (req, res) => {
    const { id } = req.params;
    const { Suppliername, Supplier_company, Supplier_email, Supplier_contactnumber, Supplier_quantity, Supplier_unitprice } = req.body;

    try {
        const updatedSupplier = await Supplier.findByIdAndUpdate(
            id, 
            { 
                Suppliername, 
                Supplier_company, 
                Supplier_email, 
                Supplier_contactnumber, 
                Supplier_quantity, 
                Supplier_unitprice, 
                Supplier_totalprice: Supplier_quantity * Supplier_unitprice // Recalculate total price
            }, 
            { new: true }
        );

        if (!updatedSupplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }

        res.status(200).json({ message: "Supplier updated successfully", supplier: updatedSupplier });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE SUPPLIER
const deleteSupplier = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSupplier = await Supplier.findByIdAndDelete(id);
        if (!deletedSupplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        res.status(200).json({ message: "Supplier deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Export functions
module.exports = {
    getAllSuppliers,
    getSupplierById,
    addSupplier,
    updateSupplier,
    deleteSupplier
};
