import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



import StockList from './Components/Stocks/StockList';
import HomeInventory from './Components/Home/HomeInventory';
import AddStock from './Components/AddStock/AddStock';
import UpdateStock from './Components/UpdateStock/updatestock';
import LoginPage from "./Components/Homepage/Loginpage"; // Update path as neede
import RegisterPage from "./Components/Homepage/Registerpage";
import HomeSite from './Components/Homepage/Homesite';
import HomePage from './Components/Homepage/homepage';
import Homelogin from './Components/Homepage/Homelogin';
import LowStockAlert from './Components/Alerts/LowStockAlert';
import MainHomePage from './Components/Homepage/MainHomepage';
import HeroSection from './Components/Homepage/Herosection';
import AdminDashboard from './Components/Homepage/Admindashboard';
import AdminLoginPage from './Components/Homepage/Adminlogin';
import InventoryLoginPage from './Components/Homepage/Inventorylogin';
import ContactUs from './Components/Homepage/Contactus';
import OrderLoginPage from './Components/Homepage/Orderlogin';
import SupplierLoginPage from './Components/Homepage/Supplierlogin';
import FinanceLoginPage from './Components/Homepage/Financelogin';
import ProductLoginPage from './Components/Homepage/Productlogin';
import AboutUsPage from './Components/Homepage/Aboutuspage';
import HomeUserDashboard from './Components/Homepage/Userdashboard';
import Homesupplier from './Components/Homepage/Homesupplier';
import Addsupplier from './Components/Homepage/Addsupplier';
import Supplierdetails from './Components/Homepage/Supplierdetails';
import PrivacyPolicy from './Components/Homepage/Privacypolicy';
import TermsAndConditions from './Components/Homepage/Termasandcondition';
import SupplierNotification from './Components/Alerts/SupplierNotification';
import StockDetails from './Components/Stocks/StockDetails';
import SupplierForm from './Components/Homepage/Addsupplier';
import ProductsPage from './Components/Homepage/Productpage';
import FHome from './Components/FHome/FHome';
import AddExpence from './Components/AddExpences/AddExpence';
import ExpenceDisplay from './Components/ExpenceDisplay/ExpenceDisplay';
import IncomeDisplay from './Components/ExpenceDisplay/IncomeDisplay';
import ProfitLoss from './Components/ProfitLoss/ProfitLoss';
import AddSalary from './Components/AddExpences/AddSalary';
import SalaryDetails from './Components/SalaryDetails/SalaryDetails';
import SalaryDisplay from './Components/ExpenceDisplay/SalaryDisplay';
import ProfitLossAlerts from './Components/ProfitLossAlerts/ProfitLossAlerts';
import UpdateExpences from './Components/UpdateExpences/UpdateExpences';
import UpdateIncomes from './Components/UpdateExpences/UpdateIncomes';
import AddIncome from './Components/AddExpences/AddIncome';
import UpdateSalaries from './Components/UpdateExpences/UpdateSalaries';
import AddEditAlert from './Components/ProfitLossAlerts/AddEditAlert';
import SpiceProducts from './Components/Home/SpiceProduct';


function App() {
  const [searchQuery, setSearchQuery] = useState("");  // The search state

  return (
    <Router>
      <div className="App">
        
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Home" element={<HomeInventory />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/homesite" element={<HomeSite />} />
            <Route path="/homelogin" element={<Homelogin />} />
            <Route path="/herosection" element={<HeroSection />} />
            <Route path="/admin-login" element={<AdminDashboard />} />
            <Route path="/contact" element={<ContactUs/>} />
            <Route path="/about" element={<AboutUsPage/>} />
            <Route path="/supplier-home" element={<Homesupplier/>} />
            <Route path="/add-supplier" element={<Addsupplier/>} />
            <Route path="/privacy" element={<PrivacyPolicy/>} />
            <Route path="/terms" element={<TermsAndConditions/>} />
            <Route path="/supplier-details" element={<Supplierdetails/>} />
            <Route path="/dashboard" element={<HomeUserDashboard/>} />
            <Route path="/inventory-login" element={<InventoryLoginPage />} />
           < Route path="/supply-login" element={<SupplierLoginPage />} />
            <Route path="/sales-login" element={<OrderLoginPage />} />
            < Route path="/finance-login" element={<FinanceLoginPage />} />
            <Route path="/product-login" element={<ProductLoginPage />} />
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/dashboard" component={MainHomePage} />
            <Route path="/add-stock" element={<AddStock />} />
            {/* Pass setSearchQuery as a prop to StockList */}
            <Route path="/stock-details" element={<StockList searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
            <Route path="/stock-details/:id" element={<UpdateStock />} />
            <Route path="/alert" element={<LowStockAlert />} />
            <Route path="/supplier-notifications" element={<SupplierNotification />} />
            <Route path="/stock-details" element={<StockDetails />} />
            <Route path="/products" element={<SpiceProducts/>} />

            <Route path="/FHome" element={<FHome/>} />
            <Route path="/expenses/add" element={<AddExpence/>} />
            <Route path="/expensesdisplay" element={<ExpenceDisplay/>} />
            <Route path="/incomesdisplay" element={<IncomeDisplay/>} />
            <Route path="/profit-loss" element={<ProfitLoss/>} />
            <Route path="/salaries/add" element={<AddSalary/>} />
            <Route path="/salariesdisplay" element={<SalaryDisplay/>} />
            <Route path="/profit-loss-alerts" element={<ProfitLossAlerts/>} />
            <Route path="/expensesdisplay/:id" element={<UpdateExpences />} />
            <Route path="/incomesdisplay/:id" element={<UpdateIncomes/>} />
             <Route path="/incomes/add" element={<AddIncome />} />
             <Route path="/salarydetails/:id" element={<SalaryDetails />} />
             <Route path="/salariesdisplay/:id" element={<UpdateSalaries />} />
             <Route path="/profit-loss-alerts/add" element={<AddEditAlert />} />
             <Route path="/profit-loss-alerts/edit/:id" element={<AddEditAlert />} 
             />
             



          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
