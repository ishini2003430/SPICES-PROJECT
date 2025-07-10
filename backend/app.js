const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const http = require('http');
const socketIo = require('socket.io');
const orderRoutes = require("./Routes/OrderRoutes");
const salesRoutes = require("./Routes/SalesRoutes");
const productRoutes = require('./Routes/productRoutes');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Setup Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    }
});

const upload = multer({ storage });

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    }
});

// Make io accessible to routes
app.set('io', io);

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(uploadsDir));
app.use('/uploads', express.static('uploads'));

// File upload middleware
app.use((req, res, next) => {
    if (req.path === "/orders" && req.method === "POST") {
        upload.single("paymentSlip")(req, res, next);
    } else {
        next();
    }
});

// Routes
app.use("/orders", orderRoutes);
app.use("/sales", salesRoutes);
app.use('/api/products', productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://Admin:bUYnRHHpCxcCbs11@cluster0.uiv5j.mongodb.net/spicesDB?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Start Server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
