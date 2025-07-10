const jwt = require('jsonwebtoken');
const Manager = require('../Model/Manager');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get manager from token
            req.manager = await Manager.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Middleware to check manager type
const checkManagerType = (allowedTypes) => {
    return (req, res, next) => {
        if (!req.manager) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        if (!allowedTypes.includes(req.manager.managerType)) {
            return res.status(403).json({ 
                message: `Access denied. Required manager type: ${allowedTypes.join(', ')}` 
            });
        }

        next();
    };
};

module.exports = { protect, checkManagerType }; 