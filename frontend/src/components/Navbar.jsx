import React from 'react';
import './Styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">Blogify</div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/signup">SignUp</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/blog">Blogs</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
