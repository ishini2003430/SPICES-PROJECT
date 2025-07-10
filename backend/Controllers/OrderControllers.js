const Order = require("../Model/OrderModel");
const PDFDocument = require("pdfkit");
const ExcelJS = require("exceljs");
const path = require("path");
const { sendNewOrderEmail, sendOrderCancelledEmail } = require("../services/emailService");

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ orderDate: -1 });
        if (!orders.length) {
            return res.status(404).json({ message: "No orders found" });
        }
        res.status(200).json({ orders });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get order stats
const getOrderStats = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const totalSales = await Order.aggregate([
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        res.status(200).json({
            totalSales: totalSales[0]?.total || 0,
            totalOrders
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { customerName, email, phone, address, items, totalAmount, paymentMethod } = req.body;
        if (!customerName || !email || !phone || !address || !totalAmount || !paymentMethod) {
            return res.status(400).json({ message: "All required fields must be provided" });
        }

        const order = new Order({
            customerName,
            email,
            phone,
            address,
            items: items || [],
            totalAmount,
            paymentMethod,
            paymentStatus: paymentMethod === 'Card' ? 'Paid' : 'Unpaid',
            status: 'pending'
        });

        await order.save();

        // Send email notification
        await sendNewOrderEmail(order);

        // Emit real-time notification
        const io = req.app.get('io');
        io.emit('newOrder', {
            type: 'new_order',
            message: `New order received from ${customerName}`,
            order: order
        });

        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ order });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update order
const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!order) {
            return res.status(404).json({ message: "Unable to update order" });
        }

        // If order is cancelled, send cancellation email
        if (req.body.status === 'cancelled') {
            await sendOrderCancelledEmail(order);
            
            // Emit real-time notification for cancellation
            const io = req.app.get('io');
            io.emit('orderCancelled', {
                type: 'order_cancelled',
                message: `Order cancelled for ${order.customerName}`,
                order: order
            });
        }

        // Emit real-time notification for status update
        const io = req.app.get('io');
        io.emit('orderUpdated', {
            type: 'order_updated',
            message: `Order status updated for ${order.customerName}`,
            order: order
        });

        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete order
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Unable to delete order" });
        }
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Generate Sales Report (PDF)
const generateSalesReport = async (req, res) => {
    try {
        const orders = await Order.find().sort({ orderDate: -1 });
        const stats = await Order.aggregate([
            { $group: { _id: null, totalSales: { $sum: "$amount" }, totalOrders: { $sum: 1 } } }
        ]);

        const doc = new PDFDocument();
        const filename = `sales-report-${Date.now()}.pdf`;

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

        doc.pipe(res);
        doc.fontSize(20).text("Sales Report", { align: "center" }).moveDown();
        doc.fontSize(14).text(`Total Sales: $${stats[0]?.totalSales || 0}`);
        doc.text(`Total Orders: ${stats[0]?.totalOrders || 0}`).moveDown();

        doc.fontSize(16).text("Recent Orders:", { underline: true }).moveDown();
        orders.forEach((order, index) => {
            doc.fontSize(12)
                .text(`${index + 1}. ${order.customerName} - $${order.amount}`)
                .text(`   Status: ${order.status} | Date: ${order.orderDate.toLocaleDateString()}`)
                .moveDown();
        });

        doc.end();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Export PDF
const exportPDF = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};
        if (search) {
            query = { customerName: { $regex: search, $options: 'i' } };
        }
        const orders = await Order.find(query).sort({ orderDate: -1 });
        const PDFDocument = require('pdfkit');
        const path = require('path');
        const doc = new PDFDocument({ margin: 40, size: 'A4' });
        const filename = `orders-report-${Date.now()}.pdf`;
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=\"${filename}\"`);
        doc.pipe(res);

        // Fonts
        doc.font('Helvetica');

        // Header Section
        const logoPath = path.join(__dirname, '../../front_end/public/favicon.ico.jpg');
        doc.image(logoPath, 40, 30, { width: 50 });
        doc.fontSize(22).fillColor('#990000').font('Helvetica-Bold').text('Aroma Spices', 100, 35, { continued: true });
        doc.fontSize(12).fillColor('#FF9900').font('Helvetica').text(`Date: ${new Date().toLocaleDateString()}`, 0, 40, { align: 'right' });

        // Main Title
        doc.moveDown(1.5);
        doc.fontSize(18).fillColor('#990000').font('Helvetica-Bold').text('Order Report', { align: 'center' });
        doc.moveTo(40, doc.y + 5).lineTo(555, doc.y + 5).strokeColor('#990000').lineWidth(2).stroke();

        // Summary Rectangle
        doc.moveDown(1.5);
        const summaryY = doc.y;
        doc.roundedRect(40, summaryY, 490, 80, 8).fillAndStroke('#f9f3e6', '#e0c9a6');
        doc.fillColor('#222').fontSize(12).font('Helvetica-Bold')
          .text(`Total Orders = ${orders.length}`, 55, summaryY + 12)
          .fillColor('#FF9900').text(`Total Revenue = Rs. ${orders.reduce((sum, o) => sum + (o.totalAmount || o.amount || 0), 0).toLocaleString()}`, 250, summaryY + 12)
          .fillColor('#8e44ad').text(`Pending Orders = ${orders.filter(o => o.status === 'pending').length}`, 55, summaryY + 32)
          .fillColor('#27ae60').text(`Completed Orders = ${orders.filter(o => o.status === 'completed').length}`, 250, summaryY + 32);
        doc.moveDown(4);

        // Table Formatting
        const tableTop = doc.y;
        const colWidths = [90, 120, 110, 60, 40, 60, 50];
        const headers = ["Product Name", "Customer Name", "Email", "Date", "Items", "Total", "Status"];
        let x = 40;
        doc.fontSize(11).font('Helvetica-Bold').fillColor('#fff');
        headers.forEach((header, i) => {
          doc.rect(x, tableTop, colWidths[i], 24).fill('#990000').stroke();
          doc.fillColor('#fff').text(header, x + 5, tableTop + 7, { width: colWidths[i] - 10, align: 'left' });
          x += colWidths[i];
        });

        // Table Rows
        let y = tableTop + 24;
        orders.forEach((order, idx) => {
          x = 40;
          const bgColor = idx % 2 === 0 ? '#fff' : '#f9f3e6';
          doc.fillColor('#222');
        headers.forEach((header, i) => {
            doc.rect(x, y, colWidths[i], 22).fill(bgColor).stroke();
            let text = '';
            switch (header) {
              case "Product Name":
                text = order.items ? order.items.map(i => i.name).join(', ') : '';
                break;
              case "Customer Name":
                text = order.customerName || '';
                break;
              case "Email":
                text = order.email || '';
                break;
              case "Date":
                text = order.orderDate ? new Date(order.orderDate).toLocaleDateString() : (order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '');
                break;
              case "Items":
                text = order.items ? order.items.reduce((sum, i) => sum + (i.quantity || i.qty || 0), 0) : '';
                break;
              case "Total":
                text = `Rs. ${order.totalAmount ? order.totalAmount.toLocaleString() : (order.amount ? order.amount.toLocaleString() : '-')}`;
                break;
              case "Status":
                text = order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : '-';
                break;
            }
            doc.fillColor('#222').font('Helvetica').fontSize(10).text(text, x + 5, y + 6, { width: colWidths[i] - 10, align: 'left' });
            x += colWidths[i];
          });
          y += 22;
          if (y > 700) { doc.addPage(); y = 40; }
        });

        // Footer
        doc.moveTo(40, 780).lineTo(555, 780).strokeColor('#ffe0b2').lineWidth(4).stroke();
        doc.fontSize(10).font('Helvetica-Bold').fillColor('#990000')
          .text('Address: 123 Spice Avenue, Colombo, Sri Lanka', 40, 790)
          .text('Contact: +94 77 123 4567', 40, 805);
        doc.font('Helvetica').fillColor('#444')
          .text('Email: info@aromaspices.com   fb.com/aromaspices   x.com/aromaspices   instagram.com/aromaspices', 40, 820, { width: 515, align: 'left' });

        doc.end();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllOrders,
    createOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
    getOrderStats,
    generateSalesReport,
    exportPDF
};
