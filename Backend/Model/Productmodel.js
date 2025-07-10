const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  productId: { 
    type: String, 
    required: true,
    unique: true
  },
  name: { type: String, required: true },
  category: { type: String, required: true },
  originalPrice: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['In Stock', 'Out of Stock'], required: true },
  image: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  packagingSizes: { type: [String], required: true, default: [] }
}, {
  timestamps: true,
  strict: true,
  strictQuery: true,
  id: false, // Disable the virtual 'id' getter
  toJSON: { virtuals: false }, // Disable virtuals in JSON
  toObject: { virtuals: false } // Disable virtuals in Objects
});

// Ensure indexes are created properly
ProductSchema.index({ productId: 1 }, { unique: true });

module.exports = mongoose.model('Product', ProductSchema);