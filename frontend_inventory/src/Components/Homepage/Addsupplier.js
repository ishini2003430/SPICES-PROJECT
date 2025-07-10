import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function AddSupplier() {
  const navigate = useNavigate();

  const [supplierData, setSupplierData] = useState({
    Suppliername: "",
    Supplier_company: "",
    Supplier_email: "",
    Supplier_contactnumber: "",
    Supplier_quantity: "",
    Supplier_unitprice: "",
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "Suppliername":
      case "Supplier_company":
        if (!value.trim()) {
          error = "This field is required.";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          error = "Only letters and spaces are allowed. No special characters.";
        }
        break;
      case "Supplier_email":
        if (!value.trim()) {
          error = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Invalid email format.";
        }
        break;
      case "Supplier_contactnumber":
        if (!/^\d{10}$/.test(value)) {
          error = "Phone number must be exactly 10 digits.";
        }
        break;
      case "Supplier_quantity":
      case "Supplier_unitprice":
        if (!value || isNaN(value)) {
          error = "This field is required.";
        } else if (parseFloat(value) <= 0) {
          error = "Value must be greater than 0.";
        }
        break;
      default:
        if (!value.trim()) {
          error = "This field is required.";
        }
    }

    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Block invalid characters in name and company fields
    if (
      (name === "Suppliername" || name === "Supplier_company") &&
      /[^A-Za-z\s]/.test(value)
    ) {
      return;
    }

    const updatedData = { ...supplierData, [name]: value };
    setSupplierData(updatedData);
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(supplierData).forEach(([field, value]) => {
      const error = validateField(field, value);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formattedData = {
        ...supplierData,
        Supplier_quantity: parseFloat(supplierData.Supplier_quantity),
        Supplier_unitprice: parseFloat(supplierData.Supplier_unitprice),
      };

      const response = await axios.post("http://localhost:5000/suppliers", formattedData);
      alert(response.data.message);
      setSupplierData({
        Suppliername: "",
        Supplier_company: "",
        Supplier_email: "",
        Supplier_contactnumber: "",
        Supplier_quantity: "",
        Supplier_unitprice: "",
      });
      setErrors({});
      navigate("/supplier-details");
    } catch (error) {
      console.error("Error adding supplier:", error);
      alert("Failed to add supplier");
    }
  };

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <div style={styles.navContainer}>
          <div style={styles.logoContainer}>
            <img src={logo} alt="Logo" style={styles.logo} />
            <span style={styles.brand}>AROMA SPICES</span>
          </div>
          <div style={styles.links}>
            <Link to="/supplier-home" style={styles.link}>Home</Link>
            <Link to="/add-supplier" style={styles.link}>Add Supplier</Link>
            <Link to="/supplier-details" style={styles.link}>Supplier Details</Link>
          </div>
        </div>
      </nav>

      <div style={styles.content}>
        <div style={styles.formCard}>
          <h2 style={styles.title}>Add a New Supplier</h2>
          <form onSubmit={handleSubmit}>
            {Object.keys(supplierData).map((field) => (
              <div key={field} style={styles.formGroup}>
                <label htmlFor={field} style={styles.label}>
                  {field.replace("Supplier_", "").replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  type={field.includes("quantity") || field.includes("unitprice") ? "number" : "text"}
                  name={field}
                  value={supplierData[field]}
                  onChange={handleInputChange}
                  style={styles.input}
                  onKeyPress={(e) => {
                    if (
                      (field === "Suppliername" || field === "Supplier_company") &&
                      !/[A-Za-z\s]/.test(e.key)
                    ) {
                      e.preventDefault();
                    }
                  }}
                  onPaste={(e) => {
                    if (field === "Suppliername" || field === "Supplier_company") {
                      e.preventDefault();
                    }
                  }}
                />
                {errors[field] && <span style={styles.error}>{errors[field]}</span>}
              </div>
            ))}
            <button type="submit" style={styles.submitBtn}>Add Supplier</button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  nav: {
    backgroundColor: "rgb(223, 145, 63)",
    padding: "25px 0",
    position: "fixed",
    height:"100px",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  navContainer: {
    maxWidth: "1400px",
    margin: "0 auto",
    display: "flex",
    
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: "80px",
    marginRight: "10px",
  },
  brand: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#fff",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
  },
  content: {
    marginTop: "120px",
   
    display: "flex",
    
    justifyContent: "center",
  },
  formCard: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "1000px",
    maxWidth: "600px",
    
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    
    textAlign: "center",
    color: "#8B4513",
  },
  formGroup: {
    marginBottom: "15px",
   
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#6B4226",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },
  error: {
    color: "red",
    fontSize: "13px",
    marginTop: "4px",
  },
  submitBtn: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#D2691E",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
    fontSize: "16px",
  },
};

export default AddSupplier;
