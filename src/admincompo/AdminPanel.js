// AdminPanel.js

import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './dashboard';
import Menu from './menumanag';
import Orders from './orders';
import Users from './users';
import Settings from './settings';

// Import CSS
import '../admincompo/AdminPanel.css'; // Import the main stylesheet

const AdminPanel = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const isMobileOrTablet = () => {
    return window.innerWidth <= 768; // Adjust the threshold as needed
  };

  return (
    <div className="admin-panel">
      <header>
        <div>
          <h1>Admin Panel</h1>
          {isMobileOrTablet() && (
            <button className="menu-toggle" onClick={toggleMenu}>
              {showMenu ? 'Hide Menu' : 'Show Menu'}
            </button>
          )}
        </div>
      </header>
      {!isMobileOrTablet() && ( // Render menu sidebar only on desktop
        <aside className={`menu-sidebar ${showMenu ? 'show' : ''}`}>
          <nav>
            <ul>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/menu">Menu Management</Link></li>
              <li><Link to="/orders">Order Management</Link></li>
              <li><Link to="/users">User Management</Link></li>
              <li><Link to="/settings">Settings</Link></li>
            </ul>
          </nav>
        </aside>
      )}
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      <footer>
        <p>© 2024 Canteen Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminPanel;
