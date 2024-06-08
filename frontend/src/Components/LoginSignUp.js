// LoginSignUp.jsx

import React, { useState } from 'react';
import "./LoginSignUp.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../Services/Actions/userAction";
import { Link, useNavigate } from "react-router-dom";
import Page1 from "./Page1.js";
import logo from "../Layouts/Header/logo.png";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(state => state.user);

 
  const [showLogin, setShowLogin] = useState(true);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
   
    // console.log('Login Data:', loginData.password);
    const myForm = new FormData();
    
    myForm.set("email", loginData.email);
    myForm.set("password", loginData.password);

    dispatch(login(loginData.email,loginData.password))
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    // Check if password and confirmPassword match
    if (registerData.password !== registerData.confirmPassword) {
      alert("Password and Confirm Password should match");
      return;
    }

    const myForm = new FormData();
    myForm.set("name", registerData.username);
    myForm.set("email", registerData.email);
    myForm.set("password", registerData.password);
    // Add your register logic here
    dispatch(register(myForm))
    
  };

  if (isAuthenticated) {
    return  navigate('/main');
  }

  const switchForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="login-signup-container">

<div className="logo" >
        <img src={logo} alt="Logo" />
      </div>
      {showLogin ? (
        <>
          <h2>Login</h2>
          <form className="login-form" onSubmit={handleLoginSubmit}>
            <label>Email:
              <input type="email" name="email" value={loginData.email} onChange={handleLoginChange} />
            </label>
            <label>Password:
              <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} />
            </label>
            <button type="submit" className="login-button">Login</button>
          </form>
          <p>Don't have an account? <span onClick={switchForm}>Register here</span></p>
        </>
      ) : (
        <>
          <h2>Register</h2>
          <form className="register-form" onSubmit={handleRegisterSubmit}>
            <label>Username:
              <input type="text" name="username" value={registerData.username} onChange={handleRegisterChange} />
            </label>
            <label>Email:
              <input type="email" name="email" value={registerData.email} onChange={handleRegisterChange} />
            </label>
            <label>Password:
              <input type="password" name="password" value={registerData.password} onChange={handleRegisterChange} />
            </label>
            <label>Confirm Password:
              <input type="password" name="confirmPassword" value={registerData.confirmPassword} onChange={handleRegisterChange} />
            </label>
            <button type="submit" className="register-button">Register</button>
          </form>
          <p>Already have an account? <span onClick={switchForm}>Login here</span></p>
        </>
      )}
    </div>
  );
};

export default LoginSignUp;
