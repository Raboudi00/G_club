import React from "react";
import "./Navbar.css";
import logo from "../../img/logo.png";

function NavBar() {
  return (
    <div className="Navbar">
      <div className="nav-left">
        <img src={logo} className="nav-logo" alt="Broken" />
        <h2>Gentelmen Club</h2>
      </div>
      <span className="nav-right">
        <p>Home</p>
        <p>Form</p>
        <p>Github</p>
      </span>
    </div>
  );
}

export default NavBar;
