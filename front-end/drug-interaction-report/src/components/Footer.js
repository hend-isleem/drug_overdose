import React from 'react';

function Footer() {
  return (
    <footer>
      <p><a href="/about">About</a></p>
      <p><a href="/terms">Terms of Use</a></p>
      <p><a href="/privacy">Privacy Policy</a></p>
      {/* Social media icons */}
      <div>
        <a href="https://facebook.com">Facebook</a>
        <a href="https://twitter.com">Twitter</a>
        {/* Add more social media links */}
      </div>
    </footer>
  );
}

export default Footer;

