import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import './Login.css'; // Import the CSS file

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Define static user credentials
  const correctEmail = 'admin@gmail.com';
  const correctPassword = 'admin';

  const handleLogin = (e) => {
    e.preventDefault();
    // Check if entered credentials match the static credentials
    if (email === correctEmail && password === correctPassword) {
      console.log('Logged in successfully');
      // Redirect to admin panel after successful login
      // Replace '/adminpanel' with the actual path
      window.location.href = '/adminpanel';
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <section>
      <div className="container">
        <div className="content">
          <h2>Sign In</h2>
          <form className="form" onSubmit={handleLogin}>
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
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input 
                type="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="btn">Login</button>
          </form>
          {error && <p className="error">{error}</p>} {/* Display error message if authentication fails */}
          <div className="forgot-password">
            {/* Link to the ForgotPassword page */}
            <p>Forgot your password? <Link to="/ForgotPassword">Reset Password</Link></p>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
