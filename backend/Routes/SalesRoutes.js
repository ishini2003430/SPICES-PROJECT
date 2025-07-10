const express = require("express");
const router = express.Router();
const salesController = require("../Controllers/SalesControllers");

router.get("/", salesController.getAllSales);
router.post("/", salesController.createSale);
router.put("/:id", salesController.updateSale);
router.delete("/:id", salesController.deleteSale);
router.get("/report/pdf", salesController.exportPDF);
router.get("/report/excel", salesController.exportExcel);
router.get("/invoice/:id", salesController.generateInvoice);

module.exports = router; 