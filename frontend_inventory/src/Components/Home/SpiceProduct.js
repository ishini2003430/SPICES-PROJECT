import React from 'react';

// Navbar Component
const Navbar = () => {
  return (
    <header className="navbar">
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Products</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Cart 🛒</a></li>
        </ul>
      </nav>
    </header>
  );
};

// Hero Banner Component
const HeroBanner = () => {
  return (
    <section className="hero-banner">
      <h1>Explore Our Finest Spices</h1>
      <button>Shop Now</button>
    </section>
  );
};

// Filter & Search Component
const FilterSearch = () => {
  return (
    <section className="filter-search">
      <select>
        <option value="category">Category ▼</option>
        <option value="spices">Spices</option>
        <option value="herbs">Herbs</option>
      </select>
      <select>
        <option value="price">Price Range ▼</option>
        <option value="low">Low</option>
        <option value="high">High</option>
      </select>
      <input type="text" placeholder="Search 🔍" />
    </section>
  );
};

// Product Grid Component
const ProductGrid = () => {
  const products = [
    { name: 'Product 1', price: '$10.00', image: 'https://via.placeholder.com/150' },
    { name: 'Product 2', price: '$15.00', image: 'https://via.placeholder.com/150' },
    { name: 'Product 3', price: '$20.00', image: 'https://via.placeholder.com/150' },
    { name: 'Product 4', price: '$25.00', image: 'https://via.placeholder.com/150' },
    { name: 'Product 5', price: '$30.00', image: 'https://via.placeholder.com/150' },
    { name: 'Product 6', price: '$35.00', image: 'https://via.placeholder.com/150' },
    { name: 'Product 7', price: '$40.00', image: 'https://via.placeholder.com/150' },
    { name: 'Product 8', price: '$45.00', image: 'https://via.placeholder.com/150' },
    { name: 'Product 9', price: '$50.00', image: 'https://via.placeholder.com/150' },
  ];

  return (
    <section className="product-grid">
      {products.map((product, index) => (
        <div key={index} className="product-item">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.price}</p>
          <button>Add to Cart</button>
        </div>
      ))}
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer">
      <ul>
        <li><a href="#">Links</a></li>
        <li><a href="#">Social Media Icons</a></li>
        <li><a href="#">Contact Info</a></li>
      </ul>
    </footer>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="App">
      <Navbar />
      <HeroBanner />
      <FilterSearch />
      <ProductGrid />
      <Footer />
    </div>
  );
};

export default App;

// Internal CSS
const styles = {
  navbar: {
    backgroundColor: '#333',
    color: 'white',
    padding: '10px',
  },
  navbarNav: {
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
  },
  navbarNavItem: {
    margin: '0 15px',
  },
  navbarLink: {
    color: 'white',
    textDecoration: 'none',
  },
  heroBanner: {
    background: '#f2f2f2',
    textAlign: 'center',
    padding: '40px 20px',
  },
  heroBannerTitle: {
    fontSize: '2.5rem',
    marginBottom: '20px',
  },
  heroBannerButton: {
    backgroundColor: '#ff7043',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  heroBannerButtonHover: {
    backgroundColor: '#ff5722',
  },
  filterSearch: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    margin: '20px 0',
  },
  filterSearchInput: {
    padding: '10px',
    fontSize: '1rem',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    padding: '20px',
  },
  productItem: {
    backgroundColor: '#fff',
    padding: '20px',
    textAlign: 'center',
    border: '1px solid #ddd',
  },
  productItemImage: {
    width: '100%',
    height: 'auto',
    marginBottom: '15px',
  },
  productItemName: {
    fontSize: '1.2rem',
    marginBottom: '10px',
  },
  productItemPrice: {
    fontSize: '1.1rem',
    marginBottom: '10px',
  },
  productItemButton: {
    backgroundColor: '#ff7043',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  footer: {
    backgroundColor: '#333',
    color: 'white',
    padding: '20px',
    textAlign: 'center',
  },
  footerLinks: {
    listStyleType: 'none',
    padding: 0,
  },
  footerLinkItem: {
    display: 'inline',
    margin: '0 15px',
  },
  footerLink: {
    color: 'white',
    textDecoration: 'none',
  },
};
