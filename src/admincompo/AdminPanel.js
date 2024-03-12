import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Menu from "./menumanag";
import Orders from "./orders";
import Users from "./users";
import Settings from "./settings";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Dashboard from "./dashboard";

import "../admincompo/AdminPanel.css"; // Import the main stylesheet
const AdminPanel = () => {

 
  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Sign Out"))
      .catch((error) => console.log(error));
  };

  

  return (
    <div className="admin-panel">
      <header>
        <div>
          <h1>Admin Panel</h1>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      </header>
      <div className="mainArea">
          <nav>
            <ul>
              <li>
                <Link to="/adminPanel/dashboard">Dashboard</Link>
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
            </ul>
          </nav>
        <main>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
      <footer>
        <p>© 2024 Canteen Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminPanel;
