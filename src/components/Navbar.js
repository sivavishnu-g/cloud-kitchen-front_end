import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css"; 

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo">Cloud Kitchen</h1>
        <p className="sub">Fresh & delicious meals delivered to your doorstep.</p>
      </div>
      <Link to="/admin">
        <button className="login-button">Admin Login</button>
      </Link>
    </nav>
  );
}

export default Navbar;
