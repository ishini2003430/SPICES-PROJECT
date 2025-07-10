const Product = require('../Model/Productmodel');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const { 
      productId, 
      name, 
      category, 
      originalPrice, 
      stock, 
      status, 
      rating,
      packagingSizes
    } = req.body;
    const image = req.file ? req.file.filename : '';

    // Check if product with same ID exists
    const existingProduct = await Product.findOne({ productId });
    if (existingProduct) {
      return res.status(400).json({ message: 'Product ID already exists' });
    }

    // Validate required fields
    if (!productId || !name || !category || !originalPrice || !stock || !status || !image) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    // Validate numeric fields
    if (isNaN(originalPrice) || isNaN(stock) || (rating && isNaN(rating))) {
      return res.status(400).json({ message: 'Invalid numeric values' });
    }

    // Parse and validate packaging sizes
    let parsedPackagingSizes = [];
    try {
      parsedPackagingSizes = JSON.parse(packagingSizes || '[]');
      if (!Array.isArray(parsedPackagingSizes)) {
        throw new Error('Invalid format');
      }
    } catch (e) {
      return res.status(400).json({ message: 'Invalid packaging sizes format' });
    }

    // Validate that at least one packaging size is selected
    if (parsedPackagingSizes.length === 0) {
      return res.status(400).json({ message: 'At least one packaging size is required' });
    }

    const newProduct = new Product({
      productId,
      name,
      category,
      originalPrice: Number(originalPrice),
      stock: Number(stock),
      status,
      image,
      rating: rating ? Number(rating) : 0,
      packagingSizes: parsedPackagingSizes
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a product by productId
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.deleteOne({ productId: id });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete product' });
  }
};

// Get a single product by MongoDB _id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a product by MongoDB _id
exports.updateProduct = async (req, res) => {
  try {
    const { 
      productId, 
      name, 
      category, 
      originalPrice, 
      stock, 
      status, 
      rating,
      packagingSizes
    } = req.body;

    // Validate required fields
    if (!productId || !name || !category || !originalPrice || !stock || !status) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    // Validate numeric fields
    if (isNaN(originalPrice) || isNaN(stock) || (rating && isNaN(rating))) {
      return res.status(400).json({ message: 'Invalid numeric values' });
    }

    // Parse and validate packaging sizes
    let parsedPackagingSizes = [];
    try {
      parsedPackagingSizes = JSON.parse(packagingSizes || '[]');
      if (!Array.isArray(parsedPackagingSizes)) {
        throw new Error('Invalid format');
      }
    } catch (e) {
      return res.status(400).json({ message: 'Invalid packaging sizes format' });
    }

    // Validate that at least one packaging size is selected
    if (parsedPackagingSizes.length === 0) {
      return res.status(400).json({ message: 'At least one packaging size is required' });
    }

    const updateData = {
      productId,
      name,
      category,
      originalPrice: Number(originalPrice),
      stock: Number(stock),
      status,
      rating: rating ? Number(rating) : 0,
      packagingSizes: parsedPackagingSizes
    };

    // Only update image if a new one is provided
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: error.message });
  }
};