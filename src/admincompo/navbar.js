import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/menu">Menu Management</Link></li>
        <li><Link to="/orders">Order Management</Link></li>
        <li><Link to="/users">User Management</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
