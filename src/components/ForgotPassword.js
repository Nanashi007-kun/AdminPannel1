// ForgotPassword.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = (e) => {
    e.preventDefault();
    // Simulate sending a password reset email
    console.log("Password reset email sent to:", email);
    setMessage(
      "If an account exists for " +
        email +
        ", an email will be sent with instructions to reset your password."
    );
  };

  return (
    <div className="forgot-password-container">
      <h2>Reset Your Password</h2>
      <form onSubmit={handleResetPassword}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">
          Send Reset Instructions
        </button>
        {message && <p>{message}</p>}
      </form>
      <Link to="/login">Back to Login</Link>
    </div>
  );
};

export default ForgotPassword;
