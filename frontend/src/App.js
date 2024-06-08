import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Layouts/Header/Header";
import LoginSignUp from "./Components/LoginSignUp.js";
import Page1 from "./Components/Page1.js";
import ProductDetails from "./Components/ProductDetails";

import ScrewDetails from "./Components/ScrewDetails.js"
import BoltDetails from "./Components/BoltDetails.js";
import PlateDetails from "./Components/PlateDetails.js";
import Profile from "./Components/Profile.js";
import Cart from "./Components/Cart.js";
import AdminLogin from './AdminLogin.js';

function App() {

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
console.log(isAuthenticated);

  return (
    <div>
      <Router>
      {/* {isAuthenticated && <Header />} */}
      <Header />
        <Routes>
       
        <Route path="/products" element={<Page1 />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:keyword" element={<Page1 />} />
        {/* <Route path="/login" element={<Page1 />} /> */}
    
        {/* <Route path="/:id" element={<ProductDetails />} /> */}
        <Route path="/products/screws/:_id" element={<ScrewDetails />} />
        <Route path="/products/bolts/:_id" element={<BoltDetails />} />
        <Route path="/products/plates/:_id" element={<PlateDetails />} />
        <Route path="/admin17/login" element={<AdminLogin />} />
        <Route path="/main" element={<Page1 />} />
        <Route path="/" element={<Page1 />} />
        
        {/* <Route path="/" element={isAuthenticated ? <Page1/>: <LoginSignUp />}/> */}
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
