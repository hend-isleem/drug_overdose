import React from 'react';

const Home = () => {
  return (
    <div style={styles.pageContainer}>
      <h1>Welcome to ProHealth</h1>
      <p>Check drug interactions easily with our tool.</p>
    </div>
  );
};

const styles = {
  pageContainer: {
    textAlign: 'center',
    color: '#fff',
    marginTop: '100px',
  },
};

export default Home;
