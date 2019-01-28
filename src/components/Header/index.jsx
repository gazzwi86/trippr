import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/svgs/logo.svg";
import Button from "../Button";
import MenuBtn from "../MenuBtn";
import AuthContext from "../../context/Auth";
import "./styles.css";

const Header = ({ showMenu, toggleMenuAction }) => (
  <AuthContext.Consumer>
    {({ token, logout }) => (
      <header className="header">
        <div className="header__menu-btn">
          <MenuBtn showMenu={showMenu} toggleMenuAction={toggleMenuAction} />
        </div>

        <NavLink to="/" className="header__logo">
          <img src={logo} alt="Trippr" height="20rem" />
        </NavLink>

        <div className="header__session-btns">
          {!token && <NavLink to="/login">Login</NavLink>}
          {token && <Button action={() => logout()}>Logout</Button>}
        </div>
      </header>
    )}
  </AuthContext.Consumer>
);

export default Header;
