const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');

// Get all stocks with supplier information
router.get('/', async (req, res) => {
  try {
    const stocks = await Stock.find().populate('supplier', 'name email phone');
    res.json({ stocks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single stock with supplier information
router.get('/:id', async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id).populate('supplier', 'name email phone');
    if (!stock) {
      return res.status(404).json({ error: 'Stock not found' });
    }
    res.json({ stock });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new stock
router.post('/', async (req, res) => {
  try {
    const stock = new Stock(req.body);
    await stock.save();
    const populatedStock = await Stock.findById(stock._id).populate('supplier', 'name email phone');
    res.status(201).json({ stock: populatedStock });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update stock
router.put('/:id', async (req, res) => {
  try {
    const stock = await Stock.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('supplier', 'name email phone');
    
    if (!stock) {
      return res.status(404).json({ error: 'Stock not found' });
    }
    res.json({ stock });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete stock
router.delete('/:id', async (req, res) => {
  try {
    const stock = await Stock.findByIdAndDelete(req.params.id);
    if (!stock) {
      return res.status(404).json({ error: 'Stock not found' });
    }
    res.json({ message: 'Stock deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 