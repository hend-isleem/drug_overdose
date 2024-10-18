import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Validate input
    if (!email || !password) {
      setErrorMessage('Please fill in both fields.');
      return;
    }

    // Mock validation (you can replace this with actual logic)
    if (email === "test@example.com" && password === "password") {
      setErrorMessage('');
      alert("Login successful!");
    } else {
      setErrorMessage('Invalid email or password.');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        {errorMessage && <p className="error">{errorMessage}</p>}

        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;

