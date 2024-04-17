import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { IconName } from "react-icons/bs";
import { AiOutlineDashboard } from "react-icons/ai";
import Menu from "../admincompo/menumanag";
import Orders from "../admincompo/orders";
import { MdOutlineManageSearch } from "react-icons/md";
import Users from "./users";
import Settings from "../admincompo/settings";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Dashboard from "../admincompo/dashboard";
import Sidebar from "./addfooditem/Slidebar/slidebar";
import Cards from "./cards/cards";

import "../admincompo/AdminPanel.css"; // Import the main stylesheet
const AdminPanel = () => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Sign Out"))
      .catch((error) => console.log(error));
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="head">
          <div className="user-img">
            <img src="" alt="img"></img>
          </div>
          <div className="user-details"></div>
          <p className=" title">web devlopmenrr</p>
        </div>

        <nav>
          <ul className="title">
            <li>
              <AiOutlineDashboard />
              <Link to="/adminPanel/dashboard">Dashboard</Link>
            </li>
            <li>
            <MdOutlineManageSearch />
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
      </div>
      <div>
        <main>
          <Routes>
            <Route part="/" element={<Cards />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
