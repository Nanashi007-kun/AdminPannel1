// import React, { useState } from "react";
import "./Login.css"; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';


/* eslint-disable react/prop-types */
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const Home = ({ user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const handleMethodChange = () => {
    setIsSignUpActive(!isSignUpActive);
  };

  const handleSignUp = () => {
    if (!email || !password) return;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

    const handleSignIn = () => {
      if (!email || !password) {
        // Optionally, inform the user that email and password are required.
        console.log("Email and password are required.");
        return;
      }
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Use navigate to redirect to the dashboard page on successful sign-in
          ('/');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
  
          // Log the error code and message
          console.log(errorCode, errorMessage);
  
          // Provide user feedback based on the error
          if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
            // Display a message to the user or handle the error as required by your application
            alert("Invalid login credentials. Please try again or sign up.");
          } else {
            // For other errors, you might want to display a generic error message
            alert("An error occurred. Please try again.");
          }
        });
    };
  
  

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  if (user) {
    return <Navigate to="/"></Navigate>;
  }
  return (
    <section>
      <h2>Homepage</h2>
      <form>
        {isSignUpActive && <legend>Sign Up</legend>}
        {!isSignUpActive && <legend>Sign In</legend>}

        <fieldset>
          <ul>
            <li>
              <label htmlFor="email">Email</label>
              <input type="text" id="email" onChange={handleEmailChange} />
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={handlePasswordChange}
              />
            </li>
          </ul>

          {isSignUpActive && (
            <button type="button" onClick={handleSignUp}>
              Sign Up
            </button>
          )}
          {!isSignUpActive && (
            <button type="button" onClick={handleSignIn}>
              Sign In
            </button>
          )}
        </fieldset>
        {isSignUpActive && <a onClick={handleMethodChange}>Login</a>}
        {!isSignUpActive && (
          <a onClick={handleMethodChange}>Create an account</a>
        )}
        
      </form>
    </section>
  );
};

