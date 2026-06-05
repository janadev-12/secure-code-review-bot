import React from "react";

const Navbar = () => {

  return (
    <nav className="navbar">

      <div className="navbar-logo">
        🔥 AI Secure Login
      </div>

      <ul className="navbar-links">

        <li>
          <a href="/">
            Home
          </a>
        </li>

        <li>
          <a href="/login">
            Login
          </a>
        </li>

        <li>
          <a href="/register">
            Register
          </a>
        </li>

        <li>
          <a href="/dashboard">
            Dashboard
          </a>
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;