import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', email, password);
  };

  return (
    <div style={styles.pageContainer}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  pageContainer: {
    textAlign: 'center',
    color: '#fff',
    marginTop: '100px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    margin: '0 auto',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Login;
