import React from 'react';
import styles from './homeheader.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>AROMA Spices</div>
      <nav className={styles.nav}>
        <a href="#">Home</a>
        <a href="#">Products</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>
    </header>
  );
}

export default Header;