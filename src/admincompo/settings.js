import React, { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import "../admincompo/settings.css"; // Import the CSS file for styling

const Settings = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [error, setError] = useState("");
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showResetPopup, setShowResetPopup] = useState(false);

  const handleNewUserSignup = () => {
    setShowSignupPopup(true);
  };

  const handleResetPassword = () => {
    setShowResetPopup(true);
  };

  const handleSignupConfirmAction = async () => {
    try {
      if (!email.trim() || !password.trim()) {
        setError("Email and password are required.");
        return;
      }
      if (!isValidEmail(email)) {
        setError("Please enter a valid email address.");
        return;
      }
      // Your existing signup logic goes here...
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetConfirmAction = async () => {
    try {
      if (!resetEmail.trim()) {
        setError("Email is required.");
        return;
      }
      if (!isValidEmail(resetEmail)) {
        setError("Please enter a valid email address.");
        return;
      }
      await sendPasswordResetEmail(auth, resetEmail);
      setError("Password reset email sent. Please check your inbox.");
      setShowResetPopup(false); // Hide reset pop-up after sending reset email
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "resetEmail") {
      setResetEmail(value);
    }
    setError(""); // Clear any previous error messages
  };

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleClosePopup = () => {
    setShowSignupPopup(false);
    setShowResetPopup(false);
    setEmail("");
    setPassword("");
    setResetEmail("");
    setError("");
  };

  return (
    <div>
      <h1>Settings Page</h1>
      {showSignupPopup && (
        <div className="modal active">
          <div className="modal-content">
            {/* Your signup pop-up content goes here */}
          </div>
        </div>
      )}
      {showResetPopup && (
        <div className="modal active">
          <div className="modal-content">
            <button className="close-btn" onClick={handleClosePopup}>
              &times;
            </button>
            <div className="input-container">
              <label htmlFor="resetEmail">Email:</label>
              <input
                className="text"
                type="text"
                id="resetEmail"
                name="resetEmail"
                placeholder="Enter email"
                value={resetEmail}
                onChange={handleInputChange}
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button className="submit" onClick={handleResetConfirmAction}>
              Confirm
            </button>
          </div>
        </div>
      )}
      {/* Your buttons for signup and reset password */}
      <button className="submit" onClick={handleNewUserSignup}>
        New User Signup
      </button>
      <button className="submit" onClick={handleResetPassword}>
        Reset Password
      </button>
    </div>
  );
};

export default Settings;
