import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
  
function Navbar() {
  return (
    <div className ="navbar-wrapper">
      <nav className="navbar">
          <NavLink to="/" className="navbar-link"> 
            Home
          </NavLink>
          <NavLink to="/admin"  className="navbar-link"> 
            Admin
          </NavLink>
          <NavLink to="/select-jobs" className="navbar-link" >
            Select Jobs
          </NavLink>
      </nav>
    </div>
  );
};
  
export default Navbar;