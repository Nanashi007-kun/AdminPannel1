import React, { useState } from "react";
import "./Login.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import Popup from 'react-popup';
import { Navigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail, // Import the function for sending password reset emails
} from "firebase/auth";

export const Login = ({ user }) => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Define success message state
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const validateEmail = (email) => {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage('Password reset email sent successfully!');
      setEmail(''); // Clear email field after successful reset
    } catch (error) {
      console.error('Error sending password reset email:', error);

      setErrorMessage('Failed to send password reset email.');

    }
  };

  // const handleSignUp = () => {

  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       console.log(user);
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(errorCode, errorMessage);
  //       setError(true);
  //     });
  // };

  const handleLogIn = (e) => {
    if (!validateEmail(email)) {
      setErrorMessage('Invalid email format');
      return;
    }
    if (!validatePassword(password)) {
      setErrorMessage('Password must be at least 8 characters long');
      return;
    }
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)

      .then((userCredential) => {
        navigate("/adminpanel");
        const user = userCredential.user;
        console.log(user);
      })

      .catch((error) => {
        setError(true);
        const handleEmailChange = (e) => {
          const enteredEmail = e.target.value;
          if (enteredEmail.includes("@") && !enteredEmail.endsWith("@gmail.com")) {
            setEmail(enteredEmail + "@gmail.com");
          } else {
            setEmail(enteredEmail);
          }
        };

        // if (
        //   errorCode === "auth/user-not-found" ||
        //   errorCode === "auth/wrong-password"
        // ) {
        //   setError("Invalid email or password. Please try again.");
        // } else {
        //   setError("An error occurred. Please try again.");
        // }
      });

  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container">
      <input type="checkbox" id="check" />
      <div className="login form">
        <header>Login</header>
        <form>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <header></header>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
          <a onClick={handleForgotPassword}>Forgot password?</a>
          <input type="button" className="button" value="Login" onClick={handleLogIn
        } />
        </form>
        <div style={{ color: 'red' }}>{errorMessage}</div>
      </div>
    </div>
  );
  };
  
  export default Login;
  