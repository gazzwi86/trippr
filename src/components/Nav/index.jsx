import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.css";

const Nav = ({ showMenu }) => (
  <nav className="nav" role="navigation">
    <h2 className="nav__heading">Menu</h2>

    <ul className="nav__list">
      <li className="nav__list-item">
        <NavLink to="/">My lists</NavLink>
      </li>
      <li className="nav__list-item">
        <NavLink to="/settings">Settings</NavLink>
      </li>
    </ul>
  </nav>
);

export default Nav;
