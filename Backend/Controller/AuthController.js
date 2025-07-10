const Manager = require("../Model/Manager");
const bcrypt = require("bcryptjs");

const loginManager = async (req, res) => {
    const { email, password } = req.body;

    try {
        const manager = await Manager.findOne({ email });
        if (!manager) return res.status(404).json({ message: "Manager not found" });

        const isMatch = await bcrypt.compare(password, manager.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        res.status(200).json({ message: "Login successful", manager });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { loginManager };
