const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const stockRoutes = require("./Backend/Route/StockRoute");
const alertRoutes = require("./Backend/Route/AlertRoute");
const supplierRoutes = require("./Backend/Route/Supplierroutes");
const productRoutes = require("./Backend/Route/ProductRoutes");
const salaryRouter = require("./Backend/Route/SalaryRoute");
const expenceRouter = require("./Backend/Route/ExpenceRoute");
const profitLossRouter = require("./Backend/Route/ProfitLossRoute");
const incomeRouter = require("./Backend/Route/IncomeRoute");
const profitLossAlertRouter = require("./Backend/Route/ProfitLossAlertRoute");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// API Routes
app.use("/stocks", stockRoutes);
app.use("/api/alert", alertRoutes);
app.use("/suppliers", supplierRoutes); // Only keep this; no need for "/supplier"
app.use('/api/products', productRoutes);
app.use("/salaries", salaryRouter);
app.use("/expences", expenceRouter);
app.use("/profit-loss", profitLossRouter);
app.use("/incomes", incomeRouter);
app.use("/profit-loss-alerts", profitLossAlertRouter);


// WebSocket setup
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// MongoDB Connection
mongoose.connect("mongodb+srv://Admin:bUYnRHHpCxcCbs11@cluster0.uiv5j.mongodb.net/spicesDB")
  .then(() => {
    console.log("Connected to MongoDB");

    // Dynamic or fallback port to prevent EADDRINUSE
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("Database connection error:", err));
