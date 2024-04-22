import React from "react";
import { Routes, Route, Link,Navigate } from "react-router-dom";

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
      <Navigate to= "/login"/>
  };

  return (
<div className="admin-panel">
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">Admin Panel</h1>

        </div>
      </header>
      <div className="mainArea">
        <nav>
          <ul>
            <li>
              <Link to="/adminPanel">Dashboard</Link>
            </li>
            <li>
              <Link to="/adminPanel/menu">Menu Management</Link>
            </li>
            <li>
              <Link to="/adminPanel/orders">Order Management</Link>
            </li>
            <li>
              <Link to="/adminPanel/users">User Management</Link>
            </li>
            <li>
              <Link to="/adminPanel/settings">Settings</Link>
            </li>
            <li>
              <button
                className="signout"
                clipRule="evenodd"
                fillule="evenodd"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </li>
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
      <footer>
        <p>© 2024 Canteen Management System. All rights reserved</p>
      </footer>
    </div>
  );
};

export default AdminPanel;
