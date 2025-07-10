const Stock = require("../Model/StockModel");
const Alert =require("../Model/AlertModel");


// GET all stocks
const getAllStocks = async (req, res) => {
    try {
        const stocks = await Stock.find();

        if (stocks.length === 0) {
            return res.status(404).json({ message: "No stocks found" });
        }

        return res.status(200).json({ stocks });
    } catch (err) {
        console.error("Error fetching stocks:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

const addStocks = async (req, res) => {
    const { name, category, quantity, reorderlevel, supplier, dateAdded } = req.body;

    try {
        const stock = new Stock({ name, category, quantity, reorderlevel, supplier, dateAdded });
        await stock.save();

        if (stock.quantity <= stock.reorderlevel) {
            const existingAlert = await Alert.findOne({ productId: stock._id, status: "unread" });
            if (!existingAlert) {
                await Alert.create({
                    productId: stock._id,
                    message: `⚠️ Stock for ${stock.name} is at or below reorder level!`,
                    status: "unread"
                });
                console.log(`🚨 Alert Created for Product: ${stock.name}`);

                // Emit an event to notify connected clients
                io.emit('alertCreated', {
                    productId: stock._id,
                    message: `⚠️ Stock for ${stock.name} is at or below reorder level!`,
                });
            }
        }

        return res.status(201).json({ message: "Stock added successfully", stock });

    } catch (err) {
        console.error("Error adding stock:", err);
        return res.status(500).json({ message: "Server error" });
    }
};




// Get stock by ID
const getById = async (req, res) => {
    const id = req.params.id;

    let stock;
    try {
        stock = await Stock.findById(id);
    } catch (err) {
        console.log(err);
    }

    if (!stock) {
        return res.status(404).json({ message: "Stock not found" });
    }
    return res.status(200).json({ stock });
};

// Update stock details
const updatestock = async (req, res) => {
    const id = req.params.id;
    const { name, category, quantity, reorderlevel, supplier, dateAdded } = req.body;

    let stock;
    try {
        stock = await Stock.findByIdAndUpdate(
            id,
            { name, category, quantity, reorderlevel, supplier, dateAdded },
            { new: true }
        );

        // ✅ Check stock level after update
        if (stock.quantity <= stock.reorderlevel) {
            const existingAlert = await Alert.findOne({ productId: stock._id, status: "unread" });

            if (!existingAlert) {
                await Alert.create({
                    productId: stock._id,
                    message: `⚠️ Stock for ${stock.name} is at or below reorder level!`,
                    status: "unread"
                });
                console.log(`🚨 Alert Created for Product: ${stock.name}`);
            }
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }

    if (!stock) {
        return res.status(404).json({ message: "Unable to update stock details" });
    }
    return res.status(200).json({ stock });
};


// Delete stock details
const deletestock = async (req, res) => {
    const id = req.params.id;

    let stock;

    try {
        stock = await Stock.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }

    if (!stock) {
        return res.status(404).json({ message: "Unable to delete stock details" });
    }
    return res.status(200).json({ stock });
};

module.exports = { getAllStocks, addStocks, getById, updatestock, deletestock };
