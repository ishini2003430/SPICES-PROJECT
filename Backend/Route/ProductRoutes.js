const express = require('express');
const router = express.Router();
const productController = require('../Controller/Productcontroller');
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
});

// Get all products
router.get('/', productController.getAllProducts);

// Add a new product
router.post('/', upload.single('image'), productController.addProduct);

// Delete a product
router.delete('/:id', productController.deleteProduct);

// Get a single product
router.get('/:id', productController.getProductById);

// Update a product
router.put('/:id', upload.single('image'), productController.updateProduct);

module.exports = router; 