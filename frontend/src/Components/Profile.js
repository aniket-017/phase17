// Profile.js

import React from 'react';
import './Profile.css';
import { useDispatch } from 'react-redux';
import { logout } from '../Services/Actions/userAction';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const username = useSelector((state) => state.user);
    console.log(username.user.email);
  

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());
    return  navigate('/login');
    // You may also perform additional cleanup or redirection logic here
  };


  return (
    <div className="profile-container">
      <div className="user-profile">
        <h2>User Profile</h2>
        <div className="user-info">
          <p>
            <strong>Username:</strong> {username.user.name}
          </p>
          <p>
            <strong>Email:</strong> {username.user.email}
          </p>
          <button className="logout-button" onClick={handleLogout}>Logout</button>

          
        </div>
      </div>
    </div>
  );
};

export default Profile;
