import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const CATEGORIES = [
  'Spices', 'Seeds', 'Powdered Spices', 'Whole Spices', 'Dried Herbs and Leaves',
  'Seasonings', 'Spice Blends', 'Herbal Teas', 'Spice Pastes', 'Flavored Salts and Rubs', 'Dehydrated Vegetables'
];
const API_URL = 'http://localhost:5000/api/products';
const packagingSizes = ['500g', '1kg', '2kg'];

const cardStyle = {
  background: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  padding: '2rem 2.5rem',
  maxWidth: 500,
  margin: '2.5rem auto',
};

export default function AddProductPage() {
  const [form, setForm] = useState({
    productId: '',
    name: '',
    category: '',
    originalPrice: '',
    stock: '',
    status: 'In Stock',
    rating: '',
    packagingSizes: [],
    image: null,
    imagePreview: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    if (name === 'packagingSizes') {
      setForm(f => ({
        ...f,
        packagingSizes: checked
          ? [...f.packagingSizes, value]
          : f.packagingSizes.filter(s => s !== value)
      }));
    } else if (name === 'image') {
      setForm(f => ({ ...f, image: e.target.files[0] }));
    } else if (name === 'status') {
      setForm(f => ({ ...f, status: value, stock: value === 'Out of Stock' ? 0 : f.stock }));
    } else if (name === 'rating') {
      setForm(f => ({ ...f, rating: value }));
    } else if (name === 'stock' || name === 'originalPrice') {
      let val = Math.max(0, Number(value));
      setForm(f => ({ ...f, [name]: val }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); setSuccess('');
    // Validation
    if (!form.productId || !form.name || !form.category || form.originalPrice === '' || form.stock === '' || !form.status || !form.image || form.packagingSizes.length === 0) {
      setError('Please fill all required fields and select at least one packaging size.');
      return;
    }
    const ratingNum = parseFloat(form.rating);
    if (isNaN(ratingNum) || ratingNum < 0 || ratingNum > 5) {
      setError('Rating must be between 0 and 5.');
      return;
    }
    if (form.originalPrice < 0) {
      setError('Price cannot be negative.');
      return;
    }
    if (form.stock < 0) {
      setError('Stock cannot be negative.');
      return;
    }
    if (form.packagingSizes.length === 0) {
      setError('Select at least one packaging size.');
      return;
    }
    const data = new FormData();
    data.append('productId', form.productId);
    data.append('name', form.name);
    data.append('category', form.category);
    data.append('originalPrice', form.originalPrice);
    data.append('stock', form.stock);
    data.append('status', form.status);
    data.append('rating', form.rating);
    data.append('image', form.image);
    data.append('packagingSizes', JSON.stringify(form.packagingSizes));
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        body: data
      });
      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || 'Failed to add product');
      }
      setSuccess('Product added successfully!');
      setTimeout(() => navigate('/admin/dashboard'), 1200);
    } catch (err) {
      setError('Failed to add product. ' + (err.message || 'Please check your input.'));
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f7e5c7',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 0',
    }}>
      <div style={cardStyle}>
        <h2 style={{fontWeight: 700, marginBottom: '1.5rem', color: '#a97a13'}}>Add Product</h2>
        <form onSubmit={handleSubmit} style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          background: '#ffe0b2',
          borderRadius: '10px',
          padding: '1.2rem',
        }}>
          {/* Left Column */}
          <div style={{display:'flex', flexDirection:'column', gap:'0.7rem'}}>
            <div>
              <label style={labelTextStyle}>Product ID</label>
              <input name="productId" value={form.productId} onChange={handleChange} style={inputStyle} required />
            </div>
            <div>
              <label style={labelTextStyle}>Product Name</label>
              <input name="name" value={form.name} onChange={handleChange} style={inputStyle} required />
            </div>
            <div>
              <label style={labelTextStyle}>Category</label>
              <select name="category" value={form.category} onChange={handleChange} style={inputStyle} required>
                <option value="">Select a category</option>
                {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label style={labelTextStyle}>Original Price (LKR)</label>
              <input name="originalPrice" type="number" value={form.originalPrice} onChange={handleChange} style={inputStyle} min={0} required />
            </div>
            <div>
              <label style={labelTextStyle}>Stock</label>
              <input name="stock" type="number" min={0} value={form.stock} onChange={handleChange} style={inputStyle} required disabled={form.status === 'Out of Stock'} />
            </div>
          </div>
          {/* Right Column */}
          <div style={{display:'flex', flexDirection:'column', gap:'0.7rem'}}>
            <div>
              <label style={labelTextStyle}>Status</label>
              <select name="status" value={form.status} onChange={handleChange} style={inputStyle} required>
                <option>In Stock</option>
                <option>Out of Stock</option>
              </select>
            </div>
            <div>
              <label style={labelTextStyle}>Image (jpg, png, gif)</label>
              <input name="image" type="file" accept="image/*" onChange={e => {
                handleChange(e);
                if (e.target.files && e.target.files[0]) {
                  setForm(f => ({ ...f, imagePreview: URL.createObjectURL(e.target.files[0]) }));
                }
              }} style={inputStyle} required />
              {form.imagePreview && <img src={form.imagePreview} alt="preview" style={{marginTop:'0.5rem', width:70, height:70, objectFit:'cover', borderRadius:8, display:'block'}} />}
            </div>
            <div style={{marginTop:'1.2rem'}}>
              <label style={labelTextStyle}>Available Packaging Sizes <span style={{color:'red'}}>*</span></label>
              <div style={{display:'flex', gap:'1.2rem', marginTop:'0.3rem'}}>
                {packagingSizes.map(size => (
                  <label key={size} style={{display:'flex', alignItems:'center', gap:'0.3rem', fontWeight:500, fontSize:'0.97rem'}}>
                    <input
                      type="checkbox"
                      name="packagingSizes"
                      value={size}
                      checked={form.packagingSizes.includes(size)}
                      onChange={handleChange}
                      required={form.packagingSizes.length === 0}
                    />
                    {size}
                  </label>
                ))}
              </div>
            </div>
            <div style={{marginTop:'1.2rem'}}>
              <label style={labelTextStyle}>Rating (0-5)</label>
              <input
                name="rating"
                type="number"
                min={0}
                max={5}
                step={0.1}
                value={form.rating}
                onChange={handleChange}
                style={inputStyle}
                required
                placeholder="out of 5"
                onBlur={e => {
                  let val = parseFloat(e.target.value);
                  if (isNaN(val)) val = 0;
                  if (val < 0) val = 0;
                  if (val > 5) val = 5;
                  setForm(prev => ({ ...prev, rating: val.toString() }));
                }}
              />
            </div>
          </div>
          {/* Error/Success Message */}
          {(error || success) && (
            <div style={{gridColumn:'1/3', textAlign:'center', color: error ? '#e74c3c' : '#27ae60', marginTop:'-1rem', marginBottom:'0.5rem'}}>
              {error || success}
            </div>
          )}
          {/* Buttons */}
          <div style={{gridColumn:'1/3', display:'flex', justifyContent:'space-between', marginTop:'1.2rem'}}>
            <button type="button" style={cancelBtn} onClick={()=>navigate('/admin/dashboard')}>Cancel</button>
            <button type="submit" style={addBtn}>Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  maxWidth: '180px',
  padding: '0.5rem 0.9rem',
  borderRadius: 8,
  border: '1px solid #eee',
  fontSize: '1rem',
  marginTop: '0.18rem',
  marginBottom: '0.1rem',
  background: '#f7f7fa',
};
const cancelBtn = {
  background: '#fff', color: '#222', border: '1px solid #eee', borderRadius: 8, padding: '0.5rem 1.3rem', fontWeight: 600, cursor: 'pointer', fontSize: '1rem'
};
const addBtn = {
  background: '#ffa600', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1.5rem', fontWeight: 600, cursor: 'pointer', fontSize: '1rem'
};
const labelTextStyle = { fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.18rem' }; 