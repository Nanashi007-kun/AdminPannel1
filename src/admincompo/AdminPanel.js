import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Menu from "../admincompo/menumanag";
import Orders from "../admincompo/orders";
import Users from "./users";
import Settings from "../admincompo/settings";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Dashboard from "../admincompo/dashboard";

import "../admincompo/AdminPanel.css"; // Import the main stylesheet
const AdminPanel = () => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Sign Out"))
      .catch((error) => console.log(error));
  };

  return (
    <div className="admin-panel">
      <div className="container">
        <div className="sidebar">
          <div className="head">
            <div className="user-img">
            </div>
            <div className="user-details">
              <p className="title"> hello</p>
              <p className="title"> hello</p>

            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
