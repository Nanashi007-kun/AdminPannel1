import React from 'react';
import './App.css';
import AdminPanel from '../src/admincompo/AdminPanel';
import ForgotPassword from './components/ForgotPassword';
import Login from './Login';
import Dashboard from './admincompo/dashboard';
import Menu from './admincompo/menumanag';
import Orders from './admincompo/orders';
import Users from './admincompo/users';
import Settings from './admincompo/settings';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          
          <Route path="/adminpanel" element={<AdminPanel />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
