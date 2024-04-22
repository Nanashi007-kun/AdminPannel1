import React, { useState } from "react";
import { auth } from "../firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail, // Import the function for sending password reset emails
} from "firebase/auth";
import "../admincompo/settings.css"; // Import the CSS file for styling

const Settings = () => {
  const [error,setError] = useState(false);
  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = () => {

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {

        setError(true);
   
      });
  };
  // const [model, setModel] = useState(false);

  // const toggleModel = () => {
  //   setModel(!model);
  // };

  // if (model) {
  //   document.body.classList.add("active-modl");
  // } else {
  //   document.body.classList.remove("active-modl");
  // }
  return (
    <div className="Main">
     <form className="login" >
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
        <button className="submit" type="button"onClick={handleSignUp} >
          
          Login
        </button>
        {error && <span>wrong email or password </span>}
      </fieldset>
    </form>
    </div>
  );
};

export default Settings;
