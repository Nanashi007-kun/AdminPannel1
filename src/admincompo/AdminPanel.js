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
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">Admin Panel</h1>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                fill="currentColor"
                d="M20 17h2v2H2v-2h2v-7a8 8 0 1 1 16 0v7zm-2 0v-7a6 6 0 1 0-12 0v7h12zm-9 4h6v2H9v-2z"
              ></path>
            </svg>
          </button>

          <button
            className="signout"
            clip-rule="evenodd"
            fill-rule="evenodd"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </header>
      <div className="mainArea">
        <nav>
          <ul>
            <li>
              <Link to="/adminPanel/dashboard">Dafshboard</Link>
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
        <p>© 2024 Canteen Management System. All rights reserved</p>
      </footer>
    </div>
  );
};

export default AdminPanel;
