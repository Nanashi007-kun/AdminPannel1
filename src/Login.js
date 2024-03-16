import React, { useState } from "react";
import "./Login.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { Navigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail, // Import the function for sending password reset emails
} from "firebase/auth";

export const Home = ({ user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [error, setError] = useState(""); // State to hold validation error message
  const navigate = useNavigate();

  const handleMethodChange = () => {
    setIsSignUpActive(!isSignUpActive);
    // Reset any previous validation errors
    setError("");
  };

  const handleSignUp = () => {
    // Email validation
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError(errorMessage);
      });
  };

  const handleSignIn = () => {
    // Email validation
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/adminpanel");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (
          errorCode === "auth/user-not-found" ||
          errorCode === "auth/wrong-password"
        ) {
          setError("Invalid email or password. Please try again.");
        } else {
          setError("An error occurred. Please try again.");
        }
      });
  };

  const handleForgotPassword = () => {
    // Email validation
    if (!email.trim()) {
      setError("Email is required to reset password.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setError("Password reset email sent. Please check your inbox.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError("Failed to send password reset email. Please try again later.");
      });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError(""); // Clear any previous validation errors
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError(""); // Clear any previous validation errors
  };

  const isValidEmail = (email) => {
    // Basic email validation using regular expression
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <form className="form">
      {isSignUpActive ? <legend className="form-title">Sign Up</legend> : <legend className="form-title">Sign In</legend>}
      <fieldset>
        <div className="input-container">
          <label htmlFor="email">Email:</label>
          <input
            className="text"
            type="text"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password:</label>
          <input
            placeholder="Enter password"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {error && <p className="error-message">{error}</p>} {/* Display validation error message */}
        {isSignUpActive ? (
          <button className="submit" type="button" onClick={handleSignUp}>
            Sign Up
          </button>
        ) : (
          <button className="submit" type="button" onClick={handleSignIn}>
            Sign In
          </button>
        )}
      </fieldset>
      {isSignUpActive ? (
        <button className="submit" onClick={handleMethodChange}>
          Login
        </button>
      ) : (
        <>
          <button className="submit" onClick={handleMethodChange}>
            Create an account
          </button>
          <button className="submit" onClick={handleForgotPassword}>
            Forgot Password?
          </button>
        </>
      )}
          </form>
  );
};

export default Home;
