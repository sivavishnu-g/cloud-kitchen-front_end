import React from "react";
import "../styles/navbar.css"; 
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
    <nav className="navbar">
      <h1 className="logo">Cloud Kitchen</h1>
      <p className="sub">Fresh & delicious meals delivered to your doorstep.</p>
      <p></p>
    </nav>
         <Link to='/admin'> <button className="login-button">Admin Login</button> </Link>
         </div>
  );
}

export default Navbar;
