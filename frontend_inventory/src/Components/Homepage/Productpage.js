import React, { useState, useEffect } from 'react';
 //import Header from '../Homepage/Header';
//import Footer from './Footer';
//import Sidebar from './Sidebar';
import ProductCard from './ProductCard';
import '../Styles/ProductsPage.css';

const API_URL = 'http://localhost:5000/api/products';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setProducts(data.map(product => ({
        ...product,
        pricePerSize: {
          '500g': product.originalPrice,
          '1kg': product.originalPrice * 2,
          '2kg': product.originalPrice * 4,
        },
      }))))
      .catch(() => setProducts([]));
  }, []);

  const handleCategoryChange = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat)
        ? prev.filter(c => c !== cat)
        : [...prev, cat]
    );
  };

  useEffect(() => {
    let filtered = products.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategories.length === 0 || selectedCategories.includes(p.category))
    );
    // Sorting logic
    if (sort === 'price-asc') {
      filtered = [...filtered].sort((a, b) => a.originalPrice - b.originalPrice);
    } else if (sort === 'price-desc') {
      filtered = [...filtered].sort((a, b) => b.originalPrice - a.originalPrice);
    } else if (sort === 'latest') {
      filtered = [...filtered].sort((a, b) => (b._id > a._id ? 1 : -1));
    }
    setFilteredProducts(filtered);
  }, [search, sort, products, selectedCategories]);

  return (
    <div className="products-page" style={{
      background: "url('/uploads/bg1.jpg') no-repeat center center fixed",
      backgroundSize: "cover",
      minHeight: "100vh"
    }}>
      
      <div className="products-main">
       
        <div className="products-content">
          <div className="products-toolbar">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="search-bar"
            />
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="sort-dropdown"
            >
              <option value="default">Default Sorting</option>
              <option value="latest">Sort by Latest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard
                key={product._id}
                product={{
                  ...product,
                  id: product._id,
                  name: product.name,
                  category: product.category,
                  price: product.originalPrice,
                  rating: product.rating,
                  sizes: product.packagingSizes,
                  image: product.image ? `http://localhost:5000/uploads/${product.image}` : '',
                  inStock: product.status === 'In Stock',
                  pricePerSize: product.pricePerSize,
                }}
              />
            ))}
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default ProductsPage; 