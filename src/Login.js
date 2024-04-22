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

export const Login = ({ user }) => {
   const [error,setError] = useState(false);
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

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
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/adminpanel");
        const user =userCredential.user;
        console.log(user);
      })
   .catch((error)=>{
      setError(true);
  
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
    <form className="login" >
      <legend className="login-title">Sign In</legend>

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
        </div>
        <button className="submit" type="button"onClick={handleLogIn} >
          
          Login
        </button>
        {error && <span>wrong email or password </span>}
      </fieldset>
    </form>
  );
};

export default Login;
