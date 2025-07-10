const Sales = require("../Model/SalesModel");
const PDFDocument = require("pdfkit");
const ExcelJS = require("exceljs");
const path = require("path");

// Get all sales
exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sales.find().sort({ date: -1 });
    res.status(200).json({ sales });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new sale
exports.createSale = async (req, res) => {
  try {
    const sale = new Sales(req.body);
    await sale.save();
    res.status(201).json(sale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Export PDF
exports.exportPDF = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = { customerName: { $regex: search, $options: 'i' } };
    }
    const sales = await Sales.find(query).sort({ date: -1 });
    const doc = new PDFDocument();
    const filename = `sales-report-${Date.now()}.pdf`;
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=\"${filename}\"`);
    doc.pipe(res);

    // Add logo
    const logoPath = path.join(__dirname, "../../front_end/public/favicon.ico.jpg");
    doc.image(logoPath, 50, 50, { width: 100 });

    // Header
    doc.fontSize(18).text("Aroma Spices Pvt Ltd", { align: "center" });
    doc.fontSize(14).text("Sales Report", { align: "center" });
    doc.fontSize(10).text(`Generated On: ${new Date().toLocaleString()}`, { align: "center" });
    if (search) {
      doc.fontSize(10).text(`Filtered by: ${search}`, { align: "center" });
    }
    doc.moveDown(2);

    // Table header
    const tableTop = 200;
    const tableLeft = 50;
    const colWidth = 80;
    const rowHeight = 30;
    const headers = ["Customer", "Email", "Date", "Amount", "Payment", "Status"];
    
    // Draw table header with blue background
    doc.fillColor("#1E90FF");
    headers.forEach((header, i) => {
      doc.rect(tableLeft + (i * colWidth), tableTop, colWidth, rowHeight).fill();
    });

    // Draw header text in white
    doc.fillColor("#FFFFFF");
    headers.forEach((header, i) => {
      doc.text(header, tableLeft + (i * colWidth) + 5, tableTop + 10);
    });

    // Draw table rows
    doc.fillColor("#000000");
    sales.forEach((sale, index) => {
      const y = tableTop + ((index + 1) * rowHeight);
      doc.text(sale.customerName, tableLeft + 5, y + 10);
      doc.text(sale.email, tableLeft + colWidth + 5, y + 10);
      doc.text(sale.date.toLocaleDateString(), tableLeft + (colWidth * 2) + 5, y + 10);
      doc.text(`Rs.${sale.amount}`, tableLeft + (colWidth * 3) + 5, y + 10);
      doc.text(sale.paymentMethod, tableLeft + (colWidth * 4) + 5, y + 10);
      doc.text(sale.status, tableLeft + (colWidth * 5) + 5, y + 10);
    });

    // Summary section
    const summaryTop = tableTop + ((sales.length + 1) * rowHeight) + 20;
    doc.moveDown();
    doc.fontSize(12).text("Summary", { underline: true });
    const totalSales = sales.length;
    const totalRevenue = sales.reduce((sum, s) => sum + (s.amount || 0), 0);
    const totalRefunded = sales.filter(s => s.status === "Refunded").length;
    const paymentMethods = {};
    sales.forEach(s => { paymentMethods[s.paymentMethod] = (paymentMethods[s.paymentMethod] || 0) + 1; });
    const mostCommonPayment = Object.keys(paymentMethods).reduce((a, b) => paymentMethods[a] > paymentMethods[b] ? a : b, "-");

    // Summary table
    const summaryHeaders = ["Metric", "Value"];
    const summaryData = [
      ["Total Sales Count", totalSales],
      ["Total Revenue", `Rs.${totalRevenue}`],
      ["Total Refunded", totalRefunded],
      ["Most Common Payment", mostCommonPayment]
    ];

    // Draw summary table header
    doc.fillColor("#1E90FF");
    summaryHeaders.forEach((header, i) => {
      doc.rect(tableLeft + (i * colWidth * 2), summaryTop, colWidth * 2, rowHeight).fill();
    });

    // Draw summary header text
    doc.fillColor("#FFFFFF");
    summaryHeaders.forEach((header, i) => {
      doc.text(header, tableLeft + (i * colWidth * 2) + 5, summaryTop + 10);
    });

    // Draw summary data
    doc.fillColor("#000000");
    summaryData.forEach((row, index) => {
      const y = summaryTop + ((index + 1) * rowHeight);
      doc.text(row[0], tableLeft + 5, y + 10);
      doc.text(row[1], tableLeft + (colWidth * 2) + 5, y + 10);
    });

    doc.end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Export Excel
exports.exportExcel = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = { customerName: { $regex: search, $options: 'i' } };
    }
    const sales = await Sales.find(query).sort({ date: -1 });
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sales Report");
    
    // Add filter information if search is present
    if (search) {
      worksheet.addRow(["Filtered by:", search]);
      worksheet.addRow([]);
    }
    
    worksheet.addRow(["Customer", "Email", "Date", "Amount", "Payment Method", "Payment Status", "Sales Status"]);
    sales.forEach(sale => {
      worksheet.addRow([
        sale.customerName,
        sale.email,
        sale.date.toLocaleDateString(),
        sale.amount,
        sale.paymentMethod,
        sale.paymentStatus,
        sale.status
      ]);
    });
    // Summary
    worksheet.addRow([]);
    worksheet.addRow(["Total Sales Count", sales.length]);
    worksheet.addRow(["Total Revenue", sales.reduce((sum, s) => sum + (s.amount || 0), 0)]);
    worksheet.addRow(["Total Refunded", sales.filter(s => s.status === "Refunded").length]);
    const paymentMethods = {};
    sales.forEach(s => { paymentMethods[s.paymentMethod] = (paymentMethods[s.paymentMethod] || 0) + 1; });
    const mostCommonPayment = Object.keys(paymentMethods).reduce((a, b) => paymentMethods[a] > paymentMethods[b] ? a : b, "-");
    worksheet.addRow(["Most Common Payment Method", mostCommonPayment]);
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=sales-report.xlsx");
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Generate Invoice
exports.generateInvoice = async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id);
    if (!sale) return res.status(404).json({ message: "Sale not found" });
    const doc = new PDFDocument();
    const filename = `invoice-${sale.orderId}.pdf`;
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=\"${filename}\"`);
    doc.pipe(res);
    doc.fontSize(18).text("Aroma Spices Pvt Ltd", { align: "center" });
    doc.fontSize(14).text("Invoice", { align: "center" });
    doc.fontSize(10).text(`Generated On: ${new Date().toLocaleString()}`, { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Order: ${sale.orderId}`);
    doc.text(`Customer: ${sale.customerName}`);
    doc.text(`Date: ${sale.date.toLocaleDateString()}`);
    doc.text(`Payment Method: ${sale.paymentMethod}`);
    doc.text(`Payment Status: ${sale.paymentStatus}`);
    doc.text(`Sales Status: ${sale.status}`);
    doc.moveDown();
    doc.text("Items:");
    sale.items.forEach(item => {
      doc.text(`- ${item.name} x${item.qty} @ Rs.${item.price}`);
    });
    doc.moveDown();
    doc.fontSize(14).text(`Total Amount: Rs.${sale.amount}`);
    doc.end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a sale
exports.updateSale = async (req, res) => {
  try {
    const sale = await Sales.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!sale) return res.status(404).json({ message: "Sale not found" });
    res.status(200).json(sale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a sale
exports.deleteSale = async (req, res) => {
  try {
    const sale = await Sales.findByIdAndDelete(req.params.id);
    if (!sale) return res.status(404).json({ message: "Sale not found" });
    res.status(200).json({ message: "Sale deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 