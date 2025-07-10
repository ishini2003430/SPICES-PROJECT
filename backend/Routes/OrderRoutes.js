const express = require("express");
const router = express.Router();
const OrderController = require("../Controllers/OrderControllers");

// Routes
router.get("/stats", OrderController.getOrderStats);
router.get("/report/pdf", OrderController.exportPDF);
router.get("/report/sales", OrderController.generateSalesReport);
router.get("/", OrderController.getAllOrders);
router.post("/", OrderController.createOrder);
router.get("/:id", OrderController.getOrderById);
router.put("/:id", OrderController.updateOrder);
router.delete("/:id", OrderController.deleteOrder);

module.exports = router;
