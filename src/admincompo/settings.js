import React, { useState } from "react";
import { auth } from "../firebase";

import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import "../admincompo/settings.css"; // Import the CSS file for styling

const Settings = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  const handleSignUp = () => {
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      setError(true);
      return;
    }

    // Check for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      setError(true);
      return;
    }

    // Check for password length
    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters long.");
      setError(true);
      return;
    }

    // If all validations pass, proceed with user creation
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("New user created:", user);
        // Clear form fields after successful user creation
        setEmail("");
        setPassword("");
        setError(false);
        setErrorMessage("");
      })
      .catch((error) => {
        setError(true);
        setErrorMessage(error.message); // Set error message from Firebase
      });

  };

  const openPopup = () => {
    setShowPopup(true); // Set showPopup state to true to display the popup
  };

  const closePopup = () => {
    setShowPopup(false); // Set showPopup state to false to hide the popup
  };

  return (
    <div className="Main">
      <button onClick={openPopup}>Add New User</button>

      {/* Popup window */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>
              &times;
            </span>
            <h2>Add New User</h2>
            <form className="login">
              <fieldset>
                <div className="input-container">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="password">Password:</label>
                  <input
                    placeholder="Enter password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                {error && <span>{errorMessage}</span>}
                </div>
                <button
                  className="submit"
                  type="button"
                  onClick={handleSignUp}
                >
                  Create User
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
