import React, { useState } from 'react';
import '../Styles/ProductCard.css';
import { useCart } from './CartContext';
import SelectPackageDialog from './SelectPackageDialog';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  const pricePerSize = product.pricePerSize || {};
  const currentPrice = pricePerSize[selectedSize] || product.price;

  const handleAddToCart = (size) => {
    setSelectedSize(size);
    addToCart(
      { ...product, price: pricePerSize[size] || product.price },
      1,
      size
    );
    setDialogOpen(false);
  };

  return (
    <>
      <div className="product-card">
        {product.inStock && <span className="in-stock">In Stock</span>}
        {!product.inStock && (
          <span className="out-stock" style={{
            position: 'absolute',
            top: 10,
            left: 10,
            background: '#ff5e57',
            color: '#fff',
            fontSize: '0.8rem',
            padding: '0.2rem 0.7rem',
            borderRadius: 12,
            fontWeight: 600,
          }}>Out of Stock</span>
        )}
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-info">
          <h4>{product.name}</h4>
          <div className="product-rating">
            {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
          </div>
          <div className="product-category">{product.category}</div>
          <div className="product-sizes">
            {product.sizes.map(size => (
              <span
                key={size}
                className={`size${selectedSize === size ? ' selected' : ''}`}
                onClick={() => setSelectedSize(size)}
                style={{ cursor: 'pointer' }}
              >
                {size}
              </span>
            ))}
          </div>
          <div className="product-price">Rs. {currentPrice}.00</div>
          <button
            className="add-cart-btn"
            onClick={() => setDialogOpen(true)}
            disabled={!product.inStock}
            style={!product.inStock ? { filter: 'blur(1px)', opacity: 0.5, cursor: 'not-allowed' } : {}}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <SelectPackageDialog
        open={dialogOpen}
        product={{
          ...product,
          pricePerSize: pricePerSize,
        }}
        onSelect={handleAddToCart}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};

export default ProductCard; 