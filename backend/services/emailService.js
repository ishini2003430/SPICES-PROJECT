const nodemailer = require('nodemailer');

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'spicesaroma91@gmail.com',
        pass: 'qomd xjkz mnai okhl'
    }
});

// Send email for new order
const sendNewOrderEmail = async (order) => {
    try {
        const mailOptions = {
            from: 'spicesaroma91@gmail.com',
            to: order.email,
            subject: 'New Order Confirmation - Aroma Spices',
            html: `
                <h2>Thank you for your order!</h2>
                <p>Dear ${order.customerName},</p>
                <p>We have received your order and it is being processed.</p>
                <h3>Order Details:</h3>
                <ul>
                    <li>Order ID: ${order._id}</li>
                    <li>Total Amount: Rs. ${order.totalAmount}</li>
                    <li>Payment Method: ${order.paymentMethod}</li>
                    <li>Status: ${order.status}</li>
                </ul>
                <p>We will notify you when your order status changes.</p>
                <p>Thank you for choosing Aroma Spices!</p>
            `
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

// Send email for order cancellation
const sendOrderCancelledEmail = async (order) => {
    try {
        const mailOptions = {
            from: 'spicesaroma91@gmail.com',
            to: order.email,
            subject: 'Order Cancelled - Aroma Spices',
            html: `
                <h2>Order Cancellation Notice</h2>
                <p>Dear ${order.customerName},</p>
                <p>Your order has been cancelled.</p>
                <h3>Order Details:</h3>
                <ul>
                    <li>Order ID: ${order._id}</li>
                    <li>Total Amount: Rs. ${order.totalAmount}</li>
                    <li>Payment Method: ${order.paymentMethod}</li>
                </ul>
                <p>If you did not request this cancellation, please contact our customer service.</p>
                <p>Thank you for your understanding.</p>
            `
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

module.exports = {
    sendNewOrderEmail,
    sendOrderCancelledEmail
}; 