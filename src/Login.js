import React, { useState } from "react";
import "./Login.css"; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import { auth } from "./firebase";
import { Navigate } from "react-router-dom"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail // Import the function for sending password reset emails
} from "firebase/auth";

export const Home = ({ user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const handleMethodChange = () => {
    setIsSignUpActive(!isSignUpActive);
  };
  const navigate = useNavigate();

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
      console.log("Email and password are required.");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/adminpanel');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
          alert("Invalid login credentials. Please try again or sign up.");
        } else {
          alert("An error occurred. Please try again.");
        }
      });
  };

  const handleForgotPassword = () => {
    if (!email) {
      console.log("Email is required to reset password.");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent. Please check your inbox.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert("Failed to send password reset email. Please try again later.");
      });
  };

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  if (user) {
    return <Navigate to="/"></Navigate>;
  }
  return (
    <section class="container">
      <div class="form-container">
        <div class="circle circle-two"></div>
        <div class="theme-btn-container"></div>
        <div class="register-forget opacity">
          <div className="login-container">
            <form>
              {isSignUpActive && <legend class="opacity">Sign Up</legend>}
              {!isSignUpActive && <legend class="opacity">Sign In</legend>}
              <fieldset>
                <ul>
                  <li>
                    <label class="text" htmlFor="email">Email</label>
                    <input class="text" type="text" id="email" onChange={handleEmailChange} />
                  </li>
                  <li>
                    <label  class="text" htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      onChange={handlePasswordChange}
                    />
                  </li>
                </ul>
                {isSignUpActive && (
                  <button   class="opacity" type="button" onClick={handleSignUp}>
                    Sign Up
                  </button>
                )}
                {!isSignUpActive && (
                  <button class="text" type="button" onClick={handleSignIn}>
                    Sign In
                  </button>
                )}
              </fieldset>
              {isSignUpActive && <button  class="text" onClick={handleMethodChange}>Login</button>}
              {!isSignUpActive && (
                <>
                  <button  class="text" onClick={handleMethodChange}>Create an account</button>
                  <button  class="text" onClick={handleForgotPassword}>Forgot Password?</button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
